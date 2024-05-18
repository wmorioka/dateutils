const keyHolidaysData = '/v1/holidays-data'
export function saveHolidays(data){
    localStorage.setItem(keyHolidaysData, data)
}
export function getHolidays(){
    const value = localStorage.getItem(keyHolidaysData)
    if (value === null) {
        return ''
    } else {
        return value
    }
}
