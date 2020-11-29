const VALIDATION_RULE = {
  REQUIRED: val => !!val,
  NUMERIC: val => !!val.match(/^[0-9]+$/),
  ALPHA_NUMERIC: val => !!val.match(/^[0-9a-zA-Z]+$/),
  ALPHA_NUMERIC_LINE: val => !!val.match(/^[0-9a-zA-Z-_]+$/),
  MIN_CHARACTER: (val, min) => val.length > min,
  MIN_NUMBER: (val, min) => val > min,
  MAX_CHARACTER: (val, max) => val.length < max,
  MAX_NUMBER: (val, max) => val < max,
  EMAIL: val => !!val.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
  TELEPHONE: val => !!val.match(/^(0([1-9]{1}-?[1-9]\d{3}|[1-9]{2}-?\d{3}|[1-9]{2}\d{1}-?\d{2}|[1-9]{2}\d{2}-?\d{1})-?\d{4}|0[789]0-?\d{4}-?\d{4}|050-?\d{4}-?\d{4})$/),
  TELEPHONE_1_BOX: val => !!val.match(/^(0([1-9]{1}-?[1-9]\d{3}|[1-9]{2}-?\d{3}|[1-9]{2}\d{1}-?\d{2}|[1-9]{2}\d{2}-?\d{1})-?\d{4}|0[789]0-?)$/),
  TELEPHONE_2_BOX: val => !!val.match(/^(\d{4}-?)$/),
  TELEPHONE_3_BOX: val => !!val.match(/^(\d{4}|050-?\d{4}-?\d{4})$/)
}
export default VALIDATION_RULE
