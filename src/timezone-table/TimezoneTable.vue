<script setup>
import { ref, onMounted, onBeforeMount, nextTick } from 'vue'
import Multiselect from 'vue-multiselect'
import { timezones } from '../lib/timezones'
import { createTimezoneData, saveTimezoneIDs, getTimezoneIDs, createOptionList } from './lib/timezoneTableFunctions'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useI18n } from 'vue-i18n'

const options = ref([])
const selectedOption = ref()
const isDeleteButtonsVisible = ref(false)
const selectedTimezoneIDs = ref([])
const timezoneData = ref([])
const rowRefs = ref([])
const headerRowRefs = ref([])
const currentTime = ref()
const intervalID = ref(0)
const userLocale = ref()
const setRowRef = (type, index) => (el) => {
    if (type === 'header') {
        headerRowRefs.value[index] = el
    } else {
        rowRefs.value[index] = el
    }
}

onMounted(() => {
    updateCurrentTime()
})
const updateCurrentTime = () => {
    let currentTimeTop = 0
    // console.log(headerRowRefs.value)
    // Calc header rows height
    headerRowRefs.value.forEach(el => {
        currentTimeTop += el.getBoundingClientRect().height
    })
    dayjs.extend(utc)
    const nowInUTC = dayjs().utc()
    // console.log(`Now in UTC is ${nowInUTC.format()}`)
    for (let i = 0; i < nowInUTC.hour(); i++) {
        currentTimeTop += rowRefs.value[i].getBoundingClientRect().height
    }
    currentTimeTop += (rowRefs.value[0].getBoundingClientRect().height * (nowInUTC.minute() / 60))
    currentTime.value.style.top = `${currentTimeTop}px`
}
onBeforeMount(() => {
    const { locale } = useI18n()
    userLocale.value = locale.value
    options.value = createOptionList(timezones, locale.value)
    const savedData = getTimezoneIDs()
    if (savedData === null) {
        // console.log('Set default timezones')
        selectedTimezoneIDs.value = [
            'UTC-8:00_PST',
            'UTC-5:00_EST',
            'UTC+0:00_UTC',
            'UTC+5:30_IST',
            'UTC+9:00_JST'
        ]
    } else {
        selectedTimezoneIDs.value = savedData
    }

    updateTimezoneData()

    intervalID.value = setInterval(() => {
        updateCurrentTime()
    }, 1000 * 60)
})

function updateTimezoneData() {
    timezoneData.value = createTimezoneData(selectedTimezoneIDs.value)
}
/**
 * Add a timezone to table
 */
const addTimezone = async () => {
    if (selectedOption.value === undefined
     || selectedTimezoneIDs.value.indexOf(selectedOption.value.id) > -1) {
        return false
    }
    // console.log('selected option =', selectedOption.value.id)
    selectedTimezoneIDs.value.push(selectedOption.value.id)
    // console.log(selectedTimezoneIDs.value)
    updateTimezoneData()
    saveTimezoneIDs(selectedTimezoneIDs.value)
    await nextTick()
    updateCurrentTime()
}
/**
 * Delete timezone from selected timezones
 * @param {string} id - timezone id
 */
const deleteTimezone = (id) => {
    const index = selectedTimezoneIDs.value.indexOf(id)
    if (index > -1) {
        selectedTimezoneIDs.value.splice(index, 1)
    }
    // console.log(selectedTimezoneIDs.value)
    updateTimezoneData()
    saveTimezoneIDs(selectedTimezoneIDs.value)
}
/**
 * Toggle delete buttons visibility
 */
const toggleDeleteButtons = () => {
    isDeleteButtonsVisible.value = !isDeleteButtonsVisible.value
}

</script>

<template>
    <div class="container px-5 py-5 md:py-10 mx-auto">
        <div class="flex items-center lg:w-4/5 mx-auto mb-5 flex-row justify-between">
            <!-- Controls -->

            <div class="flex">
                <multiselect v-model="selectedOption" track-by="label" label="label"
                    :placeholder="$t('multiselect.placeholder')" :selectedLabel="$t('multiselect.selectedLabel')"
                    :selectLabel="$t('multiselect.selectLabel')" :allow-empty="false" :options="options"
                    deselect-label="">
                    <template #noResult>
                        <span>{{ $t('multiselect.noResult') }}</span>
                    </template>
                </multiselect>

                <button id="button-add" @click="addTimezone" type="button"
                    class="ml-2 py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 focus:ring-indigo-500 text-white w-full md:w-20 transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg">
                    {{ $t('timezoneTable.addButton') }}
                </button>
            </div>
            <div>
                <button id="button-edit" class="text-indigo-500" @click="toggleDeleteButtons"
                    :class="{ hidden: isDeleteButtonsVisible }">
                    {{ $t('timezoneTable.editButton') }}
                </button>
                <button id="button-done" class="text-indigo-500" @click="toggleDeleteButtons"
                    :class="{ hidden: !isDeleteButtonsVisible }">
                    {{ $t('timezoneTable.doneButton') }}
                </button>
            </div>
        </div>
        <div class="flex items-center lg:w-4/5 mx-auto mb-10 flex-row">
            <!-- Timezone Table -->
            <div class="overflow-x-auto">
                <table id="delete-buttons">
                    <tbody>
                        <tr class="delete-button-row" :class="{ hidden: !isDeleteButtonsVisible }">
                            <template v-for="tz in timezoneData">
                                <th class="timezone-delete-button-cell">
                                    <button class="delete-button inline cursor-pointer" @click="deleteTimezone(tz.id)">
                                        <svg class="fill-du_red inline" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" width="24" height="24">
                                            <path
                                                d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm5,13H7v-2h10v2Z" />
                                        </svg>
                                    </button>
                                </th>
                            </template>
                        </tr>
                    </tbody>
                </table>
                <table class="relative" id="timezone-table">
                    <thead>
                        <tr ref="currentTime"
                            class="transition-all duration-500 absolute w-full h-0.5 top-[66px] bg-du_red z-10">
                            <td colspan="5" class="hidden"></td>
                        </tr>
                        <tr id="header-offset" :ref="setRowRef('header', 0)">
                            <template v-for="tz in timezoneData">
                                <th class="timezone-header-cell">{{ tz.zoneInfo.offset }}</th>
                            </template>
                        </tr>
                        <tr id="header-abbreviation" :ref="setRowRef('header', 1)">
                            <template v-for="tz in timezoneData">
                                <th class="timezone-header-cell">
                                    <template v-if="userLocale === 'en'">
                                        <span :title="tz.zoneInfo.name">{{ tz.zoneInfo.abbreviation }}</span>
                                    </template>
                                    <template v-else-if="userLocale === 'ja'">
                                        <span :title="tz.zoneInfo.nameJa">{{ tz.zoneInfo.abbreviation }}</span>
                                    </template>

                                </th>
                            </template>
                        </tr>
                    </thead>
                    <tbody class="timezone-table-body">
                        <template v-for="i in 24">
                            <tr :ref="setRowRef('row', i-1)">
                                <template v-for="tz in timezoneData">
                                    <td class="timezone-cell" :class="tz.table[i - 1]['class']">
                                        <span class="z-20 relative">{{tz.table[i - 1]['label']}}</span>
                                    </td>
                                </template>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="lg:w-4/5 mx-auto">
            <div class="text-sm" v-html="$t('timezoneTable.notice')"></div>
        </div>

    </div>
</template>

<style src="../assets/vue-multiselect.css"></style>
