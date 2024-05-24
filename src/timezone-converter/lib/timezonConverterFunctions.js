const cconvertHistoryStorageKey = '/v1/convert-history'

export const validateDatetimeFormat = (date) => {
    const pattern = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/
    if (!pattern.test(date)) return false
    return !isNaN(new Date(date).getTime())
}
export function saveConvertHistory(data) {
    try {
        localStorage.setItem(cconvertHistoryStorageKey, JSON.stringify(data))
    } catch (e) {
        console.log(e)
        return false
    }
    return true
}
export function getConvertHistory() {
    let data = null
    try {
        data = localStorage.getItem(cconvertHistoryStorageKey)
    } catch (e) {
        console.log(e)
        return null
    }
    if (data === null) {
        return null
    } else {
        return JSON.parse(data)
    }
}