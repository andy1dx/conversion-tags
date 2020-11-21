const VALIDATION_RULE = {
  REQUIRED: val => !!val,
  NUMERIC: val => !!val.match(/^[0-9]+$/),
  ALPHA_NUMERIC: val => !!val.match(/^[0-9a-zA-Z]+$/),
  ALPHA_NUMERIC_LINE: val => !!val.match(/^[0-9a-zA-Z-_]+$/),
  MIN_CHARACTER: (val, min) => val.length > min,
  MIN_NUMBER: (val, min) => val > min,
  MAX_CHARACTER: (val, max) => val.length < max,
  MAX_NUMBER: (val, max) => val < max,
  EMAIL: val => !!val.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
}
export default VALIDATION_RULE
