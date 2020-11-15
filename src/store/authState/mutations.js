export const set = (state, url) => {
  state.url = url
}

export const setAuthResponse = (state, data) => {
  const { result, codes } = data
  const managerKey = data.manager_key
  state.result = result
  state.codes = codes
  state.managerKey = managerKey
}
