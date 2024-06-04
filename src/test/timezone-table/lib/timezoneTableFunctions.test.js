import { createTimezoneData, saveTimezoneIDs, getTimezoneIDs, createOptionList } from '../../../timezone-table/lib/timezoneTableFunctions'
import { describe, expect, it, vi } from 'vitest'
import { timezones } from '../../../lib/timezones'

const timezonesStorageKey = '/v1/timezones-data'

describe('createTimezoneData', ()=> {
    describe('single timezone selected', () => {
        it('creates timezone data', () => {
            const testIDs = ['UTC+0:00_UTC']
            const expected = [
                {
                    id: 'UTC+0:00_UTC',
                    zoneInfo: {
                        offset: '+0:00',
                        offsetMinites: 0,
                        name: 'Coordinated Universal Time',
                        abbreviation: 'UTC',
                        location: 'Worldwide'
                    },
                    table: [
                        { label: '0:00', class: 'bg-slate-800 text-white' },
                        { label: '1:00', class: 'bg-slate-700 text-white' },
                        { label: '2:00', class: 'bg-slate-600 text-white' },
                        { label: '3:00', class: 'bg-slate-500 text-white' },
                        { label: '4:00', class: 'bg-slate-400 text-white' },
                        { label: '5:00', class: 'bg-slate-300' },
                        { label: '6:00', class: 'bg-slate-200' },
                        { label: '7:00', class: 'bg-slate-100' },
                        { label: '8:00', class: '' },
                        { label: '9:00', class: '' },
                        { label: '10:00', class: '' },
                        { label: '11:00', class: '' },
                        { label: '12:00', class: '' },
                        { label: '13:00', class: '' },
                        { label: '14:00', class: '' },
                        { label: '15:00', class: '' },
                        { label: '16:00', class: '' },
                        { label: '17:00', class: 'bg-slate-100' },
                        { label: '18:00', class: 'bg-slate-200' },
                        { label: '19:00', class: 'bg-slate-300' },
                        { label: '20:00', class: 'bg-slate-400 text-white' },
                        { label: '21:00', class: 'bg-slate-500 text-white' },
                        { label: '22:00', class: 'bg-slate-600 text-white' },
                        { label: '23:00', class: 'bg-slate-700 text-white' },
                    ]
                },
            ]
            expect(createTimezoneData(testIDs)).toMatchObject(expected)
        })

    })
    describe('2 timezones selected', () => {
        it('creates timezone data', () => {
            const testIDs = ['UTC+9:00_JST', 'UTC+0:00_UTC']
            const expected = [
                {
                    id: 'UTC+0:00_UTC',
                    zoneInfo: {
                        offset: '+0:00',
                        offsetMinites: 0,
                        name: 'Coordinated Universal Time',
                        abbreviation: 'UTC',
                        location: 'Worldwide'
                    },
                    table: [
                        { label: '0:00', class: 'bg-slate-800 text-white' },
                        { label: '1:00', class: 'bg-slate-700 text-white' },
                        { label: '2:00', class: 'bg-slate-600 text-white' },
                        { label: '3:00', class: 'bg-slate-500 text-white' },
                        { label: '4:00', class: 'bg-slate-400 text-white' },
                        { label: '5:00', class: 'bg-slate-300' },
                        { label: '6:00', class: 'bg-slate-200' },
                        { label: '7:00', class: 'bg-slate-100' },
                        { label: '8:00', class: '' },
                        { label: '9:00', class: '' },
                        { label: '10:00', class: '' },
                        { label: '11:00', class: '' },
                        { label: '12:00', class: '' },
                        { label: '13:00', class: '' },
                        { label: '14:00', class: '' },
                        { label: '15:00', class: '' },
                        { label: '16:00', class: '' },
                        { label: '17:00', class: 'bg-slate-100' },
                        { label: '18:00', class: 'bg-slate-200' },
                        { label: '19:00', class: 'bg-slate-300' },
                        { label: '20:00', class: 'bg-slate-400 text-white' },
                        { label: '21:00', class: 'bg-slate-500 text-white' },
                        { label: '22:00', class: 'bg-slate-600 text-white' },
                        { label: '23:00', class: 'bg-slate-700 text-white' },
                    ]
                },
                {
                    id: 'UTC+9:00_JST',
                    zoneInfo: {
                        "offset": "+9:00",
                        "offsetMinites": 540,
                        "name": "Japan Standard Time",
                        "abbreviation": "JST",
                        "location": "Asia"
                    },
                    table: [
                        { label: '9:00', class: '' },
                        { label: '10:00', class: '' },
                        { label: '11:00', class: '' },
                        { label: '12:00', class: '' },
                        { label: '13:00', class: '' },
                        { label: '14:00', class: '' },
                        { label: '15:00', class: '' },
                        { label: '16:00', class: '' },
                        { label: '17:00', class: 'bg-slate-100' },
                        { label: '18:00', class: 'bg-slate-200' },
                        { label: '19:00', class: 'bg-slate-300' },
                        { label: '20:00', class: 'bg-slate-400 text-white' },
                        { label: '21:00', class: 'bg-slate-500 text-white' },
                        { label: '22:00', class: 'bg-slate-600 text-white' },
                        { label: '23:00', class: 'bg-slate-700 text-white' },
                        { label: '0:00', class: 'bg-slate-800 text-white' },
                        { label: '1:00', class: 'bg-slate-700 text-white' },
                        { label: '2:00', class: 'bg-slate-600 text-white' },
                        { label: '3:00', class: 'bg-slate-500 text-white' },
                        { label: '4:00', class: 'bg-slate-400 text-white' },
                        { label: '5:00', class: 'bg-slate-300' },
                        { label: '6:00', class: 'bg-slate-200' },
                        { label: '7:00', class: 'bg-slate-100' },
                        { label: '8:00', class: '' },
                    ]
                },
            ]
            expect(createTimezoneData(testIDs)).toMatchObject(expected)
        })
    })
    describe('offset is -11:00', () => {
        it('creates timezone data', () => {
            const testIDs = ['UTC-11:00_SST']
            const expected = [
                {
                    id: 'UTC-11:00_SST',
                    zoneInfo: {
                        "offset": "-11:00",
                        "offsetMinites": -660,
                        "name": "Samoa Standard Time",
                        "abbreviation": "SST",
                        "location": "Pacific"
                    },
                    table: [
                        { label: '13:00', class: '' },
                        { label: '14:00', class: '' },
                        { label: '15:00', class: '' },
                        { label: '16:00', class: '' },
                        { label: '17:00', class: 'bg-slate-100' },
                        { label: '18:00', class: 'bg-slate-200' },
                        { label: '19:00', class: 'bg-slate-300' },
                        { label: '20:00', class: 'bg-slate-400 text-white' },
                        { label: '21:00', class: 'bg-slate-500 text-white' },
                        { label: '22:00', class: 'bg-slate-600 text-white' },
                        { label: '23:00', class: 'bg-slate-700 text-white' },
                        { label: '0:00', class: 'bg-slate-800 text-white' },
                        { label: '1:00', class: 'bg-slate-700 text-white' },
                        { label: '2:00', class: 'bg-slate-600 text-white' },
                        { label: '3:00', class: 'bg-slate-500 text-white' },
                        { label: '4:00', class: 'bg-slate-400 text-white' },
                        { label: '5:00', class: 'bg-slate-300' },
                        { label: '6:00', class: 'bg-slate-200' },
                        { label: '7:00', class: 'bg-slate-100' },
                        { label: '8:00', class: '' },
                        { label: '9:00', class: '' },
                        { label: '10:00', class: '' },
                        { label: '11:00', class: '' },
                        { label: '12:00', class: '' },
                    ]
                },
            ]
            expect(createTimezoneData(testIDs)).toMatchObject(expected)
        })
    })
    describe('offset is +10:30', () => {
        it('creates timezone data', () => {
            const testIDs = ['UTC+10:30_ACDT']
            const expected = [
                {
                    id: 'UTC+10:30_ACDT',
                    zoneInfo: {
                        "offset": "+10:30",
                        "offsetMinites": 630,
                        "name": "Australian Central Daylight Time",
                        "abbreviation": "ACDT",
                        "location": "Australia"
                    },
                    table: [
                        { label: '10:30', class: '' },
                        { label: '11:30', class: '' },
                        { label: '12:30', class: '' },
                        { label: '13:30', class: '' },
                        { label: '14:30', class: '' },
                        { label: '15:30', class: '' },
                        { label: '16:30', class: '' },
                        { label: '17:30', class: 'bg-slate-100' },
                        { label: '18:30', class: 'bg-slate-200' },
                        { label: '19:30', class: 'bg-slate-300' },
                        { label: '20:30', class: 'bg-slate-400 text-white' },
                        { label: '21:30', class: 'bg-slate-500 text-white' },
                        { label: '22:30', class: 'bg-slate-600 text-white' },
                        { label: '23:30', class: 'bg-slate-700 text-white' },
                        { label: '0:30', class: 'bg-slate-800 text-white' },
                        { label: '1:30', class: 'bg-slate-700 text-white' },
                        { label: '2:30', class: 'bg-slate-600 text-white' },
                        { label: '3:30', class: 'bg-slate-500 text-white' },
                        { label: '4:30', class: 'bg-slate-400 text-white' },
                        { label: '5:30', class: 'bg-slate-300' },
                        { label: '6:30', class: 'bg-slate-200' },
                        { label: '7:30', class: 'bg-slate-100' },
                        { label: '8:30', class: '' },
                        { label: '9:30', class: '' },
                    ]
                },
            ]
            expect(createTimezoneData(testIDs)).toMatchObject(expected)
        })
    })
    describe('offset is -9:30', () => {
        it('creates timezone data', () => {
            const testIDs = ['UTC-9:30_MART']
            const expected = [
                {
                    id: 'UTC-9:30_MART',
                    zoneInfo: {
                        "offset": "-9:30",
                        "offsetMinites": -570,
                        "name": "Marquesas Time",
                        "abbreviation": "MART",
                        "location": "Pacific"
                    },
                    table: [
                        { label: '14:30', class: '' },
                        { label: '15:30', class: '' },
                        { label: '16:30', class: '' },
                        { label: '17:30', class: 'bg-slate-100' },
                        { label: '18:30', class: 'bg-slate-200' },
                        { label: '19:30', class: 'bg-slate-300' },
                        { label: '20:30', class: 'bg-slate-400 text-white' },
                        { label: '21:30', class: 'bg-slate-500 text-white' },
                        { label: '22:30', class: 'bg-slate-600 text-white' },
                        { label: '23:30', class: 'bg-slate-700 text-white' },
                        { label: '0:30', class: 'bg-slate-800 text-white' },
                        { label: '1:30', class: 'bg-slate-700 text-white' },
                        { label: '2:30', class: 'bg-slate-600 text-white' },
                        { label: '3:30', class: 'bg-slate-500 text-white' },
                        { label: '4:30', class: 'bg-slate-400 text-white' },
                        { label: '5:30', class: 'bg-slate-300' },
                        { label: '6:30', class: 'bg-slate-200' },
                        { label: '7:30', class: 'bg-slate-100' },
                        { label: '8:30', class: '' },
                        { label: '9:30', class: '' },
                        { label: '10:30', class: '' },
                        { label: '11:30', class: '' },
                        { label: '12:30', class: '' },
                        { label: '13:30', class: '' },
                    ]
                },
            ]
            expect(createTimezoneData(testIDs)).toMatchObject(expected)
        })
    })
    describe('offset is +5:45', () => {
        it('creates timezone data', () => {
            const testIDs = ['UTC+5:45_NPT']
            const expected = [
                {
                    id: 'UTC+5:45_NPT',
                    zoneInfo: {
                        "offset": "+5:45",
                        "offsetMinites": 345,
                        "name": "Nepal Time",
                        "abbreviation": "NPT",
                        "location": "Asia"
                    },
                    table: [
                        { label: '5:45', class: 'bg-slate-300' },
                        { label: '6:45', class: 'bg-slate-200' },
                        { label: '7:45', class: 'bg-slate-100' },
                        { label: '8:45', class: '' },
                        { label: '9:45', class: '' },
                        { label: '10:45', class: '' },
                        { label: '11:45', class: '' },
                        { label: '12:45', class: '' },
                        { label: '13:45', class: '' },
                        { label: '14:45', class: '' },
                        { label: '15:45', class: '' },
                        { label: '16:45', class: '' },
                        { label: '17:45', class: 'bg-slate-100' },
                        { label: '18:45', class: 'bg-slate-200' },
                        { label: '19:45', class: 'bg-slate-300' },
                        { label: '20:45', class: 'bg-slate-400 text-white' },
                        { label: '21:45', class: 'bg-slate-500 text-white' },
                        { label: '22:45', class: 'bg-slate-600 text-white' },
                        { label: '23:45', class: 'bg-slate-700 text-white' },
                        { label: '0:45', class: 'bg-slate-800 text-white' },
                        { label: '1:45', class: 'bg-slate-700 text-white' },
                        { label: '2:45', class: 'bg-slate-600 text-white' },
                        { label: '3:45', class: 'bg-slate-500 text-white' },
                        { label: '4:45', class: 'bg-slate-400 text-white' },
                    ]
                },
            ]
            expect(createTimezoneData(testIDs)).toMatchObject(expected)
        })
    })
    describe('id is invalid', () => {
        it('ignore invalid id', () => {
            const testIDs = ['UTC+0:00_NON_EXISTING_ID']
            const expected = []
            expect(createTimezoneData(testIDs)).toMatchObject(expected)
        })
    })
    describe('ids are not sorted', () => {
        it('creates sorted timezone data', () => {
            const testIDs = [
                'UTC+0:00_UTC',
                'UTC+3:00_MSK',
                'UTC-11:00_SST',
                'UTC+3:00_IDT',
                'UTC-4:00_EDT',
            ]
            const expected = [
                'UTC-11:00_SST',
                'UTC-4:00_EDT',
                'UTC+0:00_UTC',
                'UTC+3:00_IDT',
                'UTC+3:00_MSK',
            ]
            const results = createTimezoneData(testIDs)
            let sortedIDs = []
            for (let i = 0; i < results.length; i++) {
                sortedIDs.push(results[i]['id'])
                
            }
            expect(sortedIDs).toMatchObject(expected)
        })
    })
})
describe('saveTimezoneIDs', () => {
    it('can save data in localStorage', () => {
        const testData = ['UTC+3:00_MSK']
        expect(saveTimezoneIDs(testData)).toBeTruthy()
        expect(JSON.parse(localStorage.getItem(timezonesStorageKey))).toMatchObject(testData)
    })
})
describe('getTimezoneIDs', () => {
    describe('data exists in localStorage', () => {
        const testData = ['UTC+3:00_MSK']
        it('returns saved data', () => {
            localStorage.setItem(timezonesStorageKey, JSON.stringify(testData))
            expect(getTimezoneIDs()).toMatchObject(testData)
        })
    })
    describe('data does not exist in localStorage', () => {
        it('returns null', () => {
            localStorage.clear()
            expect(getTimezoneIDs()).toBeNull()
        })
    })
})

describe('createOptionList', () => {
    it('creates option list', () => {
        const expected = {
            id: 'UTC-11:00_SST',
            label: '(UTC-11:00) Samoa Standard Time (SST) - Pacific',
        }
        expect(createOptionList(timezones)[0]).toMatchObject(expected)

    })
    it('creates Ja option list', () => {
        const expected = {
            id: 'UTC-11:00_SST',
            label: '(UTC-11:00) サモア標準時 (SST) - パシフィック',
        }
        expect(createOptionList(timezones, 'ja')[0]).toMatchObject(expected)

    })
})