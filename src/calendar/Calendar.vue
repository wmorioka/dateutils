<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import CalendarBody from './components/CalendarBody.vue'
import CalendarControls from './components/CalendarControls.vue'
import SelectedRangeBanner from './components/SelectedRangeBanner.vue'
import CalendarSettings from './components/CalendarSettings.vue'
import { createMonthData, createSelectedRangeInfo } from './lib/calendarFunctions'
import { SELECT_NONE, SELECT_SINGLE, SELECT_DOUBLE, SelectState } from './lib/selectState'
import { holidaysPresets } from './lib/holidaysPresets'
import { Holidays } from './lib/holidays'

const holidays = ref(new Holidays())
const isTwoMonthsModeEnabled = ref(false)
const baseDate = ref()
const monthData = ref([])
const state = ref(new SelectState())
const selectStartDate = ref(null)
const selectEndDate = ref(null)
const selectedRangeInfo = ref()
const isSelectedRangeBannerVisible = ref(false)
const isCopyTooltipVisible = ref(false)
const copyToolipTimer = ref()
// For Save holidays data
const isSaveTooltipVisible = ref(false)
const saveToolipTimer = ref()

init()

/**
 * Initialize base date and holidays data
 */
function init(){
  // This is to eliminate hour, minute, second and milisecond
  baseDate.value = dayjs(dayjs().format('YYYY-MM-DD'))
  updateHolidaysData()
  updateMonthData()
}
function updateHolidaysData(){
  holidays.value.update()
}
/**
 * Update months data. This data is used for calendar
 */
function updateMonthData(){
  monthData.value = createMonthData(baseDate.value, holidays.value, selectStartDate.value, selectEndDate.value)
  selectedRangeInfo.value = createSelectedRangeInfo(monthData.value, selectStartDate.value, selectEndDate.value)
  console.log(selectedRangeInfo.value)
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
/**
 * Event handler for save holidays button
 */
function saveHolidaysData(){
  clearTimeout(saveToolipTimer.value)
  isSaveTooltipVisible.value = false
  if (!holidays.value.validate() || !holidays.value.save()){
    return false
  }
  updateHolidaysData()
  updateMonthData()
  isSaveTooltipVisible.value = true
  saveToolipTimer.value = setTimeout(() => {
    isSaveTooltipVisible.value = false
  }, 1000)
}
/**
 * Event handler for holidays preset links. Add preset CSV text to textarea
 * @param {string} key - key of holidaysPresets object
 */
function addPreset(key){
  if (holidays.value.csvText !== '' && holidays.value.csvText !== null) {
    holidays.value.csvText += "\n"
  }
  holidays.value.csvText = holidays.value.csvText + holidaysPresets[key].text
}

/**
 * Event Handler for calendar cell click event
 * @param {Number} year 
 * @param {Number} month 
 * @param {Number} date 
 */
function onCellClick(year, month, date){
  console.log(`cell clicked: ${year}-${month}-${date}`)
  console.log(`selectState: ${state.value.currentState}`)
  isSelectedRangeBannerVisible.value = false
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
      isSelectedRangeBannerVisible.value = true
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
 * Event Handler for close button of selected range banner
 */
function closeSelectedRangeBanner(){
  isSelectedRangeBannerVisible.value = false
}
/**
 * Event Handler for copy button of selected range banner
 */
function copyRangeText(){
  clearTimeout(copyToolipTimer.value)
  navigator.clipboard.writeText(selectedRangeInfo.value.label)
  isCopyTooltipVisible.value = true
  copyToolipTimer.value = setTimeout(() => {
    isCopyTooltipVisible.value = false
  }, 1000);
}
</script>

<template>
  <div class="container px-5 py-5 md:py-10 mx-auto">
    <div class="flex items-center lg:w-4/5 mx-auto mb-10 sm:flex-row flex-col">

      <!-- Calendar container -->
      <div class="w-full">
        <div class="relative">
          <!-- Selected Range Banner -->
          <SelectedRangeBanner 
            :isSelectedRangeBannerVisible="isSelectedRangeBannerVisible" 
            :isCopyTooltipVisible="isCopyTooltipVisible"
            :label="selectedRangeInfo.label"
            :days="selectedRangeInfo.days"
            :businessDays="selectedRangeInfo.businessDays"
            @close="closeSelectedRangeBanner"
            @copy="copyRangeText"
          />
          <!-- Control -->
          <CalendarControls :isTwoMonthsModeEnabled="isTwoMonthsModeEnabled" @move="move"
            @toggle-mode="toggleTwoMonthsMode" />

          <!-- Add 'md:grid-cols-2' if 2 months mode -->
          <div id="calendar-container" class="grid grid-cols-1 gap-4 md:gap-6"
            :class="{ 'md:grid-cols-2': isTwoMonthsModeEnabled }">
            <!-- First month -->
            <CalendarBody :monthData="monthData[0]" :isTwoMonthsModeEnabled="isTwoMonthsModeEnabled"
              :isSecondMonth="false" @on-cell-click="onCellClick" />
            <!-- Second month -->
            <CalendarBody :monthData="monthData[1]" :isTwoMonthsModeEnabled="isTwoMonthsModeEnabled"
              :isSecondMonth="true" @on-cell-click="onCellClick" />
          </div>
        </div>
      </div>
    </div>

    <!-- ad -->
    <!-- <div class="lg:w-4/5 mb-10 mx-auto text-white bg-gray-300 w-full h-28 text-xl content-center text-center">ad</div> -->

    <!-- Settings -->
    <CalendarSettings 
      v-model="holidays.csvText"
      :isSaveTooltipVisible="isSaveTooltipVisible"
      :errors="holidays.errorMessages"
      :presets="holidaysPresets"
      @save="saveHolidaysData"
      @addPreset="addPreset" />
    
  </div>
</template>
