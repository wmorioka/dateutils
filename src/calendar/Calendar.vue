<script setup>
import CalendarBody from './parts/CalendarBody.vue'
import { ref } from 'vue'
import dayjs from 'dayjs'
import { createMonthData, createSelectedDaysInfo } from './lib/calendarFunctions'
import { SELECT_NONE, SELECT_SINGLE, SELECT_DOUBLE, SelectState } from './lib/selectState'

const isTwoMonthMode = ref(false)
const baseDate = ref()
const holidaysData = ref()
const monthData = ref([])
const state = ref(new SelectState())
const selectStartDate = ref(null)
const selectEndDate = ref(null)
const selectedDaysInfo = ref()
const isShowSelectedDaysInfo = ref(false)

init()

/**
 * Initialize base date and holidays data
 */
function init(){
  // This is to emit hour, minute, second and milisecond
  baseDate.value = dayjs(dayjs().format('YYYY-MM-DD'))
  holidaysData.value = {
    2024: {
      1: {
        1: '元旦',
        8: '成人の日'
      },
      2: {
        11: '建国記念の日',
        12: '休日',
        23: '天皇誕生日'
      },
      3: {
        20: '春分の日'
      },
      4: {
        29: '昭和の日'
      },
      5: {
        3: '憲法記念日',
        4: 'みどりの日',
        5: 'こどもの日',
        6: '振替休日'
      },
      7: {
        15: '海の日'
      },
      8: {
        11: '山の日',
        12: '振替休日'
      },
      9: {
        16: '敬老の日',
        22: '秋分の日',
        23: '振替休日'
      },
      10: {
        14: 'スポーツの日'
      },
      11: {
        3: '文化の日',
        4: '休日'
      },
      11: {
        23: '勤労感謝の日'
      },
      12: {
        30: '年末',
        31: '大晦日'
      }
    }
  }
  updateMonthData()
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
 * Event handler for previous month icon
 */
function prevMonth(){
  console.log('prevMonth()')
  baseDate.value = baseDate.value.subtract(1, 'month')
  updateMonthData()
}
/**
 * Event handler for next month icon
 */
function nextMonth(){
  console.log('nextMonth()')
  baseDate.value = baseDate.value.add(1, 'month')
  updateMonthData()
}
/**
 * Event handler for show one month button
 */
function showOneMonth(){
  console.log('showOneMonth()')
  isTwoMonthMode.value = false
}
/**
 * Event handler for show tow months button
 */
function showTwoMonths(){
  console.log('showTwoMonths()')
  isTwoMonthMode.value = true
}

const isSettingOpened = ref(false)
const holidaysCSVText = ref('')
function toggleSettings(){
  isSettingOpened.value = !isSettingOpened.value
}

function saveHistoryData(){

}
function addPreset2024US(){
  if (holidaysCSVText.value !== '') {
    holidaysCSVText.value += "\n"
  }
  holidaysCSVText.value = holidaysCSVText.value + `2024/01/01,New Year's Day
2024/01/15,Martin Luther King Jr. Day
2024/02/19,Presidents' Day
2024/05/27,Memorial Day
2024/06/19,Juneteenth
2024/07/04,Independence Day
2024/09/02,Labor Day
2024/10/14,Columbus Day
2024/11/11,Veterans Day
2024/11/28,Thanksgiving Day
2024/12/25,Christmas Day`

}
function addPreset2024JP(){
  if (holidaysCSVText.value !== ''){
    holidaysCSVText.value += "\n"
  }
  holidaysCSVText.value = holidaysCSVText.value + `2024/01/01,元日
2024/01/08,成人の日
2024/02/11,建国記念の日
2024/02/12,休日
2024/02/23,天皇誕生日
2024/03/20,春分の日
2024/04/29,昭和の日
2024/05/03,憲法記念日
2024/05/04,みどりの日
2024/05/05,こどもの日
2024/05/06,休日
2024/07/15,海の日
2024/08/11,山の日
2024/08/12,休日
2024/09/16,敬老の日
2024/09/22,秋分の日
2024/09/23,休日
2024/10/14,スポーツの日
2024/11/03,文化の日
2024/11/04,休日
2024/11/23,勤労感謝の日`

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
  navigator.clipboard.writeText(selectedDaysInfo.value.label)
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
                  <span class="tooltip-contents-copied">Copied</span>
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
          <div class="absolute right-0">
            <div class="flex items-center">
              <button type="button" class="mr-3" title="Prev" @click="prevMonth">
                <svg class="fill-gray-500 w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z" />
                </svg>
              </button>
              <button type="button" class="mr-5" title="Next" @click="nextMonth">
                <svg class="fill-gray-500 w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z" />
                </svg>
              </button>
              <button id="switch-one" type="button" title="Show one month" @click="showOneMonth"
                :class="{'switch-selected' : !isTwoMonthMode}"
                class="w-full px-2 py-2 text-base font-medium text-black bg-white border-t border-b border-l rounded-l-md hover:bg-gray-100">
                <svg class="stroke-gray-500" width="30" height="16" viewBox="0 0 30 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="26" height="20" rx="2" stroke-width="3" />
                </svg>
              </button>
              <button id="switch-two" type="button" title="Show two months" @click="showTwoMonths"
                :class="{'switch-selected' : isTwoMonthMode}"
                class="w-full px-2 py-2 text-base font-medium text-black bg-white border-t border-b border-r rounded-r-md hover:bg-gray-100">
                <svg class="hidden md:block stroke-gray-500" width="30" height="16" viewBox="0 0 30 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="9" height="20" rx="2" stroke-width="3" />
                  <rect x="19" y="2" width="9" height="20" rx="2" stroke-width="3" />
                </svg>
                <svg class="md:hidden stroke-gray-500" width="30" height="16" viewBox="0 0 30 24" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="26" height="6" rx="2" stroke-width="3" />
                  <rect x="2" y="16" width="26" height="6" rx="2" stroke-width="3" />
                </svg>
              </button>
            </div>
          </div>
          <!-- Add 'md:grid-cols-2' if 2 months mode -->
          <div id="calendar-container" class="grid grid-cols-1 gap-4 md:gap-6"
            :class="{ 'md:grid-cols-2': isTwoMonthMode }">
            <!-- First month -->
            <CalendarBody :monthData="monthData[0]" :isTwoMonthMode="isTwoMonthMode" :isSecondMonth="false"
              @cell-click="cellClick" />
            <!-- second month -->
            <CalendarBody :monthData="monthData[1]" :isTwoMonthMode="isTwoMonthMode" :isSecondMonth="true"
              @cell-click="cellClick" />
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
      <div id="settings-container" class="py-6" :class="{ hidden: !isSettingOpened }">
        <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">
          <div class="sm:col-span-3">
            <label for="holidays-data" class="inline-block  mt-2.5 ">
              Holiday Data
            </label>
          </div>
          <!-- End Col -->

          <div class="sm:col-span-9">
            <div class="sm:flex">
              <textarea v-model="holidaysCSVText"
                class="flex-1 w-full md:w-2/3 px-4 py-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                id="holidays-data" placeholder="YYYY-MM-DD,Holiday Name" name="holidays-data" rows="7"
                cols="40"></textarea>
            </div>
          </div>
        </div>
        <div class="mb-6 mt-6 w-full text-center">
          <div class="flex justify-center tooltip">
            <button type="button" @click="saveHistoryData"
              class="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 focus:ring-indigo-500 text-white w-40 transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg">
              Save
            </button>
            <span class="tooltip-contents-copied">Saved</span>
          </div>
        </div>
        <div class=" mb-2">
          We offer some preset holidays data. Click below links to add holidays data and then save the data.
        </div>
        <div class=" mb-2">
          <button @click="addPreset2024US" id="preset-holidays-2024-us" class="text-indigo-500 block mb-2">2024 US
            Holidays</button>
          <button @click="addPreset2024JP" id="preset-holidays-2024-jp" class="text-indigo-500 block mb-2">2024 Japan
            Holidays</button>

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
