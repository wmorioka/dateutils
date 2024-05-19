<script setup>
import CalendarBody from './parts/CalendarBody.vue'
import CalendarControls from './parts/CalendarControls.vue'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { createMonthData, createSelectedDaysInfo, validateHolidaysCSV, convertHolidaysCSV } from './lib/calendarFunctions'
import { SELECT_NONE, SELECT_SINGLE, SELECT_DOUBLE, SelectState } from './lib/selectState'
import { saveHolidays, getHolidays } from '../lib/storage'
import { holidaysPresets } from './lib/holidaysPresets'

const isTwoMonthsModeEnabled = ref(false)
const baseDate = ref()
const holidaysData = ref()
const holidaysCSVText = ref('')
const hasHolidaysCSVTextError = ref(false)
const holidaysCSVTextErrors = ref([])
const monthData = ref([])
const state = ref(new SelectState())
const selectStartDate = ref(null)
const selectEndDate = ref(null)
const selectedDaysInfo = ref()
const isShowSelectedDaysInfo = ref(false)
const isShowCopyTooltip = ref(false)
const copyToolipTimer = ref()
// For Save holidays data
const isShowSaveTooltip = ref(false)
const saveToolipTimer = ref()

init()

/**
 * Initialize base date and holidays data
 */
function init(){
  // This is to emit hour, minute, second and milisecond
  baseDate.value = dayjs(dayjs().format('YYYY-MM-DD'))
  updateHolidaysData()
  updateMonthData()
}
function updateHolidaysData(){
  holidaysCSVText.value = getHolidays()
  holidaysData.value = convertHolidaysCSV(holidaysCSVText.value)
}
/**
 * Update months data. This data is used for calendar
 */
function updateMonthData(){
  monthData.value = createMonthData(baseDate.value, holidaysData.value, selectStartDate.value, selectEndDate.value)
  selectedDaysInfo.value = createSelectedDaysInfo(monthData.value, selectStartDate.value, selectEndDate.value)
  console.log(selectedDaysInfo.value)
}
/**
 * Handle click event of Show prev and Show next.
 * @param {String} direction - prev|next
 */
function move(direction) {
  if (direction === 'prev') {
    baseDate.value = baseDate.value.subtract(1, 'month')
  } else {
    baseDate.value = baseDate.value.add(1, 'month')
  }
  updateMonthData()
}
/**
 * 
 * @param {bool} twoMonthsMode 
 */
function toggleTwoMonthsMode(twoMonthsMode){
  isTwoMonthsModeEnabled.value = twoMonthsMode
}

const isSettingOpened = ref(false)
function toggleSettings(){
  isSettingOpened.value = !isSettingOpened.value
}
/**
 * Event handler for save holidays button
 */
function saveHolidaysData(){
  clearTimeout(saveToolipTimer.value)
  isShowSaveTooltip.value = false
  const result = validateHolidaysCSV(holidaysCSVText.value)
  if (result.hasError){
    holidaysCSVTextErrors.value = result.errorMessages
    hasHolidaysCSVTextError.value = true
  } else {
    holidaysCSVTextErrors.value = []
    hasHolidaysCSVTextError.value = false

    saveHolidays(holidaysCSVText.value)
    updateHolidaysData()
    updateMonthData()
    isShowSaveTooltip.value = true
    saveToolipTimer.value = setTimeout(() => {
      isShowSaveTooltip.value = false
    }, 1000);
  }
}
/**
 * Event handler for holidays preset links. Add preset CSV text to textarea
 * @param {string} key - key of holidaysPresets object
 */
function addPreset(key){
  if (holidaysCSVText.value !== '' && holidaysCSVText.value !== null) {
    holidaysCSVText.value += "\n"
  }
  holidaysCSVText.value = holidaysCSVText.value + holidaysPresets[key]
}

/**
 * Event Handler for calendar cell click event
 * @param year 
 * @param month 
 * @param date 
 */
function cellClick(year, month, date){
  console.log(`cell clicked: ${year}-${month}-${date}`)
  console.log(`selectState: ${state.value.currentState}`)
  isShowSelectedDaysInfo.value = false
  const selectedDate = dayjs(new Date(year, month - 1, date))
  if (state.value.currentState === SELECT_NONE){
    // No date selected yet
    selectStartDate.value = selectedDate
    state.value.next()
  } else if (state.value.currentState === SELECT_SINGLE){
    if (selectedDate.isSame(selectStartDate.value)) {
      selectStartDate.value = null
      state.value.reset()
    } else {
      isShowSelectedDaysInfo.value = true
      // selectStartDate < selectedDate
      if (selectStartDate.value.isBefore(selectedDate)) {
        selectEndDate.value = selectedDate
        state.value.next()
      } else {
        // selectedDate < selectStartDate then swap
        const tmp = selectStartDate.value
        selectStartDate.value = selectedDate
        selectEndDate.value = tmp
        state.value.next()
      }
    }
  } else if (state.value.currentState === SELECT_DOUBLE) {
    // remove selection
    selectStartDate.value = null
    selectEndDate.value = null
    state.value.next()
  }
  updateMonthData()
}
/**
 * Event Handler for close button of selected days info area
 */
function closeButtonClick(){
  isShowSelectedDaysInfo.value = false
}
/**
 * Event Handler for copy button of selected days info area
 */
function copyButtonClick(){
  clearTimeout(copyToolipTimer.value)
  navigator.clipboard.writeText(selectedDaysInfo.value.label)
  isShowCopyTooltip.value = true
  copyToolipTimer.value = setTimeout(() => {
    isShowCopyTooltip.value = false
  }, 1000);
}
</script>

<template>
  <div class="container px-5 py-5 md:py-10 mx-auto">
    <div class="flex items-center lg:w-4/5 mx-auto mb-10 sm:flex-row flex-col">

      <!-- Calendar container -->
      <div class="w-full">
        <div class="relative">
          <!-- Selected Days Info -->
          <div class="selected-days-info" :class="{ 'hidden': !isShowSelectedDaysInfo }">
            <div class="p-3 px-10 text-center relative">
              <span class="flex justify-center">
                <div>{{ selectedDaysInfo.label }}</div>
                <span class="tooltip ml-1 pt-1 flex justify-center">
                  <span class="tooltip-contents-copied" :class="{ 'hidden': !isShowCopyTooltip }">Copied</span>
                  <svg @click="copyButtonClick"
                    class="w-4 h-4 inline cursor-pointer js-clipboard-default flex-shrink-0 size-4 hover:stroke-indigo-500"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  </svg>
                </span>
              </span>
              <span class="block">{{ selectedDaysInfo.duration }} days ({{ selectedDaysInfo.businessDays }} business
                days)</span>
              <!-- close button -->
              <button class="absolute right-1 top-1" @click="closeButtonClick">
                <svg class="w-6 h-6 inline cursor-pointer flex-shrink-0 size-4" viewBox="0 0 24 24">
                  <path
                    d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                </svg>
              </button>
            </div>
          </div>
          <!-- Control -->
          <CalendarControls :isTwoMonthsModeEnabled="isTwoMonthsModeEnabled" @move="move" @toggle-mode="toggleTwoMonthsMode"/>
          
          <!-- Add 'md:grid-cols-2' if 2 months mode -->
          <div id="calendar-container" class="grid grid-cols-1 gap-4 md:gap-6"
            :class="{ 'md:grid-cols-2': isTwoMonthsModeEnabled }">
            <!-- First month -->
            <CalendarBody :monthData="monthData[0]" :isTwoMonthsModeEnabled="isTwoMonthsModeEnabled" :isSecondMonth="false" @cell-click="cellClick" />
            <!-- second month -->
            <CalendarBody :monthData="monthData[1]" :isTwoMonthsModeEnabled="isTwoMonthsModeEnabled" :isSecondMonth="true" @cell-click="cellClick" />
          </div>
        </div>
      </div>
    </div>

    <!-- ad -->
    <!-- <div class="lg:w-4/5 mb-10 mx-auto text-white bg-gray-300 w-full h-28 text-xl content-center text-center">ad</div> -->

    <!-- Setting -->
    <div class="lg:w-4/5 mb-10 mx-auto">
      <div id="toggle-settings" class="cursor-pointer inline-block" @click="toggleSettings">
        <span class="text-indigo-500">Settings</span><svg id="settings-arrow-down" :class="{ hidden: isSettingOpened }"
          class="inline-block fill-indigo-400 w-6 h-6" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" />
        </svg><svg id="settings-arrow-up" :class="{ hidden: !isSettingOpened }"
          class="inline-block fill-indigo-400 w-6 h-6" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18,15.5a1,1,0,0,1-.71-.29l-4.58-4.59a1,1,0,0,0-1.42,0L6.71,15.21a1,1,0,0,1-1.42-1.42L9.88,9.21a3.06,3.06,0,0,1,4.24,0l4.59,4.58a1,1,0,0,1,0,1.42A1,1,0,0,1,18,15.5Z" />
        </svg>
      </div>
      <div id="settings-container" class="py-2" :class="{ hidden: !isSettingOpened }">
        <div class=" mb-2">
            You can set your holidays. Save the holidays data in CSV format, then holidays will be filled in red circle. Acceptable CSV format is <span class="bg-gray-100 text-red-400 rounded-md p-1 text-sm font-mono">YYYY/MM/DD,Holiday name</span>.
        </div>
        <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">
          <div class="sm:col-span-3">
            <label for="holidays-data" class="inline-block  mt-2.5 ">
              Holiday Data
            </label>
          </div>

          <div class="sm:col-span-9">
            <div class="sm:flex">
              <textarea v-model="holidaysCSVText"
                class="flex-1 w-full md:w-2/3 px-4 py-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                :class="{error: hasHolidaysCSVTextError}" id="holidays-data" placeholder="YYYY/MM/DD,Holiday name"
                name="holidays-data" rows="7" cols="40"></textarea>
            </div>
            <template v-for="error in holidaysCSVTextErrors">
              <div class="text-red-500">
                {{ error }}
              </div>
            </template>
          </div>
        </div>
        <div class="mb-6 mt-6 w-full text-center">
          <div class="flex justify-center tooltip">
            <button type="button" @click="saveHolidaysData"
              class="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 focus:ring-indigo-500 text-white w-40 transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg">
              Save
            </button>
            <span class="tooltip-contents-copied" :class="{ hidden: !isShowSaveTooltip }">Saved</span>
          </div>
        </div>
        <div class=" mb-2">
          We offer some holidays presets. Click below links to add holidays data and then save the data.
        </div>
        <div class=" mb-2">
          <button @click="addPreset('2024-US')" class="text-indigo-500 block mb-2">2024 US Holidays</button>
          <button @click="addPreset('2025-US')" class="text-indigo-500 block mb-2">2025 US Holidays</button>
          <button @click="addPreset('2024-JP')" class="text-indigo-500 block mb-2">2024 Japan Holidays</button>
          <button @click="addPreset('2025-JP')" class="text-indigo-500 block mb-2">2025 Japan Holidays</button>
        </div>
        <div class=" mb-2">
          Holidays data is stored in your browser's local storage. Your data is not sent to the server.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
