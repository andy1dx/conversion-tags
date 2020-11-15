const URL = {
  USER: {
    LOGIN: {
      url: '/user/login',
      isApp: false
    },
    TOP: {
      name: 'top',
      icon: 'apps',
      url: '/',
      isApp: false
    }
  }
}
export const getByUrl = url => {
  let rtn = {}
  for (const k in URL) {
    const URL_OBJ = URL[k]
    const arr = Object.keys(URL_OBJ)
      .filter(key => URL_OBJ[key].url === url)
      .map(key => URL_OBJ[key])
    if (arr.length > 0) {
      rtn = arr[0]
      break
    }
  }
  return rtn
}
export default URL
