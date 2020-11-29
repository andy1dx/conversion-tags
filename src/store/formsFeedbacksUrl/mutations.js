import FIELD_CATEGORIES_TYPE from '../../enums/FIELD_CATEGORIES_TYPE.js'
import COMMON_FUNC from '../../functions/COMMON_FUNC.js'

const prepareValue = (fields) => {
  if (fields && fields.length > 0) {
    fields.forEach(field => {
      field.value = setValueType(field)
    })
  }
  return fields
}
const setValueType = (field) => {
  let rtn = ''
  if (
    field.type === FIELD_CATEGORIES_TYPE.CHECKBOX
  ) {
    rtn = []
  }
  if (
    field.type === FIELD_CATEGORIES_TYPE.TEXTBOX && field.column_total === 2
  ) {
    rtn = ['', '']
  }
  if (
    field.type === FIELD_CATEGORIES_TYPE.TEXTBOX && field.column_total === 3
  ) {
    rtn = ['', '', '']
  }
  return rtn
}
export const setLoadResponse = (state, data) => {
  const { result, codes } = data
  const formFeedbackKey = data.key || ''
  const form = data.form || {}
  state.result = result
  state.codes = codes
  state.formFeedbackKey = formFeedbackKey
  state.form = form
  if (form) {
    const fields = form.fields || {}
    state.fields = prepareValue(fields)
    state.finishPage = form.finish_page
  }
}
export const setSubmitResponse = (state, data) => {
  const { result, codes } = data
  state.result = result
  state.codes = codes
  state.isSubmit = true
}
export const setFieldsValue = (state, data) => {
  const fields = state.fields
  const { value, index } = data
  fields[index].value = value
  state.fields = COMMON_FUNC.setArrayWithoutReference(fields)
}
export const setFieldsValueColumn = (state, data) => {
  const fields = state.fields
  const { value, index, arr } = data
  fields[index].value[arr] = value
  state.fields = COMMON_FUNC.setArrayWithoutReference(fields)
}
