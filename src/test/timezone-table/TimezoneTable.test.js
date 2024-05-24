import { mount } from "@vue/test-utils"
import { describe, expect, it, beforeEach } from 'vitest'
import { saveTimezoneIDs } from "../../timezone-table/lib/timezoneTableFunctions"
import TimezoneTable from "../../timezone-table/TimezoneTable.vue"


describe('TimezoneTable', () => {
    beforeEach(async () => {
        localStorage.clear()
    })
    describe('Combo box', () => {
        it('timezone item exists in list', async () => {
            const wrapper = mount(TimezoneTable)
            const expected = '(UTC-11:00) Samoa Standard Time (SST) - Pacific'
            expect(wrapper.find('.multiselect__element:first-child').text()).toBe(expected)
        })
    })
    describe('Table', () => {
        describe('If data is saved', () => {
            it('saved timezones are displayed', async () => {
                const saveData = ['UTC-11:00_SST']
                saveTimezoneIDs(saveData)

                const wrapper = mount(TimezoneTable)

                const expectedHeaderLabel1 = '-11:00'
                const expectedHeaderLabel2 = 'SST'
                const expectedFirstRow = '13:00'
                // Only one column
                expect(wrapper.findAll('#header-offset th')).toHaveLength(1)
                // Header offset
                expect(wrapper.find('#header-offset th:first-child').text()).toBe(expectedHeaderLabel1)
                // Header abbreviation
                expect(wrapper.find('#header-abbreviation th:first-child').text()).toBe(expectedHeaderLabel2)
                // First row
                expect(wrapper.find('#timezone-table tbody tr:first-child td:first-child').text()).toBe(expectedFirstRow)
            })
        })
        describe('If data is not saved', () => {
            it('default timezones are displayed', async () => {
                const expected = ['PST','EST','UTC','IST','JST']

                const wrapper = mount(TimezoneTable)

                // Header abbreviation
                expect(wrapper.find('#header-abbreviation th:nth-child(1)').text()).toBe(expected[0])
                expect(wrapper.find('#header-abbreviation th:nth-child(2)').text()).toBe(expected[1])
                expect(wrapper.find('#header-abbreviation th:nth-child(3)').text()).toBe(expected[2])
                expect(wrapper.find('#header-abbreviation th:nth-child(4)').text()).toBe(expected[3])
                expect(wrapper.find('#header-abbreviation th:nth-child(5)').text()).toBe(expected[4])
            })
        })
    })
    describe('Click Add button', () => {
        describe('Selected timezone is not in table', () => {
            it('Timezone is added to table', async () => {
                const saveData = ['UTC-11:00_SST']
                saveTimezoneIDs(saveData)

                const wrapper = mount(TimezoneTable)
                await wrapper.get('.multiselect').trigger('click')
                await wrapper.get('.multiselect__option:first-child').trigger('click')
                await wrapper.get('#button-add').trigger('click')
                
                const expectedHeaderLabel = 'SST'
                expect(wrapper.find('#header-abbreviation th:first-child').text()).toBe(expectedHeaderLabel)

            })
        })
    })
    describe('Click Edit button', () => {
        it('Delete buttons are present', async () => {
            const wrapper = mount(TimezoneTable)
            await wrapper.get('#button-edit').trigger('click')
            expect(wrapper.find('.delete-button-row').classes('hidden')).toBeFalsy()
        })
    })
    describe('Click Done button', () => {
        it('Delete buttons are hidden', async () => {
            const wrapper = mount(TimezoneTable)
            await wrapper.get('#button-edit').trigger('click')
            await wrapper.get('#button-done').trigger('click')
            expect(wrapper.find('.delete-button-row').classes('hidden')).toBeTruthy()
        })
    })
    describe('Click Delete button', () => {
        it('Target timezone is deleted', async () => {
            const wrapper = mount(TimezoneTable)

            // Check column count before deleting timezone
            expect(wrapper.findAll('#header-offset th')).toHaveLength(5)

            await wrapper.get('#button-edit').trigger('click')
            await wrapper.get('.delete-button-row th:first-child .delete-button').trigger('click')
            expect(wrapper.findAll('#header-offset th')).toHaveLength(4)
        })
    })
})
