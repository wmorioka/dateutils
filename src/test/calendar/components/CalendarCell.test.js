import { mount } from "@vue/test-utils"
import { describe, expect, it } from 'vitest'

import CalendarCell from "../../../calendar/parts/CalendarCell.vue"

describe('CalendarCell', () => {
    it("can be mounted", async () => {
        expect(CalendarCell).toBeTruthy()
    })
    describe("Today's mark", () => {
        it('exists if date is today', async () => {
            const date = {
                day: 1,
                dayOfWeek: 0,
                isHoliday: false,
                holidayLabel: '',
                isToday: true,
                isSelected: false,
                selectedClass: ''
            }
            const wrapper = mount(CalendarCell, {
                props: {
                    date: date,
                },
            })
            expect(wrapper.find('span.today').exists()).toBeTruthy()
        })
        it('does not exist if date is not today', async () => {
            const date = {
                day: 1,
                dayOfWeek: 0,
                isHoliday: false,
                holidayLabel: '',
                isToday: false,
                isSelected: false,
                selectedClass: ''
            }
            const wrapper = mount(CalendarCell, {
                props: {
                    date: date,
                },
            })
            expect(wrapper.find('span.today').exists()).toBeFalsy()
        })
    })
    describe("Holiday's mark", () => {
        it('exists if date is holiday', async () => {
            const date = {
                day: 1,
                dayOfWeek: 0,
                isHoliday: true,
                holidayLabel: 'test holiday',
                isToday: false,
                isSelected: false,
                selectedClass: ''
            }
            const wrapper = mount(CalendarCell, {
                props: {
                    date: date,
                },
            })
            expect(wrapper.find('span.holiday').exists()).toBeTruthy()
        })
        it('does not exist if date is not holiday', async () => {
            const date = {
                day: 1,
                dayOfWeek: 0,
                isHoliday: false,
                holidayLabel: '',
                isToday: false,
                isSelected: false,
                selectedClass: ''
            }
            const wrapper = mount(CalendarCell, {
                props: {
                    date: date,
                },
            })
            expect(wrapper.find('span.holiday').exists()).toBeFalsy()
        })
        it('does not exist if date is holiday and date is today', async () => {
            const date = {
                day: 1,
                dayOfWeek: 0,
                isHoliday: true,
                holidayLabel: 'test holiday',
                isToday: true,
                isSelected: false,
                selectedClass: ''
            }
            const wrapper = mount(CalendarCell, {
                props: {
                    date: date,
                },
            })
            expect(wrapper.find('span.holiday').exists()).toBeFalsy()
        })
    })
    describe("Holiday's tooltip", () => {
        it('exists if date is holiday', async () => {
            const expected = 'test holiday'
            const date = {
                day: 1,
                dayOfWeek: 0,
                isHoliday: true,
                holidayLabel: expected,
                isToday: false,
                isSelected: false,
                selectedClass: ''
            }
            const wrapper = mount(CalendarCell, {
                props: {
                    date: date,
                },
            })
            expect(wrapper.get('span.tooltip-contents').text()).toEqual(expected)
        })
        it('does not exist if date is not holiday', async () => {
            const date = {
                day: 1,
                dayOfWeek: 0,
                isHoliday: false,
                holidayLabel: '',
                isToday: false,
                isSelected: false,
                selectedClass: ''
            }
            const wrapper = mount(CalendarCell, {
                props: {
                    date: date,
                },
            })
            expect(wrapper.find('span.tooltip-contents').exists()).toBeFalsy()
        })
    })
    describe("Selected mark", () => {
        it('exists if date is selected', async () => {
            const date = {
                day: 1,
                dayOfWeek: 0,
                isHoliday: false,
                holidayLabel: '',
                isToday: true,
                isSelected: true,
                selectedClass: 'selected'
            }
            const wrapper = mount(CalendarCell, {
                props: {
                    date: date,
                },
            })
            expect(wrapper.find('div.select-container').exists()).toBeTruthy()
        })
        it('does not exist if date is not today', async () => {
            const date = {
                day: 1,
                dayOfWeek: 0,
                isHoliday: false,
                holidayLabel: '',
                isToday: false,
                isSelected: false,
                selectedClass: ''
            }
            const wrapper = mount(CalendarCell, {
                props: {
                    date: date,
                },
            })
            expect(wrapper.find('div.select-container').exists()).toBeFalsy()
        })
    })
})
