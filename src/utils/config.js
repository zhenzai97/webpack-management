module.exports = {
  appCode: 'OAHG',
  appName: '合规体检系统',
  adminRoleCode: '00000',
  tokenTime: 2, // 小时
  appUrl: {
    dev: {
      baseUrl: 'http://127.0.0.1:811',
      sourceUrl: 'http://127.0.0.1:8089'
    },
    pro: {
        baseUrl: 'http://10.0.3.123:811',
        sourceUrl: 'http://10.0.3.123:8089'
    }
  },
  home: {
    path: 'home',
    title: '首页'
  },
  msgTime: 30 // 获取消息的时间间隔 单位 s
}
// 10.8.215.126
