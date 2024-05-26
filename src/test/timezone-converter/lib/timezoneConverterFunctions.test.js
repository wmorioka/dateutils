import { validateDatetimeFormat, saveConvertHistory, getConvertHistory } from '../../../timezone-converter/lib/timezonConverterFunctions'
import { describe, expect, it, vi } from 'vitest'
import dayjs from 'dayjs'
describe('validateDatetimeFormat', () => {
    describe('date is valid', () => {
        it('returns true', () => {
            const validDatePatterns = [
                '2024/01/01 00:00',
                '2024/12/31 23:59',
            ]
            validDatePatterns.forEach(date => {
                expect(validateDatetimeFormat(date)).toBeTruthy()
            });
        })
    })
    describe('date is invalid', () => {
        it('returns false', () => {
            const validDatePatterns = [
                '2024/01/01 0:0',
                '2024-12-31 23:59',
                '2024/01/01 0:00',
                '2024/1/0 23:59',
                '2024/2/30 23:59',
                '2024/1/1 24:00',
                '2024/01/33 00:00',
                '20/01/33 00:00',
            ]
            validDatePatterns.forEach(date => {
                expect(validateDatetimeFormat(date)).toBeFalsy()
            });
        })
    })
})
const cconvertHistoryStorageKey = '/v1/convert-history'
describe('saveConvertHistory', () => {
    beforeEach(async () => {
        localStorage.clear()
    })
    it('can save data in localStorage', () => {
        const history = {}
        history.date = dayjs().format('YYYY/MM/DD HH:mm')
        history.timezoneFrom = { id: "UTC+9:00_JST", label: "(UTC+9:00) Japan Standard Time (JST) - Asia" }
        history.timezoneTo = { id: "UTC+5:30_IST", label: "(UTC+5:30) India Standard Time (IST) - Asia" }
        history.isAbbreviationChecked = false
        history.isUTCOffsetChecked = false
        expect(saveConvertHistory(history)).toBeTruthy()
        expect(JSON.parse(localStorage.getItem(cconvertHistoryStorageKey))).toMatchObject(history)
    })
})
describe('getConvertHistory', () => {
    beforeEach(async () => {
        localStorage.clear()
    })
    describe('data exists in localStorage', () => {
        it('returns saved data', () => {
            const history = {}
            history.date = dayjs().format('YYYY/MM/DD HH:mm')
            history.timezoneFrom = { id: "UTC+9:00_JST", label: "(UTC+9:00) Japan Standard Time (JST) - Asia" }
            history.timezoneTo = { id: "UTC+5:30_IST", label: "(UTC+5:30) India Standard Time (IST) - Asia" }
            history.isAbbreviationChecked = false
            history.isUTCOffsetChecked = false
            localStorage.setItem(cconvertHistoryStorageKey, JSON.stringify(history))
            expect(getConvertHistory()).toMatchObject(history)
        })
    })
    describe('data does not exist in localStorage', () => {
        it('returns null', () => {
            expect(getConvertHistory()).toBeNull()
        })
    })
})