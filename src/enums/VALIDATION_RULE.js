const VALIDATION_RULE = {
  REQUIRED: val => !!val,
  NUMERIC: val => !!val.match(/^[0-9]+$/),
  ALPHA_NUMERIC: val => !!val.match(/^[0-9a-zA-Z]+$/),
  ALPHA_NUMERIC_LINE: val => !!val.match(/^[0-9a-zA-Z-_]+$/),
  EMAIL: val => !!val.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
}
export default VALIDATION_RULE
