import dayjs from 'dayjs'
/**
 * Create two months' data. First month is provided parameter's month. Second month is next month of parameter's month.
 * @param Dayjs date: instance of Dayjs object.
 * @param Object holiday: instance of Holiday
 * @return array
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
 *      },
 *    ],
 *  },
 * ]
 */
export default function createMonthData(date, holiday) {
    let tmpDate = date
    let result = []

    const today = dayjs()
    const todayYear = today.year()
    const todayMonth = today.month()
    const todayDate = today.date()

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
                holidayLabel: "",
                isToday: false
            }
            if (todayYear === tmpDateYear
                && todayMonth === tmpDateMonth
                && todayDate === tmpDateDate) {
                dateObj.isToday = true
            }
            // console.log(holiday)
            if (dateObj.isToday === false
                && holiday[tmpDateYear] !== undefined
                && holiday[tmpDateYear][tmpDateMonth + 1] !== undefined
                && holiday[tmpDateYear][tmpDateMonth + 1][tmpDateDate] !== undefined) {
                dateObj.isHoliday = true
                dateObj.holidayLabel = holiday[tmpDateYear][tmpDateMonth + 1][tmpDateDate]
            }
            days.push(dateObj)
            // this date will be next month at the last loop
            tmpDate = tmpDate.add(1, 'day')
        }
        obj.days = days
        result.push(obj)
    }
    console.log(result)
    return result
}