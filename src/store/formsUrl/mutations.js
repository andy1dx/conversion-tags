export const setLoadResponse = (state, data) => {
  const { result, codes } = data
  const form = data.form || {}
  state.result = result
  state.codes = codes
  state.form = form
}
