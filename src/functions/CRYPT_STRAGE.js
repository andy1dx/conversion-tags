import Vue from 'vue'
import SuperSessionVo from '../vo/SuperSessionVo.js'
import UserSessionVo from '../vo/UserSessionVo.js'
import POSITION from '../enums/POSITION.js'
const SECRET = '?mp6u-8dCH!TYW_tn8XpX5-dzmPYEj#d6+'
const CRYPT_STRAGE = {
  enc: text => Vue.CryptoJS.AES.encrypt(text, SECRET).toString(),
  dec: text => Vue.CryptoJS.AES.decrypt(text, SECRET).toString(Vue.CryptoJS.enc.Utf8),
  set: (key, value) => {
    const encValue = CRYPT_STRAGE.enc(value)
    Vue.$localStorage.set(key, encValue)
  },
  get: key => {
    let rtn = ''
    if (CRYPT_STRAGE.isExists(key)) {
      const encValue = Vue.$localStorage.get(key)
      rtn = CRYPT_STRAGE.dec(encValue)
    }
    return rtn
  },
  setWithoutEncrypt: (key, value) => {
    Vue.$localStorage.set(key, value)
  },
  getWithoutEncrypt: key => {
    let rtn = ''
    if (CRYPT_STRAGE.isExists(key)) {
      rtn = Vue.$localStorage.get(key)
    }
    return rtn
  },
  del: key => {
    if (CRYPT_STRAGE.isExists(key)) {
      Vue.$localStorage.remove(key)
    }
  },
  isExists: key => Vue.$localStorage.hasKey(key),
  saveSuperLastUrl: url => {
    CRYPT_STRAGE.set('superLastUrl', url)
  },
  getSuperLastUrl: () => {
    return CRYPT_STRAGE.get('superLastUrl')
  },
  delSuperLastUrl: () => {
    CRYPT_STRAGE.del('superLastUrl')
  },
  saveUserLastUrl: url => {
    CRYPT_STRAGE.set('userLastUrl', url)
  },
  getUserLastUrl: () => {
    return CRYPT_STRAGE.get('userLastUrl')
  },
  delUserLastUrl: () => {
    CRYPT_STRAGE.del('userLastUrl')
  },
  saveSuperSession: superSessionVo => {
    if (!superSessionVo) { return }
    if (superSessionVo.isEmpty()) { return }
    CRYPT_STRAGE.set('superKey', superSessionVo.getSuperKey())
    CRYPT_STRAGE.set('superName', superSessionVo.getName())
    CRYPT_STRAGE.set('superUsername', superSessionVo.getUsername())
    CRYPT_STRAGE.set('superPassword', superSessionVo.getPassword())
  },
  getSuperSession: () => {
    let session = null
    const superKey = CRYPT_STRAGE.get('superKey')
    const superName = CRYPT_STRAGE.get('superName')
    const superUsername = CRYPT_STRAGE.get('superUsername')
    const superPassword = CRYPT_STRAGE.get('superPassword')
    if (
      superKey &&
      superName &&
      superUsername &&
      superPassword
    ) {
      session = SuperSessionVo.of(superKey, superName, superUsername, superPassword)
    }
    return session
  },
  delSuperSession: () => {
    CRYPT_STRAGE.del('superKey')
    CRYPT_STRAGE.del('superName')
    CRYPT_STRAGE.del('superUsername')
    CRYPT_STRAGE.del('superPassword')
  },
  saveUserSession: userSessionVo => {
    if (!userSessionVo) { return }
    if (userSessionVo.isEmpty()) { return }
    CRYPT_STRAGE.set('managerCode', userSessionVo.getManagerCode())
    CRYPT_STRAGE.set('managerKey', userSessionVo.getManagerKey())
    CRYPT_STRAGE.set('userKey', userSessionVo.getUserKey())
    CRYPT_STRAGE.set('name', userSessionVo.getName())
    CRYPT_STRAGE.set('username', userSessionVo.getUsername())
    CRYPT_STRAGE.set('password', userSessionVo.getPassword())
  },
  getUserSession: () => {
    let session = null
    const managerCode = CRYPT_STRAGE.get('managerCode')
    const managerKey = CRYPT_STRAGE.get('managerKey')
    const userKey = CRYPT_STRAGE.get('userKey')
    const name = CRYPT_STRAGE.get('name')
    const username = CRYPT_STRAGE.get('username')
    const password = CRYPT_STRAGE.get('password')
    if (
      managerCode &&
      managerKey &&
      userKey &&
      name &&
      username &&
      password
    ) {
      session = UserSessionVo.of(managerCode, managerKey, userKey, name, username, password)
    }
    return session
  },
  delUserSession: () => {
    CRYPT_STRAGE.del('managerCode')
    CRYPT_STRAGE.del('managerKey')
    CRYPT_STRAGE.del('userKey')
    CRYPT_STRAGE.del('name')
    CRYPT_STRAGE.del('username')
    CRYPT_STRAGE.del('password')
  },
  setUserDrawerOpen (isOpen) {
    CRYPT_STRAGE.setWithoutEncrypt('userDrawerOpen', isOpen)
  },
  getUserDrawerOpen () {
    const rtn = CRYPT_STRAGE.getWithoutEncrypt('userDrawerOpen')
    return rtn === '' ? true : !!rtn
  },
  setUserDrawerPositon (positon) {
    CRYPT_STRAGE.setWithoutEncrypt('userDrawerPositon', positon)
  },
  getUserDrawerPositon () {
    const rtn = CRYPT_STRAGE.getWithoutEncrypt('userDrawerPositon')
    return rtn === '' ? POSITION.LEFT : rtn
  }
}
export default CRYPT_STRAGE
