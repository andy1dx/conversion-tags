import axios from 'axios'
import COMMON_CONSTS from '../consts/CommonConsts.js'
const TYPE = {
  GET: 1,
  POST: 2
}
const URI = {
  MANAGERS: {
    GET_KEY_BY_TOKEN: 'managers/get_key_by_token'
  },
  SECURITY: {
    GET_CURRENT_KEY: 'security/get_current_key'
  },
  FORMS_FEEDBACKS: {
    LOAD_FORM: 'forms_feedbacks/load_form',
    SUBMIT_FORM: 'forms_feedbacks/submit_form'
  }
}
const REST_CLIENT = {
  reqest: async (uri, params, type) => {
    const url = REST_CLIENT.getUrl(uri)
    let res = { data: null }
    switch (type) {
      case TYPE.GET:
        res = await axios.get(url, { params }).catch(err => { throw err })
        break
      case TYPE.POST:
        res = await axios.post(url, params).catch(err => { throw err })
        break
      default: break
    }
    const { data } = res
    return data
  },
  get: async (uri, params) => REST_CLIENT.reqest(uri, params, TYPE.GET),
  post: async (uri, params) => REST_CLIENT.reqest(uri, params, TYPE.POST),
  formFeedbackLoadPage: async (key, formKey, url, parameters) => {
    const conditions = (key && formKey && url) ? { key, form_key: formKey, url, parameters } : {}
    return REST_CLIENT.post(URI.FORMS_FEEDBACKS.LOAD_FORM, conditions)
  },
  formFeedbackSubmitPage: async (key, formFeedbackKey, fields) => {
    const conditions = (key && formFeedbackKey && fields) ? { key, form_feedback_key: formFeedbackKey, fields } : {}
    return REST_CLIENT.post(URI.FORMS_FEEDBACKS.SUBMIT_FORM, conditions)
  },
  getCurrentKey: async (constantKey) => {
    const conditions = (constantKey) ? { constant_key: constantKey } : {}
    return REST_CLIENT.post(URI.SECURITY.GET_CURRENT_KEY, conditions)
  },
  managersGetKey: async (token) => {
    const conditions = (token) ? { token } : {}
    return REST_CLIENT.postByCurrentKey(URI.MANAGERS.GET_KEY_BY_TOKEN, conditions)
  },
  postByCurrentKey: async (uri, params) => {
    return REST_CLIENT.getCurrentKey(COMMON_CONSTS.CONSTANT_KEY).then(data => {
      params.current_key = data.current_key
      return REST_CLIENT.post(uri, params)
    })
  },
  getUrl: uri => `http://${COMMON_CONSTS.API_HOST}/${COMMON_CONSTS.API_DIR_NAME}/${uri}`
}
export default REST_CLIENT
