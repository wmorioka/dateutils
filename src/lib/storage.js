const keyHolidaysData = '/v1/holidays-data'
export function saveHolidays(data){
    localStorage.setItem(keyHolidaysData, data);
}
export function getHolidays(){
    return localStorage.getItem(keyHolidaysData)
}
