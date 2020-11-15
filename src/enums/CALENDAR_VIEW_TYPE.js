const CALENDAR_VIEW_TYPE = {
  WEEK: 'week',
  MONTH: 'month'
}
export const isWeek = type => type === CALENDAR_VIEW_TYPE.WEEK
export const isMonth = type => type === CALENDAR_VIEW_TYPE.MONTH
export default CALENDAR_VIEW_TYPE
