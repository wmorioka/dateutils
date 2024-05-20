import { Holidays } from '../../../calendar/lib/holidays'
import { describe, expect, it } from 'vitest'

const holidaysStorageKey = '/v1/holidays-data'
describe('Holidays', ()=> {
    describe('constructor()', () => {
        it('csvText is set after initialization', () => {
            const csvText = '2024/01/01,test'
            localStorage.setItem(holidaysStorageKey, csvText)
            const holidays = new Holidays()
            expect(holidays.csvText).toBe(csvText)
        })
    })
    describe('isHoliday()', () => {
        it('returns true if date is holiday', () => {
            const csvText = '2024/01/01,test'
            localStorage.setItem(holidaysStorageKey, csvText)
            const holidays = new Holidays()
            expect(holidays.isHoliday(2024, 1, 1)).toBeTruthy()
        })
        it('returns false if date is holiday', () => {
            const csvText = '2024/01/01,test'
            localStorage.setItem(holidaysStorageKey, csvText)
            const holidays = new Holidays()
            expect(holidays.isHoliday(2024, 1, 2)).toBeFalsy()
        })
    })
    describe('getHolidayLabel()', () => {
        it('returns label if date is holiday', () => {
            const csvText = '2024/01/01,test'
            localStorage.setItem(holidaysStorageKey, csvText)
            const holidays = new Holidays()
            expect(holidays.getHolidayLabel(2024, 1, 1)).toBe('test')
        })
        it('returns empty string if date is holiday', () => {
            const csvText = '2024/01/01,test'
            localStorage.setItem(holidaysStorageKey, csvText)
            const holidays = new Holidays()
            expect(holidays.getHolidayLabel(2024, 1, 2)).toBe('')
        })
    })
    describe('validate()', () => {
        describe('CSV is valid', () => {
            it('returns true', () => {
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

                const holidays = new Holidays()
                holidays.csvText = testData
                expect(holidays.validate()).toBeTruthy()
            })
            it('has no errors', () => {
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

                const holidays = new Holidays()
                holidays.csvText = testData
                holidays.validate()
                expect(holidays.errorMessages.length).toBe(0)
            })
        })
        describe('CSV is empty', () => {
            it('returns true', () => {
                const testData = ''
                const holidays = new Holidays()
                holidays.csvText = testData
                expect(holidays.validate()).toBeTruthy()
            })
        })
        describe('CSV is not valid', () => {
            it('returns false', () => {
                const testData = "2024-01-01,New Year's Day"
                const holidays = new Holidays()
                holidays.csvText = testData
                expect(holidays.validate()).toBeFalsy()
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
                const holidays = new Holidays()
                holidays.csvText = testData
                expect(holidays.validate()).toBeFalsy()
                expect(holidays.errorMessages[0]).toBe(expected1)
                expect(holidays.errorMessages[1]).toBe(expected2)
            })
        })
    })
    describe('save()', () => {
        const testData = '2024/01/01,test'
        it('can save data in localStorage', () => {
            const holidays = new Holidays()
            holidays.csvText = testData
            expect(holidays.save()).toBeTruthy()
            expect(localStorage.getItem(holidaysStorageKey)).toBe(testData)
        })
    })
    describe('getStorageData()', () => {
        describe('data exists in localStorage', () => {
            const testData = '2024/01/01,test'
            it('returns saved data', () => {
                const holidays = new Holidays()
                localStorage.setItem(holidaysStorageKey, testData)
                expect(holidays.getStorageData()).toBe(testData)
            })
        })
        describe('data does not exist in localStorage', () => {
            it('returns empty string', () => {
                const holidays = new Holidays()
                localStorage.clear()
                expect(holidays.getStorageData()).toBe('')
            })
        })
    })
    describe('convertHolidaysCSV', () => {
        it('converts CSV text(multi lines) to object', () => {
            const testData = `2024/01/01,New Year's Day
2024/01/15,Martin Luther King Jr. Day
2024/12/25,Christmas Day`
            const expected = { 
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
            const holidays = new Holidays()
            holidays.csvText = testData
            expect(holidays.convertCSVToObject(testData)).toEqual(expected)
        })
        it('converts CSV text(single line) to object', () => {
            const testData = "2024/01/01,New Year's Day"
            const expected = { 2024: { 1: { 1: "New Year's Day" } } }
            const holidays = new Holidays()
            holidays.csvText = testData
            expect(holidays.convertCSVToObject(testData)).toEqual(expected)
        })
        it('converts empty text to empty object', () => {
            const testData = ''
            const expected = {}
            const holidays = new Holidays()
            holidays.csvText = testData
            expect(holidays.convertCSVToObject(testData)).toEqual(expected)
        })
        it('converts null to empty object', () => {
            const testData = null
            const expected = {}
            const holidays = new Holidays()
            holidays.csvText = testData
            expect(holidays.convertCSVToObject(testData)).toEqual(expected)
        })

    })

})
