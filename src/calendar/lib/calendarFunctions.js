import dayjs from 'dayjs'
/**
 * Create two months' data. First month is provided parameter's month. Second month is next month of parameter's month.
 * @param {dayjs} date - instance of Dayjs object.
 * @param {Object} holidays - instance of Holiday
 * @param {dayjs} [selectStartDate=null] - (Optional) Start date of selection
 * @param {dayjs} [selectEndDate=null] - (Optional) End date of selection
 * @return {Array}
 * [
 *  {
 *    label: "December 2024",
 *    year: 2024,
 *    month: 12, // NOTICE: You don't need to +1 like native javascript date object. You can use this month value as it is.
 *    days:[
 *      {
 *        day: 25 (number: date of month)
 *        dayOfWeek: 0 (numbers from 0 (Sunday) to 6 (Saturday).)
 *        isHoliday: false (bool: true if holiday)
 *        holidayLabel: "Christmas Day" (String: label of holiday)
 *        isToday: false (bool: true if today)
 *        isSelected: false (bool: true if date is selected)
 *        selectedClass: {string} selected|selected-start|selected-middle|selected-end
 *      },
 *    ],
 *  },
 * ]
 */
export const createMonthData = (date, holidays, selectStartDate = null, selectEndDate = null) => {
    let tmpDate = date
    let result = []
    // console.log(`selectStartDate is ${selectStartDate}`)
    // console.log(`selectEndDate is ${selectEndDate}`)
    const today = dayjs(dayjs().format('YYYY-MM-DD'))

    for (let i = 0; i < 2; i++) {
        // Set 1st date
        tmpDate = tmpDate.date(1)
        const tmpDateYear = tmpDate.year()
        const tmpDateMonth = tmpDate.month()
        const endOfMonth = tmpDate.endOf('month').date()
        let obj = { 
            year: tmpDateYear,
            month: tmpDateMonth + 1,
            label: tmpDate.format('MMMM YYYY')
        }
        let days = []
        for (let j = 0; j < endOfMonth; j++) {
            const tmpDateDate = tmpDate.date()
            let dateObj = {
                day: tmpDateDate,
                dayOfWeek: tmpDate.day(),
                isHoliday: false,
                holidayLabel: '',
                isToday: false,
                isSelected: false,
                selectedClass: ''
            }
            // Check today
            dateObj.isToday = today.isSame(tmpDate)

            // Check holiday
            dateObj.isHoliday = holidays.isHoliday(tmpDateYear, tmpDateMonth + 1, tmpDateDate)
            dateObj.holidayLabel = holidays.getHolidayLabel(tmpDateYear, tmpDateMonth + 1, tmpDateDate)

            // Check selected
            if (selectStartDate !== null || selectEndDate !== null) {
                if (selectStartDate !== null && selectEndDate === null) {
                    // Select single date
                    if (selectStartDate.isSame(tmpDate)) {
                        // console.log('Select single date')
                        dateObj.isSelected = true
                        dateObj.selectedClass = 'selected'
                    }
                } else if (selectStartDate.isSame(tmpDate)) {
                    // Select start
                    dateObj.isSelected = true
                    dateObj.selectedClass = 'selected-start'
                } else if (selectEndDate.isSame(tmpDate)) {
                    // Select end
                    dateObj.isSelected = true
                    dateObj.selectedClass = 'selected-end'
                } else if (tmpDate.isAfter(selectStartDate) && tmpDate.isBefore(selectEndDate)) {
                    // Select middle
                    dateObj.isSelected = true
                    dateObj.selectedClass = 'selected-middle'
                }
            }
            days.push(dateObj)
            // this date will be next month at the last loop
            tmpDate = tmpDate.add(1, 'day')
        }
        obj.days = days
        result.push(obj)
    }
    // console.log('monthsData is ...')
    // console.log(result)
    return result
}

/**
 * 
 * @param {Array} monthData - 
 * @return {object} Selected days info
 * {
 *   label: '2024/05/01 - 2024/05/09',
 *   days: 9,
 *   businessDays: 5
 * }
 */
export const createSelectedRangeInfo = (monthData, selectStartDate, selectEndDate) => {
    const format = 'YYYY/MM/DD'
    let obj = { label: '', days: 0, businessDays: 0 }
    if (selectStartDate === null || selectEndDate === null){
        return obj
    }
    obj.label = `${selectStartDate.format(format)} - ${selectEndDate.format(format) }`
    obj.days = selectEndDate.diff(selectStartDate, 'day') + 1
    let nonBusinessDays = 0
    for (let i = 0; i < 2; i++) {
        const holidays = monthData[i].days.filter(date => {
            return date.isHoliday && date.isSelected
        })
        nonBusinessDays += holidays.length
        const weekends = monthData[i].days.filter(date => {
            return !date.isHoliday && date.isSelected && (date.dayOfWeek === 0 || date.dayOfWeek === 6)
        })
        nonBusinessDays += weekends.length
    }
    obj.businessDays = obj.days - nonBusinessDays
    return obj
}
