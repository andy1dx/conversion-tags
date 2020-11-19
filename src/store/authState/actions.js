import REST_CLIENT from '../../functions/REST_CLIENT.js'

export const auth = ({ commit }, params) => {
  const { token } = params
  REST_CLIENT.managersGetKey(token).then(data => {
    commit('setAuthResponse', data)
  })
}
