<script setup>
import { onMounted, onBeforeMount, ref } from 'vue'
import Multiselect from 'vue-multiselect'
import { timezones } from '../lib/timezones'
import { createOptionList } from '../timezone-table/lib/timezoneTableFunctions'
import dayjs from 'dayjs'
import { validateDatetimeFormat, getConvertHistory, saveConvertHistory } from './lib/timezonConverterFunctions'
import { convertFormats, convertFormatsJa } from './lib/convertFormats'
import DatePicker from '../calendar/components/DatePicker.vue'
import { useI18n } from 'vue-i18n'

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
const isDatePickerVisible = ref(false)
const datePickerDate = ref()
const formats = ref()

onMounted(() => {
    // Close DatePicker if user clicks outside DatePicker
    document.addEventListener('click', (el) => {
        const datePickerElement = document.getElementById('date-picker')
        const datePickerButtonElement = document.getElementById('toggle-date-picker')
        if (!datePickerElement.contains(el.target) 
            && !datePickerButtonElement.contains(el.target)){
            if (isDatePickerVisible.value){
                isDatePickerVisible.value = false
            }
        }
        return true
    })
})

onBeforeMount(() => {
    const { locale } = useI18n()
    if (locale.value === 'ja') {
        formats.value = convertFormatsJa
    } else {
        formats.value = convertFormats
    }
    options.value = createOptionList(timezones, locale.value)
    date.value = dayjs().format('YYYY/MM/DD HH:mm')
    for (let i = 0; i < formats.value.length; i++) {
        results.value[i] = ''
        copyToolipTimers[i] = null
        isCopyTooltipVisible[i] = false
    }
    // load saved data
    const history = getConvertHistory()
    if (history !== null) {
        date.value = history.date
        timezoneFrom.value = history.timezoneFrom
        timezoneTo.value = history.timezoneTo
        isAbbreviationChecked.value = history.isAbbreviationChecked
        isUTCOffsetChecked.value = history.isUTCOffsetChecked
    }
    datePickerDate.value = dayjs(date.value)
})

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
        timezoneFromError.value = 'timezoneConverter.error.timezoneIsEmpty'
    }
    if (timezoneTo.value === undefined){
        isError = true
        timezoneToError.value = 'timezoneConverter.error.timezoneIsEmpty'
    }
    if (isError) return false
    const targetDate = dayjs(date.value)
    const from = timezones[timezoneFrom.value.id]
    const to = timezones[timezoneTo.value.id]
    const offset = from.offsetMinites - to.offsetMinites
    // console.log(`Offset is ${offset}`)
    const computedDate = targetDate.subtract(offset, 'minute')
    // console.log(`computedDate is ${computedDate}`)
    let optionLabel = ''
    if (isAbbreviationChecked.value) optionLabel += ` ${to.abbreviation}`
    if (isUTCOffsetChecked.value) optionLabel += ` (UTC${to.offset})`
    for (let i = 0; i < formats.value.length; i++) {
        results.value[i] = computedDate.format(formats.value[i]) + optionLabel
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
    // console.log(date.value)
    if (date.value === '' || date.value === undefined) {
        dateError.value = 'timezoneConverter.error.dateIsEmpty'
    } else if (!validateDatetimeFormat(date.value)) {
        dateError.value = 'timezoneConverter.error.dateIsInvalidFormat'
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
    }, 1000)
}
/**
 * Toggle DatePicker visibility
 */
const toggleDatePicker = () => {
    isDatePickerVisible.value = !isDatePickerVisible.value
}
/**
 * Handle DatePicker close event
 */
const onDatePickerClosed = () => {
    isDatePickerVisible.value = false
    date.value = datePickerDate.value.format('YYYY/MM/DD HH:mm')
    validateDate()
}
/**
 * Handle multiselect open event
 */
const onMultiselectOpen = () => {
    // close DatePicker if opened
    if (isDatePickerVisible.value) {
        isDatePickerVisible.value = false
    }
}
</script>

<template>
    <div class="container px-5 py-5 md:py-10 mx-auto">
        <div class="lg:w-4/5 mx-auto mb-10 ">
            <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">
                <div class="sm:col-span-3">
                    <span class="inline-block  mt-2.5 ">
                        {{ $t('timezoneConverter.date') }}
                    </span>
                </div>
                <!-- End Col -->

                <div class="sm:col-span-9">
                    <div class="flex">
                        <input type="text" id="date" v-model="date" @change="textChange"
                            :class="{ error: dateError !== ''}"
                            class="py-2 px-3 mr-3 block text-base w-full placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            name="" placeholder="YYYY/MM/DD HH:mm" />
                        <div class="relative">
                            <button id="toggle-date-picker" type="button"
                                :title="$t('timezoneConverter.calendarButton')" @click="toggleDatePicker"
                                class="py-2 px-3  h-10 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 focus:ring-indigo-500 text-white w-auto transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg">
                                <svg fill="none" class="w-4 h-4 fill-white" viewBox="0 0 24 24">
                                    <path
                                        d="m8,12h-2c-1.103,0-2,.897-2,2v2c0,1.103.897,2,2,2h2c1.103,0,2-.897,2-2v-2c0-1.103-.897-2-2-2Zm-2,4v-2h2v2s-2,0-2,0ZM19,2h-1v-1c0-.552-.447-1-1-1s-1,.448-1,1v1h-8v-1c0-.552-.447-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5Zm-14,2h14c1.654,0,3,1.346,3,3v1H2v-1c0-1.654,1.346-3,3-3Zm14,18H5c-1.654,0-3-1.346-3-3v-9h20v9c0,1.654-1.346,3-3,3Z" />
                                </svg>
                            </button>
                            <DatePicker v-model="datePickerDate" :isVisible="isDatePickerVisible"
                                @doneButtonClick="onDatePickerClosed" />
                        </div>
                    </div>
                    <template v-if="dateError !== ''">
                        <div id="date-error" class="text-red-500 pl-[2px]">
                            {{ $t(dateError) }}
                        </div>
                    </template>
                </div>
                <!-- End Col -->

                <div class="sm:col-span-3">
                    <span class="inline-block  mt-2.5">
                        {{ $t('timezoneConverter.from') }}
                    </span>
                </div>
                <!-- End Col -->

                <div class="sm:col-span-9" id="timezone-from">
                    <div :class="{ 'multiselect-error': timezoneFromError !== ''}">
                        <multiselect v-model="timezoneFrom" track-by="label" label="label"
                            :placeholder="$t('multiselect.placeholder')"
                            :selectedLabel="$t('multiselect.selectedLabel')"
                            :selectLabel="$t('multiselect.selectLabel')" :allow-empty="false" :options="options"
                            deselect-label="" @select="selectFrom" @open="onMultiselectOpen">
                            <template #noResult>
                                <span>{{ $t('multiselect.noResult') }}</span>
                            </template>
                        </multiselect>
                    </div>
                    <template v-if="timezoneFromError !== ''">
                        <div class="text-red-500 pl-[2px]">
                            {{ $t(timezoneFromError) }}
                        </div>
                    </template>
                </div>
                <!-- End Col -->

                <div class="sm:col-span-3">
                    <span class="inline-block  mt-2.5">
                        {{ $t('timezoneConverter.to') }}
                    </span>
                </div>
                <!-- End Col -->

                <div class="sm:col-span-9" id="timezone-to">
                    <div :class="{ 'multiselect-error': timezoneToError !== ''}">
                        <multiselect v-model="timezoneTo" track-by="label" label="label"
                            :placeholder="$t('multiselect.placeholder')"
                            :selectedLabel="$t('multiselect.selectedLabel')"
                            :selectLabel="$t('multiselect.selectLabel')" :allow-empty="false" :options="options"
                            deselect-label="" @select="selectTo" @open="onMultiselectOpen">
                            <template #noResult>
                                <span>{{ $t('multiselect.noResult') }}</span>
                            </template>
                        </multiselect>
                    </div>
                    <template v-if="timezoneToError !== ''">
                        <div class="text-red-500 pl-[2px]">
                            {{ $t(timezoneToError) }}
                        </div>
                    </template>
                </div>
                <!-- End Col -->

                <div class="sm:col-span-3">
                    <span class="inline-block  mt-2.5">
                        {{ $t('timezoneConverter.options') }}
                    </span>
                </div>

                <div class="sm:col-span-9">
                    <div class="py-2 flex items-center">
                        <input id="abbreviatedTimezoneName" type="checkbox" v-model="isAbbreviationChecked"
                            class="w-4 h-4 accent-indigo-500">
                        <label for="abbreviatedTimezoneName" class="ml-2 text-gray-700">
                            {{ $t('timezoneConverter.abbreviatedTimezoneName') }}
                        </label>
                    </div>

                    <div class="py-2 flex items-center">
                        <input id="UTCOffset" type="checkbox" v-model="isUTCOffsetChecked"
                            class="w-4 h-4 accent-indigo-500">
                        <label for="UTCOffset" class="ml-2 text-gray-700">
                            {{ $t('timezoneConverter.UTCOffset') }}
                        </label>
                    </div>

                </div>

            </div>

            <div class="mb-12 mt-6 w-full text-center">
                <button id="convert-button" type="button" @click="convert"
                    class="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 focus:ring-indigo-500 text-white w-40 transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg">
                    {{ $t('timezoneConverter.convertButton') }}
                </button>
            </div>
            <!-- Results -->
            <div class="mb-6">
                <h2 class="text-xl font-bold">
                    {{ $t('timezoneConverter.results') }}
                </h2>
                <p class="text-sm">
                    {{ $t('timezoneConverter.resultsCaption1') }}<svg
                        class="inline js-clipboard-default flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    </svg>{{ $t('timezoneConverter.resultsCaption2') }}
                </p>
            </div>
            <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">

                <template v-for="(_, i) in formats">
                    <div class="sm:col-span-3">
                        <span class="inline-block  mt-2.5 ">
                            {{ $t('timezoneConverter.format') }} {{ i + 1 }}
                        </span>
                    </div>
                    <div class="sm:col-span-9">
                        <div class="flex">
                            <input type="text" v-model="results[i]" :id="'result-' + (i+1)"
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

        <div class="lg:w-4/5 mx-auto">
            <div class="text-sm" v-html="$t('timezoneConverter.notice')"></div>
        </div>

    </div>
</template>

<style src="../assets/vue-multiselect.css"></style>
