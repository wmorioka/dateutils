import { validateDatetimeFormat } from '../../../timezone-converter/lib/timezonConverterFunctions'
import { describe, expect, it, vi } from 'vitest'

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
