import REST_CLIENT from '../../functions/REST_CLIENT.js'

export const auth = ({ commit }, params) => {
  const { managerCode } = params
  REST_CLIENT.managersGetKey(managerCode).then(data => {
    commit('setAuthResponse', data)
  })
}
