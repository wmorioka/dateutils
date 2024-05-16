import createMonthData from '../../../../calendar/lib/calendarFunctions'
import dayjs from 'dayjs'
import { describe, expect, it, vi } from 'vitest'

const TEST_DATE = '2024-01-01 00:00'
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
        // Jan 1 should not be holiday. 
        // If today is holiday, isToday should be true and isHoliday should be false
        expect(monthData[0].days[0].isHoliday).toBeFalsy()
        expect(monthData[0].days[0].holidayLabel).toBe('')
        // Jan 2 should not be today
        expect(monthData[0].days[1].isToday).toBeFalsy()
        
        vi.useRealTimers()
    })
    
})
