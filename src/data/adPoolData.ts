export const availableInterests = [
  { id: 'sports', label: '体育爱好者' },
  { id: 'drama', label: '古装剧迷' },
  { id: 'anime', label: '二次元' },
  { id: 'game', label: '电竞玩家' },
  { id: 'tech', label: '科技数码' },
  { id: 'travel', label: '旅游休闲' },
  { id: 'beauty', label: '美妆护肤' },
  { id: 'auto', label: '汽车' }
]

export const availableHistory = [
  { id: 'h1', title: '欧冠1/4决赛 巴塞罗那vs巴黎', time: '2小时前', type: '体育赛事' },
  { id: 'h2', title: '《庆余年》第二季 预告片', time: '昨天', type: '古装剧' },
  { id: 'h3', title: '苹果 Vision Pro 深度评测', time: '昨天', type: '科技数码' },
  { id: 'h4', title: '咒术回战 涉谷事变', time: '3天前', type: '动画' },
  { id: 'h5', title: '318川藏线房车自驾游Vlog', time: '1周前', type: '旅游休闲' },
  { id: 'h6', title: '小米 SU7 动态试驾', time: '1周前', type: '汽车试驾' }
]

export const adPool = [
  // 体育赛事 × 2
  { id: 'ad_1', category: 'sports', brand: 'Nike', content: '新款刺客足球鞋预售', style: '前贴片', media: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070' },
  { id: 'ad_9', category: 'sports', brand: 'Adidas', content: 'Ultraboost 跑鞋限时折扣', style: '画中画', media: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2070' },

  // 古装剧 × 2
  { id: 'ad_2', category: 'drama', brand: '重回汉唐', content: '热销汉服体验券', style: '前贴片', media: 'https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?q=80&w=2070' },
  { id: 'ad_10', category: 'drama', brand: '梦幻西游', content: '古风新服「长安月」开启', style: '画中画', media: 'https://images.unsplash.com/photo-1626804475294-323748ba4015?q=80&w=2070' },

  // 电影大片 × 2
  { id: 'ad_11', category: 'movie', brand: 'IMAX', content: '暑期档大片预售·杜比全景声', style: '前贴片', media: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2070' },
  { id: 'ad_12', category: 'movie', brand: '淘票票', content: '新片特惠19.9元起', style: '画中画', media: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070' },

  // 综艺 × 2
  { id: 'ad_13', category: 'variety', brand: '元气森林', content: '0糖0脂·综艺同款气泡水', style: '画中画', media: 'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070' },
  { id: 'ad_14', category: 'variety', brand: 'Keep', content: '明星同款燃脂课程免费领', style: '前贴片', media: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070' },

  // 动画 × 2
  { id: 'ad_3', category: 'anime', brand: '万代', content: '热门番剧手办预售', style: '前贴片', media: 'https://images.unsplash.com/photo-1613373123746-3a460971d70d?q=80&w=2070' },
  { id: 'ad_15', category: 'anime', brand: '哔哩哔哩', content: '大会员限时特惠·番剧畅看', style: '画中画', media: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=2070' },

  // 音乐现场 × 2
  { id: 'ad_16', category: 'music', brand: '网易云音乐', content: '黑胶VIP年卡5折', style: '画中画', media: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070' },
  { id: 'ad_17', category: 'music', brand: '摩登天空', content: '草莓音乐节早鸟票开售', style: '前贴片', media: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070' },

  // 游戏直播 × 2
  { id: 'ad_4', category: 'game', brand: '罗技G', content: 'PRO X SUPERLIGHT 鼠标', style: '前贴片', media: 'https://images.unsplash.com/photo-1615663248861-2446a855502b?q=80&w=2070' },
  { id: 'ad_18', category: 'game', brand: '雷蛇', content: '黑寡妇蜘蛛V4机械键盘', style: '画中画', media: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=2070' },

  // 纪录片 × 2
  { id: 'ad_19', category: 'documentary', brand: '国家地理', content: '纪录片合辑订阅·探索世界', style: '前贴片', media: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070' },
  { id: 'ad_20', category: 'documentary', brand: '知乎盐选', content: '深度科普专栏每日更新', style: '画中画', media: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070' },

  // 美食探店 × 2
  { id: 'ad_21', category: 'food', brand: '美团外卖', content: '30元红包免费领·美食天天送', style: '画中画', media: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070' },
  { id: 'ad_22', category: 'food', brand: '海底捞', content: '新品锅底免费尝鲜券', style: '前贴片', media: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=2070' },

  // 新闻资讯 × 2
  { id: 'ad_23', category: 'news', brand: '腾讯新闻', content: '独家深度报道·会员专享', style: '前贴片', media: 'https://images.unsplash.com/photo-1504711434969-e33886168d8c?q=80&w=2070' },
  { id: 'ad_24', category: 'news', brand: '得到', content: '每日听书·早餐新闻套餐', style: '画中画', media: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=2070' },

  // 通用兜底
  { id: 'ad_8', category: 'general', brand: '瑞幸咖啡', content: '9.9元全场饮品券', style: '前贴片', media: 'https://images.unsplash.com/photo-1544787210-2827443cb69b?q=80&w=2070' }
]

export const scenarios = [
  { id: 'sports', name: '体育赛事', interest: '体育 / 欧冠', scene: '比赛间隙 - 换人调整', videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4', referenceUrl: '', matchLogic: '匹配运动装备、功能饮料广告', peaks: [{ start: 40, end: 55 }, { start: 85, end: 100 }] },
  { id: 'drama', name: '古装剧', interest: '影视 / 古装', scene: '剧情高潮 - 对白阶段', videoUrl: 'https://videos.pexels.com/video-files/32736484/13956060_2560_1440_25fps.mp4', referenceUrl: 'https://www.pexels.com/zh-cn/video/32736484/', matchLogic: '匹配国风、文旅、汉服相关广告', peaks: [{ start: 20, end: 35 }, { start: 70, end: 90 }] },
  { id: 'movie', name: '电影大片', interest: '影视 / 科幻', scene: '正片开场 - 片头滚动', videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4', referenceUrl: '', matchLogic: '高频率运动帧保护，匹配高端品牌特效广告', peaks: [{ start: 50, end: 65 }] },
  { id: 'variety', name: '综艺', interest: '娱乐 / 综艺', scene: '爆笑互动环节', videoUrl: 'https://videos.pexels.com/video-files/9064490/9064490-hd_1920_1080_30fps.mp4', referenceUrl: 'https://www.pexels.com/zh-cn/video/9064490/', matchLogic: '识别转场与花字，匹配快消品、互动领券广告', peaks: [{ start: 30, end: 50 }, { start: 80, end: 95 }] },
  { id: 'anime', name: '动画', interest: '二次元 / 热血', scene: '战斗转场衔接', videoUrl: 'https://videos.pexels.com/video-files/13004609/13004609-uhd_1920_1440_60fps.mp4', referenceUrl: 'https://www.pexels.com/zh-cn/video/13004609/', matchLogic: '提取高饱和度色彩，匹配游戏、潮流玩具广告', peaks: [{ start: 10, end: 25 }, { start: 60, end: 80 }] },
  { id: 'music', name: '音乐现场', interest: '音乐 / 流行', scene: '串场休息 - 舞台搭建', videoUrl: 'https://videos.pexels.com/video-files/30003999/12873854_2560_1440_50fps.mp4', referenceUrl: 'https://www.pexels.com/zh-cn/video/30003999/', matchLogic: '识别音频间奏，匹配耳机、音响、演出票务广告', peaks: [{ start: 40, end: 60 }] },
  { id: 'game', name: '游戏直播', interest: '游戏 / 电竞', scene: '对局加载 - 等待匹配', videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4', referenceUrl: '', matchLogic: '匹配电竞外设、能量饮料', peaks: [{ start: 25, end: 45 }, { start: 75, end: 90 }] },
  { id: 'documentary', name: '纪录片', interest: '知识 / 自然', scene: '章节转场 - 黑场过渡', videoUrl: 'https://videos.pexels.com/video-files/36501844/15477772_2560_1440_25fps.mp4', referenceUrl: 'https://www.pexels.com/zh-cn/video/36501844/', matchLogic: '匹配长镜头平缓期，展示户外、公益、教育广告', peaks: [{ start: 15, end: 30 }] },
  { id: 'food', name: '美食探店', interest: '生活 / 美食', scene: '上菜特写 - 沉浸品尝', videoUrl: 'https://videos.pexels.com/video-files/6645690/6645690-hd_1920_1080_30fps.mp4', referenceUrl: 'https://www.pexels.com/zh-cn/video/6645690/', matchLogic: '匹配特写镜头，展示厨具、调味品、生鲜广告', peaks: [{ start: 50, end: 70 }] },
  { id: 'news', name: '新闻资讯', interest: '资讯 / 时政', scene: '新闻切换 - 口播间隙', videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4', referenceUrl: '', matchLogic: '匹配财经、汽车、高端房产广告', peaks: [{ start: 10, end: 30 }, { start: 60, end: 80 }] }
]
