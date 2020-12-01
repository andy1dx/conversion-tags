import REST_CLIENT from '../../functions/REST_CLIENT.js'

export const getFormOne = ({ commit }, params) => {
  REST_CLIENT.formsGetone(params.managerKey, params.formKey).then(data => {
    commit('setLoadResponse', data)
  })
}
