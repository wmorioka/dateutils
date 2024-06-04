import { mount } from "@vue/test-utils"
import { describe, expect, it, beforeEach } from 'vitest'
import TimezoneConverter from "../../timezone-converter/TimezoneConverter.vue"
import { saveConvertHistory } from "../../timezone-converter/lib/timezonConverterFunctions"
import { getI18n } from "../../lib/i18n"

const i18n = getI18n()
describe('TimezoneConverter', () => {
    beforeEach(async () => {
        localStorage.clear()
    })
    describe('Date', () => {
        describe('history is not in localStorage', () => {
            it('system date time is set', async () => {
                vi.useFakeTimers()
                // Set system date as 2024/01/01 10:10
                const fakeDate = new Date(2024, 0, 1, 10, 10)
                vi.setSystemTime(fakeDate)
                
                const wrapper = mount(TimezoneConverter, {
                    global: {
                        plugins: [i18n]
                    }
                })
                const expected = '2024/01/01 10:10'
                expect(wrapper.find('#date').element.value).toBe(expected)
                vi.useRealTimers()
            })
        })
        describe('history is in localStorage', () => {
            it('saved date time is set', async () => {
                const expected = '2024/01/01 10:10'
                const history = {}
                history.date = expected
                saveConvertHistory(history)
                const wrapper = mount(TimezoneConverter, {
                    global: {
                        plugins: [i18n]
                    }
                })
                expect(wrapper.find('#date').element.value).toBe(expected)
                vi.useRealTimers()
            })
        })
        describe('is checked its format after change', () => {
            it('error message is displayed if format is invalid', async () => {
                const wrapper = mount(TimezoneConverter, {
                    global: {
                        plugins: [i18n]
                    }
                })

                const expected = 'timezoneConverter.error.dateIsInvalidFormat'
                const input = wrapper.find('#date')
                await input.setValue('2024/01/1 10:10')
                expect(wrapper.find('#date-error').text()).toBe(expected)
            })
            it('error message is not displayed if format invalid', async () => {
                const wrapper = mount(TimezoneConverter, {
                    global: {
                        plugins: [i18n]
                    }
                })

                const input = wrapper.find('#date')
                await input.setValue('2024/01/01 10:10')
                expect(wrapper.findAll('#date-error')).toHaveLength(0)

            })
        })
        describe('DatePicker', () => {
            const datePickerSelector = '#date-picker'
            const calendarButton = '#toggle-date-picker'
            it('is displayed when calendar button is clicked', async () => {
                const wrapper = mount(TimezoneConverter, {
                    global: {
                        plugins: [i18n]
                    }
                })

                await wrapper.get(calendarButton).trigger('click')
                expect(wrapper.find(datePickerSelector).classes('hidden')).toBe(false)
            })
            it('is closed after clicking calendar button when DatePicker is open', async () => {
                const wrapper = mount(TimezoneConverter, {
                    global: {
                        plugins: [i18n]
                    }
                })

                await wrapper.get(calendarButton).trigger('click')
                await wrapper.get(calendarButton).trigger('click')
                expect(wrapper.find(datePickerSelector).classes('hidden')).toBe(true)
            })


            it('input date time is selected when its opened', async () => {
                const date = '2024/05/01 12:34'
                const history = {}
                history.date = date
                saveConvertHistory(history)

                const wrapper = mount(TimezoneConverter, {
                    global: {
                        plugins: [i18n]
                    }
                })

                await wrapper.get(calendarButton).trigger('click')
                // 1st date has selected class
                expect(wrapper.findAll('.date-picker [data-test="days"] > div:nth-child(4) .select-container.selected')).toHaveLength(1)
                // header is May 2024
                // expect(wrapper.find('.calendar-header-title').text()).toBe('May 2024')
                // hour is 12
                expect(wrapper.find('#date-picker-hour').element.value).toBe('12')
                // minute is 34
                expect(wrapper.find('#date-picker-minute').element.value).toBe('34')
            })

            it('current date time is selected when Now button is clicked', async () => {
                const date = '2024/05/01 12:34'
                const history = {}
                history.date = date
                saveConvertHistory(history)
                vi.useFakeTimers()
                // Set system date as 2024/01/02 10:45
                const fakeDate = new Date(2024, 0, 2, 10, 45)
                vi.setSystemTime(fakeDate)

                const wrapper = mount(TimezoneConverter, {
                    global: {
                        plugins: [i18n]
                    }
                })

                await wrapper.get(calendarButton).trigger('click')
                // click Now
                await wrapper.get('#date-picker-now').trigger('click')

                // 1st date has selected class
                expect(wrapper.findAll('.date-picker [data-test="days"] > div:nth-child(3) .select-container.selected')).toHaveLength(1)
                // header is May 2024
                // expect(wrapper.find('.calendar-header-title').text()).toBe('January 2024')
                // hour is 12
                expect(wrapper.find('#date-picker-hour').element.value).toBe('10')
                // minute is 34
                expect(wrapper.find('#date-picker-minute').element.value).toBe('45')
                vi.useRealTimers()

            })
        })
    })
    describe('Convert', () => {
        it('convert date from UTC to JST', async () => {
            const date = '2024/04/30 22:00'
            const expected = '2024/05/01 07:00'

            const history = {}
            history.date = date
            history.timezoneFrom = { id: "UTC+0:00_UTC", label: "(UTC+0:00) Coordinated Universal Time (UTC) - Worldwide" }
            history.timezoneTo = { id: "UTC+9:00_JST", label: "(UTC+9:00) Japan Standard Time (JST) - Asia" }
            history.isAbbreviationChecked = false
            history.isUTCOffsetChecked = false
            saveConvertHistory(history)

            const wrapper = mount(TimezoneConverter, {
                global: {
                    plugins: [i18n]
                }
            })

            // Click convert button
            await wrapper.find('#convert-button').trigger('click')

            expect(wrapper.find('#result-1').element.value).toBe(expected)
        })

        it('convert date from JST to UTC', async () => {
            const date = '2024/05/01 13:00'
            const expected = '2024/05/01 04:00'

            const wrapper = mount(TimezoneConverter, {
                global: {
                    plugins: [i18n]
                }
            })

            await wrapper.get('#date').setValue(date)
            wrapper.vm.timezoneFrom = { id: "UTC+9:00_JST", label: "(UTC+9:00) Japan Standard Time (JST) - Asia" }
            wrapper.vm.timezoneTo = { id: "UTC+0:00_UTC", label: "(UTC+0:00) Coordinated Universal Time (UTC) - Worldwide" }

            // Click convert button
            await wrapper.find('#convert-button').trigger('click')

            expect(wrapper.find('#result-1').element.value).toBe(expected)
        })

        it('convert date from SST to TOST', async () => {
            const date = '2024/04/29 23:00'
            const expected = '2024/05/01 00:00'

            const wrapper = mount(TimezoneConverter, {
                global: {
                    plugins: [i18n]
                }
            })

            await wrapper.get('#date').setValue(date)
            wrapper.vm.timezoneFrom = { id: "UTC-11:00_SST", label: "(UTC-11:00) Samoa Standard Time (SST) - Pacific" }
            wrapper.vm.timezoneTo = {id: "UTC+14:00_TOST", label: "(UTC+14:00) Tonga Summer Time (TOST) - Pacific"}

            // Click convert button
            await wrapper.find('#convert-button').trigger('click')

            expect(wrapper.find('#result-1').element.value).toBe(expected)
        })

        it('convert date from CHADT to MART', async () => {
            const date = '2024/05/01 00:00'
            const expected = '2024/04/30 00:45'

            const wrapper = mount(TimezoneConverter, {
                global: {
                    plugins: [i18n]
                }
            })

            await wrapper.get('#date').setValue(date)
            wrapper.vm.timezoneFrom = { id: "UTC+13:45_CHADT", label: "(UTC+13:45) Chatham Island Daylight Time (CHADT) - Pacific" }
            wrapper.vm.timezoneTo = { id: "UTC-9:30_MART", label: "(UTC-9:30) Marquesas Time (MART) - Pacific" }

            // Click convert button
            await wrapper.find('#convert-button').trigger('click')

            expect(wrapper.find('#result-1').element.value).toBe(expected)
        })

        describe('Date is empty', () => {
            it('does not convert', async () => {
                const date = '2024/04/30 22:00'
                const expected = ''

                const history = {}
                history.date = date
                history.timezoneFrom = { id: "UTC+0:00_UTC", label: "(UTC+0:00) Coordinated Universal Time (UTC) - Worldwide" }
                history.timezoneTo = { id: "UTC+9:00_JST", label: "(UTC+9:00) Japan Standard Time (JST) - Asia" }
                history.isAbbreviationChecked = false
                history.isUTCOffsetChecked = false
                saveConvertHistory(history)

                const wrapper = mount(TimezoneConverter, {
                    global: {
                        plugins: [i18n]
                    }
                })

                await wrapper.get('#date').setValue('')
                // Click convert button
                await wrapper.find('#convert-button').trigger('click')

                expect(wrapper.find('#result-1').element.value).toBe(expected)
            })
        })
    })
    // describe('Copy', () => {
    // })
})
