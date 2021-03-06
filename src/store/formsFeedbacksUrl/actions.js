import REST_CLIENT from '../../functions/REST_CLIENT.js'

export const getLoadForm = ({ commit }, params) => {
  REST_CLIENT.formFeedbackLoadPage(params.managerKey, params.formKey, params.url, params.urlReferral, params.mode, params.parameters).then(data => {
    commit('setLoadResponse', data)
  })
}
export const submitFeedbackForm = ({ commit }, params) => {
  REST_CLIENT.formFeedbackSubmitPage(params.key, params.formFeedbackKey, params.fields).then(data => {
    commit('setSubmitResponse', data)
  })
}
