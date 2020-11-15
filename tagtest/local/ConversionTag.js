class ConversionTag {
  constructor (window) {
    this.username = ''
    this.window = window
    this.managerKey = ''
    this.managerCode = ''
    this.url = ''
    this.formKey = ''
    this.parameters = {}
    this.iframe = {}
    this.iframeSource = 'http://localhost:8084/'
  }
  setManagerKey (managerKey) { this.managerKey = managerKey }
  getManagerKey () { return this.managerKey }
  setManagerCode (managerCode) { this.managerCode = managerCode }
  getManagerCode () { return this.managerCode }
  setUrl (url) { this.url = url }
  getUrl () { return this.url }
  setFormKey (formKey) { this.formKey = formKey }
  getFormKey () { return this.formKey }
  run() {
    this.setIframe()
    this.window.onload = () => {
      this.sendEventToChild();
    };
  }
  setIframe() {
    var iframe = this.window.document.createElement('iframe');
    iframe.setAttribute('src', this.iframeSource);
    iframe.setAttribute('id', 'the_iframe');
    iframe.style.width = '100%';
    iframe.style.border = 'none';
    iframe.style.height = '500px';
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
        managerCode: this.managerCode,
        url: this.window.location.href,
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
