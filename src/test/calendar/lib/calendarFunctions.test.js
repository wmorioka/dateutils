import { createMonthData, createSelectedDaysInfo, validateHolidaysCSV, convertHolidaysCSV } from '../../../calendar/lib/calendarFunctions'
import dayjs from 'dayjs'
import { describe, expect, it, vi } from 'vitest'

const TEST_DATE = '2024-01-01'
describe('createMonthData', ()=> {
    it('creates two month data', () => {
        const date = dayjs(TEST_DATE)
        const monthData = createMonthData(date, {})
        expect(monthData.length).toBe(2)
    })
    it('has year', () => {
        const date = dayjs(TEST_DATE)
        const monthData = createMonthData(date, {})
        expect(monthData[0].year).toBe(2024)
        expect(monthData[1].year).toBe(2024)
    })
    it('has month', () => {
        const date = dayjs(TEST_DATE)
        const monthData = createMonthData(date, {})
        expect(monthData[0].month).toBe(1)
        expect(monthData[1].month).toBe(2)
    })
    it('has label', () => {
        const date = dayjs(TEST_DATE)
        const monthData = createMonthData(date, {})
        expect(monthData[0].label).toBe('January 2024')
        expect(monthData[1].label).toBe('February 2024')
    })
    it('has days', () => {
        const date = dayjs(TEST_DATE)
        const monthData = createMonthData(date, {})
        // There are 31 days in January 2024
        expect(monthData[0].days.length).toBe(31)
        // There are 29 days in Feb 2024
        expect(monthData[1].days.length).toBe(29)
    })
    it('sets Jan 1st as holiday', () => {
        const date = dayjs(TEST_DATE)
        const holidayName = 'test holiday name'
        const holiday = { 2024: { 1: { 1: holidayName }}}
        const monthData = createMonthData(date, holiday)
        // Jan 1 should be holiday
        expect(monthData[0].days[0].isHoliday).toBeTruthy()
        expect(monthData[0].days[0].holidayLabel).toBe(holidayName)
        // Jan 2 should not be holiday
        expect(monthData[0].days[1].isHoliday).toBeFalsy()
        expect(monthData[0].days[1].holidayLabel).toBe('')
    })
    it('sets todays flag', () => {
        vi.useFakeTimers()
        // Set system date as 2024-01-01
        const fakeDate = new Date(2024, 0, 1)
        vi.setSystemTime(fakeDate)

        const date = dayjs(TEST_DATE)
        const holidayName = 'test holiday name'
        const holiday = { 2024: { 1: { 1: holidayName }}}
        const monthData = createMonthData(date, holiday)
        // Jan 1 should be today
        expect(monthData[0].days[0].isToday).toBeTruthy()
        // Jan 1 should be holiday. 
        expect(monthData[0].days[0].isHoliday).toBeTruthy()
        expect(monthData[0].days[0].holidayLabel).toBe('test holiday name')
        // Jan 2 should not be today
        expect(monthData[0].days[1].isToday).toBeFalsy()
        
        vi.useRealTimers()
    })
    it('sets selected-class: selected', () => {
        const date = dayjs(TEST_DATE)
        const testDate = 15
        const selected = dayjs(`2024-01-${testDate}`)
        const monthData = createMonthData(date, {}, selected)

        expect(monthData[0].days[testDate - 1].isSelected).toBeTruthy()
        expect(monthData[0].days[testDate - 1].selectedClass).toBe('selected')

    })
    it('sets selected-class: selected-start', () => {
        const date = dayjs(TEST_DATE)
        // Selected range is 2024-01-15 to 2024-01-17
        const testStartDate = 15
        const testEndDate = 17
        const selectedStart = dayjs(`2024-01-${testStartDate}`)
        const selectedEnd = dayjs(`2024-01-${testEndDate}`)
        const monthData = createMonthData(date, {}, selectedStart, selectedEnd)

        expect(monthData[0].days[testStartDate - 1].isSelected).toBeTruthy()
        expect(monthData[0].days[testStartDate - 1].selectedClass).toBe('selected-start')

    })
    it('sets selected-class: selected-middle', () => {
        const date = dayjs(TEST_DATE)
        // Selected range is 2024-01-15 to 2024-01-17
        const testStartDate = 15
        const testMiddleDate = 16
        const testEndDate = 17
        const selectedStart = dayjs(`2024-01-${testStartDate}`)
        const selectedEnd = dayjs(`2024-01-${testEndDate}`)
        const monthData = createMonthData(date, {}, selectedStart, selectedEnd)

        expect(monthData[0].days[testMiddleDate - 1].isSelected).toBeTruthy()
        expect(monthData[0].days[testMiddleDate - 1].selectedClass).toBe('selected-middle')

    })
    it('sets selected-class: selected-end', () => {
        const date = dayjs(TEST_DATE)
        // Selected range is 2024-01-15 to 2024-01-17
        const testStartDate = 15
        const testEndDate = 17
        const selectedStart = dayjs(`2024-01-${testStartDate}`)
        const selectedEnd = dayjs(`2024-01-${testEndDate}`)
        const monthData = createMonthData(date, {}, selectedStart, selectedEnd)

        expect(monthData[0].days[testEndDate - 1].isSelected).toBeTruthy()
        expect(monthData[0].days[testEndDate - 1].selectedClass).toBe('selected-end')

    })
})

describe('createSelectedDaysInfo', () => {
    it('has label', () => {
        const date = dayjs(TEST_DATE)
        const startDateLabel = '2024-01-01'
        const endDateLabel = '2024-01-15'
        const selectedStart = dayjs(startDateLabel)
        const selectedEnd = dayjs(endDateLabel)
        const format = 'YYYY/MM/DD'
        const expected = `${selectedStart.format(format)} - ${selectedEnd.format(format) }`
        const monthData = createMonthData(date, {}, selectedStart, selectedEnd)
        const selectedDaysInfo = createSelectedDaysInfo(monthData, selectedStart, selectedEnd)
        expect(selectedDaysInfo.label).toBe(expected)
    })
    it('has duration', () => {
        const date = dayjs(TEST_DATE)
        const startDateLabel = '2024-01-01'
        const endDateLabel = '2024-01-15'
        const selectedStart = dayjs(startDateLabel)
        const selectedEnd = dayjs(endDateLabel)
        const expected = 15
        const monthData = createMonthData(date, {}, selectedStart, selectedEnd)
        const selectedDaysInfo = createSelectedDaysInfo(monthData, selectedStart, selectedEnd)
        expect(selectedDaysInfo.duration).toBe(expected)
    })
    it('has businessDays', () => {
        const date = dayjs(TEST_DATE)
        const startDateLabel = '2024-01-01'
        const endDateLabel = '2024-01-15'
        const selectedStart = dayjs(startDateLabel)
        const selectedEnd = dayjs(endDateLabel)
        const expected = 11
        const monthData = createMonthData(date, {}, selectedStart, selectedEnd)
        const selectedDaysInfo = createSelectedDaysInfo(monthData, selectedStart, selectedEnd)
        expect(selectedDaysInfo.businessDays).toBe(expected)
    })
    it('businessDays excludes holidays', () => {
        const holiday = { 
            2024: { 
                1: { 
                    1: 'test holiday1',
                    2: 'test holiday2',
                    3: 'test holiday3',
                    8: 'test holiday4'
                } 
            } 
        }
        const date = dayjs(TEST_DATE)
        const startDateLabel = '2024-01-01'
        const endDateLabel = '2024-01-15'
        const selectedStart = dayjs(startDateLabel)
        const selectedEnd = dayjs(endDateLabel)
        const expected = 7
        const monthData = createMonthData(date, holiday, selectedStart, selectedEnd)
        const selectedDaysInfo = createSelectedDaysInfo(monthData, selectedStart, selectedEnd)
        expect(selectedDaysInfo.businessDays).toBe(expected)
    })
    describe('selected range overwrap to next month', () => {
        it('has businessDays', () => {
            const date = dayjs(TEST_DATE)
            const startDateLabel = '2024-01-28'
            const endDateLabel = '2024-02-03'
            const selectedStart = dayjs(startDateLabel)
            const selectedEnd = dayjs(endDateLabel)
            const expected = 5
            const monthData = createMonthData(date, {}, selectedStart, selectedEnd)
            const selectedDaysInfo = createSelectedDaysInfo(monthData, selectedStart, selectedEnd)
            expect(selectedDaysInfo.businessDays).toBe(expected)
        })
    })
    describe('selectStartDate or selectEndDate is null', () => {
        it('properties are empty', () => {
            const date = dayjs(TEST_DATE)
            const startDateLabel = '2024-01-28'
            const endDateLabel = '2024-02-03'
            const selectedStart = dayjs(startDateLabel)
            const selectedEnd = dayjs(endDateLabel)
            const expected = { label: '', duration: 0, businessDays: 0 }
            const monthData = createMonthData(date, {}, selectedStart, selectedEnd)
            const selectedDaysInfo = createSelectedDaysInfo(monthData, selectedStart, null)
            expect(selectedDaysInfo).toEqual(expected)
        })
    })
})

describe('validateHolidaysCSV', () => {
    describe('CSV is valid', () => {
        it('has no error', () => {
            const testData = `2024/01/01,New Year's Day
2024/01/15,Martin Luther King Jr. Day
2024/02/19,Presidents' Day
2024/05/27,Memorial Day
2024/06/19,Juneteenth
2024/07/04,Independence Day
2024/09/02,Labor Day
2024/10/14,Columbus Day
2024/11/11,Veterans Day
2024/11/28,Thanksgiving Day
2024/12/25,Christmas Day`
            const result = validateHolidaysCSV(testData)
            expect(result.hasError).toBeFalsy()
        })
    })
    describe('CSV is empty', () => {
        it('has no error', () => {
            const testData = ''
            const result = validateHolidaysCSV(testData)
            expect(result.hasError).toBeFalsy()
        })
    })
    describe('CSV is not valid', () => {
        it('has error', () => {
            const testData = "2024-01-01,New Year's Day"
            const result = validateHolidaysCSV(testData)
            expect(result.hasError).toBeTruthy()
        })
        it('has error messages', () => {
            const testData = `2024-01-01,New Year's Day
2024/01/15,Martin Luther King Jr. Day
2024/02/19,Presidents' Day
2024/05/27,Memorial Day
2024/06/19,Juneteenth
2024/07/04,Independence Day
2024/09/02,Labor Day
2024/10/14,Columbus Day
2024/11/11,Veterans Day
2024/11/28,Thanksgiving Day
24/12/25,Christmas Day`
            const expected1 = `"2024-01-01,New Year's Day" is wrong format.`
            const expected2 = `"24/12/25,Christmas Day" is wrong format.`
            const result = validateHolidaysCSV(testData)
            expect(result.errorMessages[0]).toBe(expected1)
            expect(result.errorMessages[1]).toBe(expected2)
        })
    })

})
describe('convertHolidaysCSV', () => {
    it('converts CSV text(sibgle line) to object', () => {
        const testData = `2024/01/01,New Year's Day
2024/01/15,Martin Luther King Jr. Day
2024/12/25,Christmas Day`
        const holiday = { 
            2024: { 
                1: { 
                    1: "New Year's Day",
                    15: 'Martin Luther King Jr. Day'
                },
                12: {
                    25: 'Christmas Day'
                }
            }
        }
        expect(convertHolidaysCSV(testData)).toEqual(holiday)
    })
    it('converts CSV text(multi lines) to object', () => {
        const testData = "2024/01/01,New Year's Day"
        const holiday = { 2024: { 1: { 1: "New Year's Day" } } }
        expect(convertHolidaysCSV(testData)).toEqual(holiday)
    })
    it('converts empty text to empty object', () => {
        const testData = ""
        const holiday = {}
        expect(convertHolidaysCSV(testData)).toEqual(holiday)
    })
    it('converts null to empty object', () => {
        const testData = null
        const holiday = {}
        expect(convertHolidaysCSV(testData)).toEqual(holiday)
    })

})
