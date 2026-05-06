import{c as m,h as y,d as C,a as r,b as a,e as g,u as S,f as I,t as d,j as p,T as O,w as j,i as l}from"./index-CQC2Aogj.js";/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=m("activity",[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=m("brain-circuit",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M9 13a4.5 4.5 0 0 0 3-4",key:"10igwf"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M12 13h4",key:"1ku699"}],["path",{d:"M12 18h6a2 2 0 0 1 2 2v1",key:"105ag5"}],["path",{d:"M12 8h8",key:"1lhi5i"}],["path",{d:"M16 8V5a2 2 0 0 1 2-2",key:"u6izg6"}],["circle",{cx:"16",cy:"13",r:".5",key:"ry7gng"}],["circle",{cx:"18",cy:"3",r:".5",key:"1aiba7"}],["circle",{cx:"20",cy:"21",r:".5",key:"yhc1fs"}],["circle",{cx:"20",cy:"8",r:".5",key:"1e43v0"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=m("circle-user",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);/**
 * @license lucide-vue-next v1.0.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=m("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]),f={baseURL:"/api/mimo/v1",apiKey:"tp-chmw0iuwm9ep41lut91tm339yw55qsef51shdm7ule7xjahr",model:"mimo-v2-omni"};function oe(){const e=y(!1),o=y(""),t=y(null);let i=null;const u=()=>{i&&(i.abort(),i=null),e.value&&(e.value=!1,o.value+=`
[系统] 用户操作中断，已停止分析。
`)};return{isThinking:e,thinkingText:o,finalDecision:t,streamAnalysis:async s=>{var b,v,x,w,k;u(),i=new AbortController;const M=i.signal;e.value=!0,o.value=`[系统] 开始请求大模型引擎...
`,t.value=null;try{let n="";s.userInterests?n=`你是一个大厂广告推荐算法专家。
当前触发广告时机：${s.adScenario} (可选项：pre-roll/pause/mid-roll)

【用户信息】
- 兴趣偏好: ${s.userInterests.join(", ")}
- 历史数据: 最近观看 ${(v=(b=s.history)==null?void 0:b.recentWatched)==null?void 0:v.join(", ")}

【当前播放视频】
- 视频类型: ${s.videoType}
- 当前场景: ${s.videoScene}
- 播放进度: ${s.progress}

【可选广告池】
${JSON.stringify(s.adPool,null,2)}

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
}`:n=`你是一个大厂广告算法专家。
当前触发场景：${s.adScenario} (可选项：pre-roll/pause/mid-roll)

输入信息：
- 用户偏好: ${s.interest}
- 历史行为: 跳过 ${s.skip_count} 次广告
- 当前进度: ${s.progress}
- 当前画面内容: ${s.scene}

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
}`;const h=await fetch(`${f.baseURL}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${f.apiKey}`,Accept:"text/event-stream"},body:JSON.stringify({model:f.model,messages:[{role:"system",content:"你是一个专业的全场景广告调度 AI 助手。"},{role:"user",content:n}],stream:!0}),signal:M});if(!h.ok)throw new Error(`API Error: ${h.statusText}`);const _=(x=h.body)==null?void 0:x.getReader(),T=new TextDecoder;let A="";for(;_;){const{done:z,value:N}=await _.read();if(z)break;const $=T.decode(N).split(`
`).filter(c=>c.trim()!=="");for(const c of $){if(c.includes("[DONE]"))break;if(c.startsWith("data: "))try{const q=((k=(w=JSON.parse(c.slice(6)).choices[0])==null?void 0:w.delta)==null?void 0:k.content)||"";A+=q,o.value+=q}catch{}}}const U=A.match(/\{[\s\S]*\}/);U?t.value=JSON.parse(U[0]):t.value={analysis:"未能解析 API 返回的结构化数据。",brand:"AI 智能推荐",content:"为您推荐相关内容",timing:s.progress,reason:"大模型未按照标准格式返回 JSON，采用安全备用策略。",adStyle:"popup"}}catch(n){if((n==null?void 0:n.name)==="AbortError"){console.log("AI analysis aborted by user action.");return}console.error("MiMo API Error:",n),o.value+=`
[Error: ${n instanceof Error?n.message:"未知错误"}]
`}finally{i=null,e.value=!1}},cancelAnalysis:u}}const ie=[{id:"sports",label:"体育爱好者"},{id:"drama",label:"古装剧迷"},{id:"anime",label:"二次元"},{id:"game",label:"电竞玩家"},{id:"tech",label:"科技数码"},{id:"travel",label:"旅游休闲"},{id:"beauty",label:"美妆护肤"},{id:"auto",label:"汽车"}],ce=[{id:"h1",title:"欧冠1/4决赛 巴塞罗那vs巴黎",time:"2小时前",type:"体育赛事"},{id:"h2",title:"《庆余年》第二季 预告片",time:"昨天",type:"古装剧"},{id:"h3",title:"苹果 Vision Pro 深度评测",time:"昨天",type:"科技数码"},{id:"h4",title:"咒术回战 涉谷事变",time:"3天前",type:"动画"},{id:"h5",title:"318川藏线房车自驾游Vlog",time:"1周前",type:"旅游休闲"},{id:"h6",title:"小米 SU7 动态试驾",time:"1周前",type:"汽车试驾"}],re=[{id:"ad_1",category:"sports",brand:"Nike",content:"新款刺客足球鞋预售",style:"前贴片",media:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070"},{id:"ad_9",category:"sports",brand:"Adidas",content:"Ultraboost 跑鞋限时折扣",style:"画中画",media:"https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2070"},{id:"ad_2",category:"drama",brand:"重回汉唐",content:"热销汉服体验券",style:"前贴片",media:"https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?q=80&w=2070"},{id:"ad_10",category:"drama",brand:"梦幻西游",content:"古风新服「长安月」开启",style:"画中画",media:"https://images.unsplash.com/photo-1626804475294-323748ba4015?q=80&w=2070"},{id:"ad_11",category:"movie",brand:"IMAX",content:"暑期档大片预售·杜比全景声",style:"前贴片",media:"https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2070"},{id:"ad_12",category:"movie",brand:"淘票票",content:"新片特惠19.9元起",style:"画中画",media:"https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070"},{id:"ad_13",category:"variety",brand:"元气森林",content:"0糖0脂·综艺同款气泡水",style:"画中画",media:"https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070"},{id:"ad_14",category:"variety",brand:"Keep",content:"明星同款燃脂课程免费领",style:"前贴片",media:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070"},{id:"ad_3",category:"anime",brand:"万代",content:"热门番剧手办预售",style:"前贴片",media:"https://images.unsplash.com/photo-1613373123746-3a460971d70d?q=80&w=2070"},{id:"ad_15",category:"anime",brand:"哔哩哔哩",content:"大会员限时特惠·番剧畅看",style:"画中画",media:"https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=2070"},{id:"ad_16",category:"music",brand:"网易云音乐",content:"黑胶VIP年卡5折",style:"画中画",media:"https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070"},{id:"ad_17",category:"music",brand:"摩登天空",content:"草莓音乐节早鸟票开售",style:"前贴片",media:"https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070"},{id:"ad_4",category:"game",brand:"罗技G",content:"PRO X SUPERLIGHT 鼠标",style:"前贴片",media:"https://images.unsplash.com/photo-1615663248861-2446a855502b?q=80&w=2070"},{id:"ad_18",category:"game",brand:"雷蛇",content:"黑寡妇蜘蛛V4机械键盘",style:"画中画",media:"https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2070"},{id:"ad_19",category:"documentary",brand:"国家地理",content:"纪录片合辑订阅·探索世界",style:"前贴片",media:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070"},{id:"ad_20",category:"documentary",brand:"知乎盐选",content:"深度科普专栏每日更新",style:"画中画",media:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070"},{id:"ad_21",category:"food",brand:"美团外卖",content:"30元红包免费领·美食天天送",style:"画中画",media:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070"},{id:"ad_22",category:"food",brand:"海底捞",content:"新品锅底免费尝鲜券",style:"前贴片",media:"https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=2070"},{id:"ad_23",category:"news",brand:"腾讯新闻",content:"独家深度报道·会员专享",style:"前贴片",media:"https://images.unsplash.com/photo-1504711434969-e33886168d8c?q=80&w=2070"},{id:"ad_24",category:"news",brand:"得到",content:"每日听书·早餐新闻套餐",style:"画中画",media:"https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2070"},{id:"ad_8",category:"general",brand:"瑞幸咖啡",content:"9.9元全场饮品券",style:"前贴片",media:"https://images.unsplash.com/photo-1544787210-2827443cb69b?q=80&w=2070"}],de=[{id:"sports",name:"体育赛事",interest:"体育 / 欧冠",scene:"比赛间隙 - 换人调整",videoUrl:"https://vjs.zencdn.net/v/oceans.mp4",referenceUrl:"",matchLogic:"匹配运动装备、功能饮料广告",peaks:[{start:40,end:55},{start:85,end:100}]},{id:"drama",name:"古装剧",interest:"影视 / 古装",scene:"剧情高潮 - 对白阶段",videoUrl:"https://videos.pexels.com/video-files/32736484/13956060_2560_1440_25fps.mp4",referenceUrl:"https://www.pexels.com/zh-cn/video/32736484/",matchLogic:"匹配国风、文旅、汉服相关广告",peaks:[{start:20,end:35},{start:70,end:90}]},{id:"movie",name:"电影大片",interest:"影视 / 科幻",scene:"正片开场 - 片头滚动",videoUrl:"https://vjs.zencdn.net/v/oceans.mp4",referenceUrl:"",matchLogic:"高频率运动帧保护，匹配高端品牌特效广告",peaks:[{start:50,end:65}]},{id:"variety",name:"综艺",interest:"娱乐 / 综艺",scene:"爆笑互动环节",videoUrl:"https://videos.pexels.com/video-files/9064490/9064490-hd_1920_1080_30fps.mp4",referenceUrl:"https://www.pexels.com/zh-cn/video/9064490/",matchLogic:"识别转场与花字，匹配快消品、互动领券广告",peaks:[{start:30,end:50},{start:80,end:95}]},{id:"anime",name:"动画",interest:"二次元 / 热血",scene:"战斗转场衔接",videoUrl:"https://videos.pexels.com/video-files/13004609/13004609-uhd_1920_1440_60fps.mp4",referenceUrl:"https://www.pexels.com/zh-cn/video/13004609/",matchLogic:"提取高饱和度色彩，匹配游戏、潮流玩具广告",peaks:[{start:10,end:25},{start:60,end:80}]},{id:"music",name:"音乐现场",interest:"音乐 / 流行",scene:"串场休息 - 舞台搭建",videoUrl:"https://videos.pexels.com/video-files/30003999/12873854_2560_1440_50fps.mp4",referenceUrl:"https://www.pexels.com/zh-cn/video/30003999/",matchLogic:"识别音频间奏，匹配耳机、音响、演出票务广告",peaks:[{start:40,end:60}]},{id:"game",name:"游戏直播",interest:"游戏 / 电竞",scene:"对局加载 - 等待匹配",videoUrl:"https://vjs.zencdn.net/v/oceans.mp4",referenceUrl:"",matchLogic:"匹配电竞外设、能量饮料",peaks:[{start:25,end:45},{start:75,end:90}]},{id:"documentary",name:"纪录片",interest:"知识 / 自然",scene:"章节转场 - 黑场过渡",videoUrl:"https://videos.pexels.com/video-files/36501844/15477772_2560_1440_25fps.mp4",referenceUrl:"https://www.pexels.com/zh-cn/video/36501844/",matchLogic:"匹配长镜头平缓期，展示户外、公益、教育广告",peaks:[{start:15,end:30}]},{id:"food",name:"美食探店",interest:"生活 / 美食",scene:"上菜特写 - 沉浸品尝",videoUrl:"https://videos.pexels.com/video-files/6645690/6645690-hd_1920_1080_30fps.mp4",referenceUrl:"https://www.pexels.com/zh-cn/video/6645690/",matchLogic:"匹配特写镜头，展示厨具、调味品、生鲜广告",peaks:[{start:50,end:70}]},{id:"news",name:"新闻资讯",interest:"资讯 / 时政",scene:"新闻切换 - 口播间隙",videoUrl:"https://vjs.zencdn.net/v/oceans.mp4",referenceUrl:"",matchLogic:"匹配财经、汽车、高端房产广告",peaks:[{start:10,end:30},{start:60,end:80}]}],V={class:"flex-1 glass flex flex-col overflow-hidden min-h-[400px] lg:min-h-0"},E={class:"p-4 lg:p-6 border-b border-white/10 bg-white/[0.02]"},J={class:"flex items-center gap-3 text-primary"},B={class:"flex-1 p-4 lg:p-6 font-mono text-[11px] overflow-y-auto space-y-4 bg-black/40"},R={key:0,class:"whitespace-pre-wrap text-white/60 leading-relaxed animate-fade-in text-[10px] lg:text-[11px]"},G={key:0,class:"cursor-blink"},H={key:1,class:"flex items-center gap-3 text-white/30"},K={key:0,class:"glass p-4 lg:p-5 border-primary/20 bg-primary/5 space-y-4"},W={class:"flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[9px]"},X={class:"space-y-3"},F={class:"text-xs font-bold"},Z={class:"text-xs font-bold"},Q={class:"pt-2 border-t border-white/5"},Y={class:"text-xs text-white/70"},le=C({__name:"AiBrainPanel",props:{isThinking:{type:Boolean},thinkingText:{},finalDecision:{}},setup(e){return(o,t)=>(l(),r("div",V,[a("div",E,[a("div",J,[g(S(D),{size:20}),t[0]||(t[0]=a("h3",{class:"font-bold text-sm lg:text-base"},"AI BRAIN 分析面板",-1))])]),a("div",B,[e.thinkingText?(l(),r("div",R,[I(d(e.thinkingText),1),e.isThinking?(l(),r("span",G)):p("",!0)])):p("",!0),e.isThinking&&!e.thinkingText?(l(),r("div",H,[...t[1]||(t[1]=[a("div",{class:"w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(0,82,217,0.5)]"},null,-1),a("span",{class:"text-xs"},"AI 正在分析场景...",-1)])])):p("",!0),g(O,{name:"fade"},{default:j(()=>[e.finalDecision?(l(),r("div",K,[a("div",W,[g(S(P),{size:14}),t[2]||(t[2]=I(" AI 决策输出 ",-1))]),a("div",X,[a("div",null,[t[3]||(t[3]=a("p",{class:"text-[8px] opacity-40 uppercase font-bold"},"推荐品牌 & 内容",-1)),a("p",F,d(e.finalDecision.brand||"未匹配")+" - "+d(e.finalDecision.content||e.finalDecision.type||"无内容"),1)]),a("div",null,[t[4]||(t[4]=a("p",{class:"text-[8px] opacity-40 uppercase font-bold"},"展现形式",-1)),a("p",Z,d(e.finalDecision.adStyle||"popup"),1)])]),a("div",Q,[t[5]||(t[5]=a("p",{class:"text-[8px] opacity-40 uppercase font-bold mb-1"},"决策理由",-1)),a("p",Y,d(e.finalDecision.reason),1)])])):p("",!0)]),_:1})])]))}});export{se as A,ne as C,P as S,le as _,ie as a,ce as b,re as c,de as s,oe as u};
