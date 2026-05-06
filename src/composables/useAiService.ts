import { ref } from 'vue'
import { AI_CONFIG } from './config'

export type AdScenario = 'pre-roll' | 'pause' | 'mid-roll'

export interface AiInput {
  // New mult-dimensional fields
  userInterests?: string[]
  history?: {
    skipRate: string
    recentWatched: string[]
  }
  videoType?: string
  videoScene?: string
  adPool?: any[]
  
  // Old legacy fields
  interest?: string
  skip_count?: number
  scene?: string
  scenarioType?: string
  
  progress: string
  adScenario?: AdScenario
}

export interface AiDecision {
  analysis: string
  adId?: string
  brand?: string
  content?: string
  timing: string
  reason: string
  adStyle?: 'fullscreen' | 'sidebar' | 'popup'
  type?: string
}

export function useAiService() {
  const isThinking = ref(false)
  const thinkingText = ref('')
  const finalDecision = ref<AiDecision | null>(null)

  let abortController: AbortController | null = null

  // 取消当前正在进行的 AI 分析
  const cancelAnalysis = () => {
    if (abortController) {
      abortController.abort()
      abortController = null
    }
    if (isThinking.value) {
      isThinking.value = false
      thinkingText.value += '\n[系统] 用户操作中断，已停止分析。\n'
    }
  }

  // 真实 API 推理
  const streamAnalysis = async (input: AiInput) => {
    // 如果已有正在进行的分析，先取消
    cancelAnalysis()

    if (!AI_CONFIG.apiKey) {
      console.warn('Missing MiMo API Key.')
      thinkingText.value = '未配置 API Key，请在 src/composables/config.ts 中配置。\n'
      isThinking.value = false
      return
    }

    // 创建新的 AbortController
    abortController = new AbortController()
    const signal = abortController.signal

    isThinking.value = true
    thinkingText.value = `[系统] 开始请求大模型引擎...\n`
    finalDecision.value = null

    try {
      let prompt = ''
      if (input.userInterests) {
        prompt = `你是一个大厂广告推荐算法专家。
当前触发广告时机：${input.adScenario} (可选项：pre-roll/pause/mid-roll)

【用户信息】
- 兴趣偏好: ${input.userInterests.join(', ')}
- 历史数据: 最近观看 ${input.history?.recentWatched?.join(', ')}

【当前播放视频】
- 视频类型: ${input.videoType}
- 当前场景: ${input.videoScene}
- 播放进度: ${input.progress}

【可选广告池】
${JSON.stringify(input.adPool, null, 2)}

请根据以上多维信息，思考并从广告池中挑选 1 个最适合当前场景且转化率预估最高的广告。
1. 若为 pre-roll (片头)，决定时长和跳过策略；
2. 若为 pause (暂停)，决定右侧展示内容；
3. 若为 mid-roll (播放中)，决定浮层形态。

必须包含分析日志，最后以 JSON 格式输出（不要用 Markdown 代码块，直接输出 JSON 字符串即可）：
{
  "analysis": "这里写你的核心推荐理由",
  "adId": "选中的广告id",
  "brand": "选中的广告品牌",
  "content": "选中的广告内容描述",
  "timing": "展示时机描述",
  "reason": "简短的为什么选这个广告",
  "adStyle": "fullscreen"
}`
      } else {
        prompt = `你是一个大厂广告算法专家。
当前触发场景：${input.adScenario} (可选项：pre-roll/pause/mid-roll)

输入信息：
- 用户偏好: ${input.interest}
- 历史行为: 跳过 ${input.skip_count} 次广告
- 当前进度: ${input.progress}
- 当前画面内容: ${input.scene}

请根据场景决定广告策略：
1. 若为 pre-roll (片头)，决定时长和跳过策略；
2. 若为 pause (暂停)，决定右侧展示内容；
3. 若为 mid-roll (播放中)，决定浮层形态。

必须包含分析日志，最后以 JSON 格式输出（不要用 Markdown 代码块，直接输出 JSON 字符串即可）：
{
  "analysis": "核心推理...",
  "brand": "品牌名",
  "content": "广告描述",
  "timing": "时机",
  "reason": "一句话理由",
  "adStyle": "fullscreen"
}`
      }

      const response = await fetch(`${AI_CONFIG.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify({
          model: AI_CONFIG.model,
          messages: [
            { role: 'system', content: '你是一个专业的全场景广告调度 AI 助手。' },
            { role: 'user', content: prompt }
          ],
          stream: true
        }),
        signal // 传入 abort signal
      })

      if (!response.ok) throw new Error(`API Error: ${response.statusText}`)

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(line => line.trim() !== '')

        for (const line of lines) {
          if (line.includes('[DONE]')) break
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              const content = data.choices[0]?.delta?.content || ''
              fullContent += content
              thinkingText.value += content
            } catch (e) {
              // Ignore partial parse errors
            }
          }
        }
      }

      // 提取 JSON
      const jsonMatch = fullContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        finalDecision.value = JSON.parse(jsonMatch[0])
      } else {
        finalDecision.value = {
          analysis: "未能解析 API 返回的结构化数据。",
          brand: "AI 智能推荐",
          content: "为您推荐相关内容",
          timing: input.progress,
          reason: "大模型未按照标准格式返回 JSON，采用安全备用策略。",
          adStyle: "popup"
        }
      }

    } catch (error: any) {
      if (error?.name === 'AbortError') {
        console.log('AI analysis aborted by user action.')
        return // 被取消时不追加错误信息
      }
      console.error('MiMo API Error:', error)
      thinkingText.value += `\n[Error: ${error instanceof Error ? error.message : '未知错误'}]\n`
    } finally {
      abortController = null
      isThinking.value = false
    }
  }

  return {
    isThinking,
    thinkingText,
    finalDecision,
    streamAnalysis,
    cancelAnalysis
  }
}
