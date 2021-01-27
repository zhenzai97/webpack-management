import config from './config'
/**
 * 将对象格式化为url
 * @param {*} obj
 */
export const formatUrl = obj => {
  const params = Object.values(obj).reduce((a, b, i) => `${a}${Object.keys(obj)[i]}=${b}&`, '?')
  return params.substring(0, params.length - 1)
}

/**
 * 格式化页面title
 * @param {*} title
 */
export function generateTitle(title) {
  // if (hasKey) {
  //   // $t :this method from vue-i18n, inject in @/lang/index.js
  //   const translatedTitle = this.$t('route.' + title)

  //   return translatedTitle
  // }
  return title
}

/**
 * 获取每个页面的 title
 * @param {*} pageName
 */
export function getPageTitle(pageName) {
  return `${pageName} - ${config.appName}`
}

/**
 * map转json
 * @param {*} map
 */
export function mapToJSON(map) {
  const obj = []
  for (const [k, v] of map) {
    obj.push({
      key: k,
      value: v
    })
  }
  return obj
}

/**
 *  json转map
 * @param {*} jsonObj
 */
export function JSONToMap(jsonArrObj) {
  const obj = new Map()
  jsonArrObj.forEach(el => {
    obj.set(el.key, el.value)
  })
  return obj
}

/**
 * 验证密码的复杂度
 * @param {Array} checkTypeArr 传入验证的类型 可为[enUp,enLow,num,enSymbol,zhCNSysmbol]
 * @param {Object} obj 重写的正则
 * @param {String} value 需要验证的值
 */
export function checkPwd(checkTypeArr, obj, value) {
  const regEnUp = /[A-Z]+/ // 英文字符大写
  const regEnLow = /[a-z]+/ // 英文字符小写
  const regNum = /[0-9]+/ // 数字
  let regEnSymbol = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im // 英文特殊字符
  let regZhCnSymbol = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im // 中文特殊字符
  for (const key in obj) {
    switch (key) {
      case 'enSymbol':
        regEnSymbol = obj[key]
        break
      case 'zhCNSysmbol':
        regZhCnSymbol = obj[key]
        break
    }
  }
  const result = []
  checkTypeArr.forEach(el => {
    let res = ''
    switch (el) {
      case 'enUp':
        res = regEnUp.test(value)
        break
      case 'enLow':
        res = regEnLow.test(value)
        break
      case 'num':
        res = regNum.test(value)
        break
      case 'enSymbol':
        res = regEnSymbol.test(value)
        break
      case 'zhCNSysmbol':
        res = regZhCnSymbol.test(value)
        break
    }
    if (res) {
      result.push({
        type: el,
        check: res
      })
    }
  })
  return result
}
