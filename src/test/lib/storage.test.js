import { saveHolidays, getHolidays } from '../../lib/storage'
import { describe, expect, it } from 'vitest'

describe('Holidays functions', () => {
    const testData = '2024/12/25,Christmas Day'
    it('save data', () => {
        saveHolidays(testData)
        expect(localStorage.getItem('/v1/holidays-data')).toBe(testData)
    })
    it('get data', () => {
        localStorage.setItem('/v1/holidays-data', testData)
        expect(getHolidays()).toBe(testData)
    })
    describe('no data exists in localStorage', () => {
        it('getHolidays return empty string not null', () => {
            localStorage.clear()
            const expected = ''
            expect(getHolidays()).toBe(expected)
        })
    })
})
