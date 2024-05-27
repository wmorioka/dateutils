<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import CalendarBody from './CalendarBody.vue'
import CalendarControls from './CalendarControls.vue'
import { Holidays } from '../lib/holidays'
import { createMonthData } from '../lib/calendarFunctions'
defineProps(['isVisible'])
// instance of dayjs: dayjs(dayjs().format('YYYY-MM-DD'))
const date = defineModel()
const baseDate = ref()
const monthData = ref([])
const holidays = ref(new Holidays())
const hour = ref(0)
const minute = ref(0)
const seletedDate = ref()


const init = () => {
    // this is workaround
    seletedDate.value = date.value
    console.log(`DatePicker date is ${seletedDate.value}`)
    baseDate.value = dayjs(seletedDate.value.format('YYYY-MM-DD'))
    updateMonthData()
    hour.value = date.value.hour()
    minute.value = date.value.minute()
}
const updateMonthData = () => {
    monthData.value = createMonthData(baseDate.value, holidays.value, dayjs(seletedDate.value.format('YYYY-MM-DD')), null)
}

init()

const move = (direction) => {
    console.log(`direction is ${direction}`)
    if (direction === 'prev') {
        baseDate.value = baseDate.value.subtract(1, 'month')
    } else {
        baseDate.value = baseDate.value.add(1, 'month')
    }
    updateMonthData()
}
/**
 * Event Handler for calendar cell click event
 * @param {Number} selectedYear 
 * @param {Number} selectedMonth 
 * @param {Number} selectedDate 
 */
const onCellClick = (selectedYear, selectedMonth, selectedDate) => {
    // Somehow, date.value isn't to be updated correctly
    // If I click once, date.value was not updated.
    // If I click twice, it was updated.
    // So I use not model but ref.
    seletedDate.value = dayjs(new Date(selectedYear, selectedMonth - 1, selectedDate, hour.value, minute.value))
    updateMonthData()
}
const emit = defineEmits(['doneButtonClick'])
const doneButtonClick = () => {
    date.value = seletedDate.value
    emit('doneButtonClick')
}
const hourChange = () => {
    seletedDate.value = seletedDate.value.hour(hour.value)
}
const minuteChange = () => {
    seletedDate.value = seletedDate.value.minute(minute.value)
}
/**
 * Handle Now button click event
 */
const now = () => {
    const now = dayjs()
    seletedDate.value = now
    hour.value = seletedDate.value.hour()
    minute.value = seletedDate.value.minute()
    baseDate.value = dayjs(now.format('YYYY-MM-DD'))
    updateMonthData()
}
</script>

<template>
    <div id="date-picker" class="date-picker" :class="{ hidden: isVisible === false }">
        <div class="relative">
            <!-- Control -->
            <CalendarControls date-picker-mode="true" @move="move" @now="now" />
            <div class="p-2">
                <CalendarBody :monthData="monthData[0]" :isTwoMonthsModeEnabled="false" :isSecondMonth="false"
                    @on-cell-click="onCellClick" />
            </div>
            <div class="date-picker-time">
                <div class="inline-flex items-center px-1 border rounded-lg border-gray-300">
                    <svg class="stroke-indigo-500" fill="none" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2" viewBox="0 0 24 24" width="17" height="17">
                        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div class="select-base">
                        <select id="date-picker-hour" class="select" v-model="hour" @change="hourChange">
                            <option v-for="i in 24" :value="i - 1">
                                {{ (i - 1 < 10) ? '0' + (i - 1) : i - 1 }} </option>
                        </select>
                    </div>
                    <span class="time-colon">:</span>
                    <div class="select-base">
                        <select id="date-picker-minute" class="select" v-model="minute" @change="minuteChange">
                            <option v-for="i in 60" :value="i - 1">
                                {{ (i - 1 < 10) ? '0' + (i - 1) : i - 1 }} </option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" @click="doneButtonClick"
                        class="py-[3px] px-3 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 focus:ring-indigo-500 text-white w-auto transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg">
                        Done
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>