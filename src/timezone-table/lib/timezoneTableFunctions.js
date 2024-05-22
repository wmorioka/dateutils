import { timezones } from '../../lib/timezones'
const timezonesStorageKey = '/v1/timezones-data'
const tableClassSettings = {
    '0': 'bg-slate-800 text-white',
    '1': 'bg-slate-700 text-white',
    '2': 'bg-slate-600 text-white',
    '3': 'bg-slate-500 text-white',
    '4': 'bg-slate-400 text-white',
    '5': 'bg-slate-300',
    '6': 'bg-slate-200',
    '7': 'bg-slate-100',
    '8': '',
    '9': '',
    '10': '',
    '11': '',
    '12': '',
    '13': '',
    '14': '',
    '15': '',
    '16': '',
    '17': 'bg-slate-100',
    '18': 'bg-slate-200',
    '19': 'bg-slate-300',
    '20': 'bg-slate-400 text-white',
    '21': 'bg-slate-500 text-white',
    '22': 'bg-slate-600 text-white',
    '23': 'bg-slate-700 text-white',
}
function compareTimezone(a, b){
    const nameA = a.zoneInfo.abbreviation.toUpperCase()
    const nameB = b.zoneInfo.abbreviation.toUpperCase()
    const offsetA = a.zoneInfo.offsetMinites
    const offsetB = b.zoneInfo.offsetMinites
    if (offsetA < offsetB) return -1
    if (offsetA > offsetB) return 1
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
}
/**
 * Create timezone data
 * @param {Array} selectedTimezoneIDs - list of timezone id
 * @returns {Array} 
 */
export function createTimezoneData(selectedTimezoneIDs){
    let result = []
    for (let i = 0; i < selectedTimezoneIDs.length; i++) {
        if (timezones[selectedTimezoneIDs[i]] === undefined) {
            console.log(`id does not exist in timezone list: ${selectedTimezoneIDs[i]}`)
            continue
        }
        let tmp = {}
        tmp.id = selectedTimezoneIDs[i]
        tmp.zoneInfo = timezones[selectedTimezoneIDs[i]]
        tmp.table = []
        // create table data
        let hour = 0
        const minutes = Math.abs(tmp.zoneInfo.offsetMinites % 60)
        if (tmp.zoneInfo.offsetMinites < 0){
            hour = 24 + Math.floor(tmp.zoneInfo.offsetMinites / 60)
        } else {
            hour += Math.floor(tmp.zoneInfo.offsetMinites / 60)
        }
        const minutesLabel = (minutes > 0 ? minutes : '00')
        for (let j = 0; j < 24; j++) {
            tmp.table.push({
                label: `${hour}:${minutesLabel}`,
                class: tableClassSettings[hour]
            })
            if (hour >= 23){
                hour = 0
            } else {
                hour++
            }
        }

        result.push(tmp)
    }
    result.sort(compareTimezone)
    return result
}

export function saveTimezoneIDs(data){
    try {
        localStorage.setItem(timezonesStorageKey, JSON.stringify(data))
    } catch (e) {
        console.log(e)
        return false
    }
    return true
}
export function getTimezoneIDs(){
    let data = []
    try {
        data = localStorage.getItem(timezonesStorageKey)
    } catch (e) {
        console.log(e)
        return []
    }
    if (data === null) {
        return null
    } else {
        return JSON.parse(data)
    }
}
