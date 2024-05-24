<script setup>
import { ref } from 'vue'
import Multiselect from 'vue-multiselect'
import { timezones } from '../lib/timezones'
import { createOptionList } from '../timezone-table/lib/timezoneTableFunctions'
import dayjs from 'dayjs'
import { validateDatetimeFormat, getConvertHistory, saveConvertHistory } from './lib/timezonConverterFunctions'
import { convertFormats } from './lib/convertFormats'

const options = ref([])
const date = ref()
const dateError = ref('')
const timezoneFrom = ref()
const timezoneFromError = ref('')
const timezoneTo = ref()
const timezoneToError = ref('')
const isAbbreviationChecked = ref(false)
const isUTCOffsetChecked = ref(false)

const results = ref([])
const copyToolipTimers = ref([])
const isCopyTooltipVisible = ref([])

const init = () => {
    options.value = createOptionList(timezones)
    date.value = dayjs().format('YYYY/MM/DD HH:mm')
    for (let i = 0; i < convertFormats.length; i++) {
        results.value[i] = ''
        copyToolipTimers[i] = null
        isCopyTooltipVisible[i] = false
    }
    // load saved data
    const history = getConvertHistory()
    if (history !== null){
        date.value = history.date
        timezoneFrom.value = history.timezoneFrom
        timezoneTo.value = history.timezoneTo
        isAbbreviationChecked.value = history.isAbbreviationChecked
        isUTCOffsetChecked.value = history.isUTCOffsetChecked
    }
}
init()

/**
 * Convert date timezone
 */
const convert = () => {
    let isError = false
    dateError.value = ''
    timezoneFromError.value = ''
    timezoneToError.value = ''
    isError = !validateDate()
    if (timezoneFrom.value === undefined){
        isError = true
        timezoneFromError.value = 'Select timezone'
    }
    if (timezoneTo.value === undefined){
        isError = true
        timezoneToError.value = 'Select timezone'
    }
    if (isError) return false
    const targetDate = dayjs(date.value)
    const from = timezones[timezoneFrom.value.id]
    const to = timezones[timezoneTo.value.id]
    const offset = from.offsetMinites - to.offsetMinites
    console.log(`Offset is ${offset}`)
    const computedDate = targetDate.subtract(offset, 'minute')
    console.log(`computedDate is ${computedDate}`)
    let optionLabel = ''
    if (isAbbreviationChecked.value) optionLabel += ` ${to.abbreviation}`
    if (isUTCOffsetChecked.value) optionLabel += ` (UTC${to.offset})`
    for (let i = 0; i < convertFormats.length; i++) {
        results.value[i] = computedDate.format(convertFormats[i]) + optionLabel
    }
    // save data
    const history = {}
    history.date = date.value
    history.timezoneFrom = timezoneFrom.value
    history.timezoneTo = timezoneTo.value
    history.isAbbreviationChecked = isAbbreviationChecked.value
    history.isUTCOffsetChecked = isUTCOffsetChecked.value
    saveConvertHistory(history)

}
/**
 * Handle date text box change event
 */
const textChange = () => {
    validateDate()
}
/**
 * Validate date format
 * @returns {bool} true is date is valid
 */
const validateDate = () => {
    dateError.value = ''
    console.log(date.value)
    if (date.value === '' || date.value === undefined) {
        dateError.value = 'Input date'
    } else if (!validateDatetimeFormat(date.value)) {
        dateError.value = 'Date format is invalid'
    }
    return dateError.value === ''
}
/**
 * Handle select change
 * @param {string} el - from | to
 */
const selectChange = (el) => {
    if (el === 'from') {
        timezoneFromError.value = ''
    } else {
        timezoneToError.value = ''
    }
}
/**
 * Handle From select change
 */
const selectFrom = () => {
    selectChange('from')
}
/**
 * Handle To select change
 */
const selectTo = () => {
    selectChange('to')
}

/**
 * Copy result text to clipboard
 * @param {number} index - index of convert formats
 */
const copyResultText = (index) => {
    clearTimeout(copyToolipTimers.value[index])
    navigator.clipboard.writeText(results.value[index])
    isCopyTooltipVisible.value[index] = true
    copyToolipTimers.value[index] = setTimeout(() => {
        isCopyTooltipVisible.value[index] = false
    }, 1000);

}
</script>

<template>
    <div class="container px-5 py-5 md:py-10 mx-auto">
        <div class="lg:w-4/5 mx-auto mb-10 ">
            <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">
                <div class="sm:col-span-3">
                    <span class="inline-block  mt-2.5 ">
                        Date
                    </span>
                </div>
                <!-- End Col -->

                <div class="sm:col-span-9">
                    <div class="flex">
                        <input type="text" id="date" v-model="date" @change="textChange"
                            :class="{ error: dateError !== ''}"
                            class="py-2 px-3 mr-3 block text-base w-full placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            name="" placeholder="YYYY/MM/DD HH:mm" />
                        <button type="button" title="Copy" data-for="result-5"
                            class="copy-button py-2 px-3  h-10 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 focus:ring-indigo-500 text-white w-auto transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg">
                            <svg fill="none" class="w-4 h-4 fill-white" viewBox="0 0 24 24">
                                <path
                                    d="m8,12h-2c-1.103,0-2,.897-2,2v2c0,1.103.897,2,2,2h2c1.103,0,2-.897,2-2v-2c0-1.103-.897-2-2-2Zm-2,4v-2h2v2s-2,0-2,0ZM19,2h-1v-1c0-.552-.447-1-1-1s-1,.448-1,1v1h-8v-1c0-.552-.447-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5Zm-14,2h14c1.654,0,3,1.346,3,3v1H2v-1c0-1.654,1.346-3,3-3Zm14,18H5c-1.654,0-3-1.346-3-3v-9h20v9c0,1.654-1.346,3-3,3Z" />
                            </svg>
                        </button>
                    </div>
                    <template v-if="dateError !== ''">
                        <div class="text-red-500 pl-[2px]">
                            {{ dateError }}
                        </div>
                    </template>
                </div>
                <!-- End Col -->

                <div class="sm:col-span-3">
                    <span class="inline-block  mt-2.5">
                        From
                    </span>
                </div>
                <!-- End Col -->

                <div class="sm:col-span-9">
                    <div :class="{ 'multiselect-error': timezoneFromError !== ''}">
                        <multiselect v-model="timezoneFrom" track-by="label" label="label" placeholder="Select timezone"
                            :allow-empty="false" :options="options" deselect-label="" @select="selectFrom">
                        </multiselect>
                    </div>
                    <template v-if="timezoneFromError !== ''">
                        <div class="text-red-500 pl-[2px]">
                            {{ timezoneFromError }}
                        </div>
                    </template>
                </div>
                <!-- End Col -->

                <div class="sm:col-span-3">
                    <span class="inline-block  mt-2.5">
                        To
                    </span>
                </div>
                <!-- End Col -->

                <div class="sm:col-span-9">
                    <div :class="{ 'multiselect-error': timezoneToError !== ''}">
                        <multiselect v-model="timezoneTo" track-by="label" label="label" placeholder="Select timezone"
                            :allow-empty="false" :options="options" deselect-label="" @select="selectTo">
                        </multiselect>
                    </div>
                    <template v-if="timezoneToError !== ''">
                        <div class="text-red-500 pl-[2px]">
                            {{ timezoneToError }}
                        </div>
                    </template>
                </div>
                <!-- End Col -->

                <div class="sm:col-span-3">
                    <span class="inline-block  mt-2.5">
                        Options
                    </span>
                </div>

                <div class="sm:col-span-9">
                    <div class="py-2 flex items-center">
                        <input id="abbreviatedTimezoneName" type="checkbox" v-model="isAbbreviationChecked"
                            class="w-4 h-4 accent-indigo-500">
                        <label for="abbreviatedTimezoneName" class="ml-2 text-gray-700">Abbreviated Timezone
                            Name</label>
                    </div>

                    <div class="py-2 flex items-center">
                        <input id="UTCOffset" type="checkbox" v-model="isUTCOffsetChecked"
                            class="w-4 h-4 accent-indigo-500">
                        <label for="UTCOffset" class="ml-2 text-gray-700">UTC Offset</label>
                    </div>

                </div>

            </div>

            <div class="mb-12 mt-6 w-full text-center">
                <button type="button" @click="convert"
                    class="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 focus:ring-indigo-500 text-white w-40 transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg">
                    Convert
                </button>
            </div>
            <!-- Results -->
            <div class="mb-6">
                <h2 class="text-xl font-bold">
                    Results
                </h2>
                <p class="text-sm">
                    You can copy converted results by clicking <svg
                        class="inline js-clipboard-default flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    </svg> buttons.
                </p>
            </div>
            <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">

                <template v-for="(_, i) in convertFormats">
                    <div class="sm:col-span-3">
                        <span class="inline-block  mt-2.5 ">
                            Format {{ i + 1 }}
                        </span>
                    </div>
                    <div class="sm:col-span-9">
                        <div class="flex">
                            <input type="text" v-model="results[i]"
                                class="py-2 px-3 mr-3 block text-base w-full placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                name="" value="" />
                            <div class="tooltip">
                                <span class="tooltip-contents-copied right-0"
                                    :class="{ hidden: !isCopyTooltipVisible[i] }">Copied</span>
                                <button type="button" title="Copy" @click="copyResultText(i)"
                                    class="copy-button py-2 px-3 h-10 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 focus:ring-indigo-500 text-white w-auto transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg">
                                    <svg class="js-clipboard-default flex-shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                                        <path
                                            d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </template>

            </div>
        </div>

    </div>
</template>

<style src="../assets/vue-multiselect.css"></style>
