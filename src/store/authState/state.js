import URL, { getByUrl } from '../../enums/URL.js'
export default function () {
  return {
    url: getByUrl(URL.USER.TOP.url),
    result: false,
    codes: [],
    managerKey: ''
  }
}
