import CaParentSync from '../lib/CaParentSync.js'
const CaSync = {
  install (Vue) {
    Vue.prototype.$casync = new CaParentSync(window)
  }
}
export default CaSync
