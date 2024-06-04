const holidaysStorageKey = '/v1/holidays-data'
/**
 * 
 */
export class Holidays {
    // Public properties
    csvText = ''
    errorMessages = []

    // private properties
    _data = {}
    constructor() {
        this.csvText = this.getStorageData()
        this.update()
    }
    update() {
        // console.log(`class Holidays: csvText = ${this.csvText}`)
        this._data = this.convertCSVToObject(this.csvText)
    }
    /**
     * Check if date is holiday
     * @param {Number} year 
     * @param {Number} month 
     * @param {Number} date 
     * @returns {bool} true if date is holiday.
     */
    isHoliday(year, month, date){
        return (this._data[year] !== undefined
            && this._data[year][month] !== undefined
            && this._data[year][month][date] !== undefined) 
    }
    /**
     * Retreive holiday's label text
     * @param {Number} year 
     * @param {Number} month 
     * @param {Number} date 
     * @returns {string} label - if date isn't holiday, returns empty string
     */
    getHolidayLabel(year, month, date) {
        if (this._data[year] !== undefined
            && this._data[year][month] !== undefined
            && this._data[year][month][date] !== undefined) {
            return this._data[year][month][date]
        } else {
            return ''
        }
    }
    /**
     * If validate returns false, you can see error message via holidays.errorMessages
     * @returns {bool} true if valid, false if invalid
     * 
     */
    validate() {
        this.errorMessages = []
        if (this.csvText === '') {
            return true
        }
        const pattern = /\d{4}\/\d{1,2}\/\d{1,2},.*/
        this.csvText.split("\n").forEach(row => {
            if (!pattern.test(row)) {
                this.errorMessages.push(`"${row}" is wrong format.`)
            }
        })
        return this.errorMessages.length === 0
    }
    save(){
        this.errorMessages = []
        try {
            localStorage.setItem(holidaysStorageKey, this.csvText)
        } catch (e) {
            console.log(e)
            this.errorMessages.push(`${e.name}: ${e.message}`)
            return false
        }
        return true
    }
    getStorageData(){
        let value = ''
        try {
            value = localStorage.getItem(holidaysStorageKey)
        } catch (e) {
            console.log(e)
            return ''
        }
        if (value === null) {
            return ''
        } else {
            return value
        }
    }
    convertCSVToObject(text){
        let obj = {}
        if (text === '' || text === null) {
            return obj
        }
        const pattern = /(\d{4})\/(\d{1,2})\/(\d{1,2}),(.*)/
        text.split("\n").forEach(row => {
            const match = row.match(pattern)
            if (match === null) {
                // console.log(`Holidays CSV format does not match: ${row}`)
            } else {
                let day = {}
                day[Number(match[3])] = match[4]
                let month = {}
                month[Number(match[2])] = day
                if (obj[Number(match[1])] === undefined) {
                    obj[Number(match[1])] = month
                } else if (obj[Number(match[1])][Number(match[2])] === undefined) {
                    obj[Number(match[1])][Number(match[2])] = day
                } else {
                    obj[Number(match[1])][Number(match[2])][Number(match[3])] = match[4]
                }
            }
        })
        // console.log(`class Holidays: Holidays Object is ...`)
        // console.log(obj)
        return obj
    }
}
