class ConversionTag {
  constructor (window) {
    this.window = window
    this.token = ''
    this.url = ''
    this.url_referral = ''
    this.formKey = ''
    this.parameters = {}
    this.iframe = {}
    this.iframeSource = 'http://localhost:8084/'
  }
  setToken (token) { this.token = token }
  getToken () { return this.token }
  setUrl (url) { this.url = url }
  getUrl () { return this.url }
  setFormKey (formKey) { this.formKey = formKey }
  getFormKey () { return this.formKey }
  run() {
    this.setIframe()
    this.window.onload = () => {
      this.sendEventToChild();
    };
    this.bindEvent(window, 'message', function (e) {
      const { data } = e
      var iframe = this.window.document.getElementById('the_iframe');
      if (data.type === 'HEIGHT_CHANGE') {
        iframe.style.height = data.height + 'px';
      }
    });
  }
  setIframe() {
    var iframe = this.window.document.createElement('iframe');
    iframe.setAttribute('src', this.iframeSource);
    iframe.setAttribute('id', 'the_iframe');
    iframe.style.width = '100%';
    iframe.style.height = '90px';
    iframe.style.border = 'none';
    this.iframe = iframe

    var results = this.window.document.getElementById('__ca_conversion_analytics');
    if (results) {
      results.appendChild(iframe);      
    }
  }
  sendEventToChild() {
    var params = {
      type: 'CA_PARENT_EVENT_RUN_INIT',
      data: {
        token: this.token,
        url: this.window.location.href,
        url_referral: this.window.document.referrer,
        formKey: this.formKey,
        parameters: this.window.location.search.substring(1)
      }
    }
    this.iframe.contentWindow.postMessage(params, '*');
  }
  bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener){
      element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, eventHandler);
    }
  }
}
var conversionTag = new ConversionTag(window);
