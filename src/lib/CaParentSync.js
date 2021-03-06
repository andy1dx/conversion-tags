const PARENT_EVENT_HEAD = 'CA_PARENT_EVENT_'
const ELM = document.createElement('div')
const EVENT_NAME_HEAD = 'CA_EVENT_HEAD_'

export default class CaParentSync {
  constructor (window) {
    this.username = ''
    this.Vue = {}
    this.window = window
    this.managerKey = ''
    this.token = ''
    this.url = ''
    this.urlReferral = ''
    this.formKey = ''
    this.parameters = {}
    this.parametersReferral = {}
    this.setBindEventParent()
    this.init()
  }

  init () {
    this.window.onload = () => {
      var container = this.window.document.getElementById('ca_container')
      var params = {
        type: this.SEND_EVENT.HEIGHT_CHANGE,
        height: container.offsetHeight
      }
      window.parent.postMessage(params, '*')
    }
  }

  pageLoadChange () {
    setTimeout(() => {
      var container = this.window.document.getElementById('ca_container')
      container.style.removeProperty('min-height')
      var params = {
        type: this.SEND_EVENT.HEIGHT_CHANGE,
        height: container.offsetHeight
      }
      window.parent.postMessage(params, '*')
    }, 10)
  }

  dispatch (EVENT_TYPE, data) {
    ELM.dispatchEvent(new CustomEvent(`${EVENT_NAME_HEAD}${EVENT_TYPE}`, { detail: data }))
  }

  on (EVENT_TYPE, callback) {
    ELM.addEventListener(`${EVENT_NAME_HEAD}${EVENT_TYPE}`, callback)
  }

  off (EVENT_TYPE, callback) {
    ELM.removeEventListener(`${EVENT_NAME_HEAD}${EVENT_TYPE}`, callback)
  }

  bindEventParent (eventName, eventHandler) {
    if (this.window.addEventListener) {
      this.window.addEventListener(eventName, eventHandler, false)
    } else if (this.window.attachEvent) {
      this.window.attachEvent('on' + eventName, eventHandler)
    }
  }

  bindEventParentOn (eventType, eventHandler) {
    this.bindEventParent('message', function (e) {
      if (e.data.type && e.data.type === PARENT_EVENT_HEAD + eventType) {
        eventHandler(e.data.data)
      }
    })
  }

  setBindEventParent () {
    this.bindEventParentOn(this.PARENT_EVENT.RUN_INIT, this.parentEventRunInit.bind(this))
  }

  setWindow (window) { this.window = window }
  setManagerKey (managerKey) { this.managerKey = managerKey }
  getManagerKey () { return this.managerKey }
  setToken (token) { this.token = token }
  getToken () { return this.token }
  setUrl (url) { this.url = url }
  getUrl () { return this.url }
  setUrlReferral (urlReferral) { this.urlReferral = urlReferral }
  getUrlReferral () { return this.urlReferral }
  setFormKey (formKey) { this.formKey = formKey }
  getFormKey () { return this.formKey }
  getParameters () { return this.parameters }
  setParametersFromUrl (parameters) {
    if (parameters && parameters.length > 0) {
      var onjParameters = JSON.parse('{"' + parameters.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === '' ? value : decodeURIComponent(value) })
      this.parameters = onjParameters
    }
  }

  getParametersReferral () { return this.parametersReferral }
  setParametersReferralFromUrl (urlReferral) {
    let parameters = ''
    if (urlReferral) {
      if (urlReferral.includes('?')) {
        var res = urlReferral.split('?')
        parameters = res[1]
        if (parameters && parameters.length > 0) {
          var onjParameters = JSON.parse('{"' + parameters.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === '' ? value : decodeURIComponent(value) })
          this.parametersReferral = onjParameters
        }
      }
    }
  }

  parentEventRunInit (data) {
    console.log(data)
    if (data) {
      this.setManagerKey(data.managerKey)
      this.setToken(data.token)
      this.setUrl(data.url)
      this.setUrlReferral(data.url_referral)
      this.setFormKey(data.formKey)
      this.setParametersFromUrl(data.parameters)
      this.setParametersReferralFromUrl(data.url_referral)
    }
    this.dispatch(this.EVENT_TYPE.ON_INIT_CHANGE, {
      token: data.token,
      url: data.url,
      urlReferral: data.url_referral,
      formKey: data.formKey,
      parameters: this.parameters
    })
  }
}

CaParentSync.prototype.PARENT_EVENT = {
  RUN_INIT: 'RUN_INIT'
}

CaParentSync.prototype.EVENT_TYPE = {
  ON_INIT_CHANGE: 'ON_INIT_CHANGE'
}

CaParentSync.prototype.SEND_EVENT = {
  HEIGHT_CHANGE: 'HEIGHT_CHANGE'
}
