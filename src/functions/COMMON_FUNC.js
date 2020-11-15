const COMMON_FUNC = {
  formatDate (date, format) {
    format = format.replace(/yyyy/g, date.getFullYear())
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
    return format
  },
  getCurrentUrlPath () {
    const path = location.href
    const ex = path.split('#')
    return ex[ex.length - 1]
  },
  getNextTargetUrl (defaultUrl) {
    let rtn = defaultUrl
    const target = COMMON_FUNC.getQueryVariable('target')
    const lastTarget = target.replace(/%2F/g, '/')
    if (lastTarget) { rtn = lastTarget }
    return rtn
  },
  setArrayWithoutReference (array) {
    return JSON.parse(JSON.stringify(array))
  },
  getQueryVariable (variable) {
    let rtn = ''
    const url = window.location.href
    const ex = url.split('?')
    const query = ex[ex.length - 1]
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i += 1) {
      const pair = vars[i].split('=')
      if (pair[0] === variable) {
        rtn = pair[1]
        break
      }
    }
    return rtn
  }
}
export default COMMON_FUNC
