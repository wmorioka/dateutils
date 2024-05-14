<script setup>
// import HelloWorld from '../components/HelloWorld.vue'
import { ref } from 'vue'
import dayjs from "dayjs"

const isTwoMonthMode = ref(false)
const textThisMonth = ref("")
const textNextMonth = ref("")
const baseDate = ref(dayjs())
/**
 * [
 *  {
 *    days:[
 *      {
 *        day: date of month
 *        dayOfWeek: numbers from 0 (Sunday) to 6 (Saturday).
 *        isHoliday: bool
 *        holidayLabel: String
 *        isToday: bool
 *      },
 *    ],
 *    month: 5,
 *    year: 2024,
 *  },
 *  {
 *  },
 * ]
 */
const daysArray = ref([])

updateMonthLabel()
updateDaysArray()

function updateDaysArray(){
  // Clone of baseDate
  let tmpDate = baseDate.value
  let tmpDaysArray = []
  const today = dayjs()
  for (let i = 0; i < 2; i++) {
    // Make day 1st
    tmpDate = tmpDate.date(1)
    const endOfMonth = tmpDate.endOf("month").date()
    let obj = { year: tmpDate.year(), month: tmpDate.month() + 1 }
    let days = []
    for (let j = 0; j < endOfMonth; j++) {
      let dateObj = { day: tmpDate.date(), dayOfWeek: tmpDate.day(), isHoliday: false, holidayLabel: "", isToday: false }
      if (today.year() === tmpDate.year() && today.month() === tmpDate.month() && today.date() === tmpDate.date()){
        dateObj.isToday = true
      }
      days.push(dateObj)
      // this date will be next month at the last loop
      tmpDate = tmpDate.add(1, "day")
    }
    obj.days = days
    tmpDaysArray.push(obj)
  }
  daysArray.value = tmpDaysArray
  console.log(daysArray.value)
}
function prevMonth(){
  console.log("prevMonth()")
  baseDate.value = baseDate.value.subtract(1, "month")
  updateMonthLabel()
  updateDaysArray()
}
function nextMonth(){
  console.log("nextMonth()")
  baseDate.value = baseDate.value.add(1, "month")
  updateMonthLabel()
  updateDaysArray()
}
function showOneMonth(){
  console.log("showOneMonth()")
  isTwoMonthMode.value = false
}
function showTwoMonths(){
  console.log("showTwoMonths()")
  isTwoMonthMode.value = true
}
function updateMonthLabel(){
  textThisMonth.value = baseDate.value.format("MMM YYYY")
  textNextMonth.value = baseDate.value.add(1, "month").format("MMM YYYY")
}

const isSettingOpened = ref(false)
const historyData = ref("")
function toggleSettings(){
  isSettingOpened.value = !isSettingOpened.value
}

function saveHistoryData(){

}
function addPreset2024US(){
  if (historyData.value !== "") {
    historyData.value += "\n"
  }
  historyData.value = historyData.value + `2024/01/01,New Year's Day
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
  if (historyData.value !== ""){
    historyData.value += "\n"
  }
  historyData.value = historyData.value + `2024/01/01,元日
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

</script>

<template>
  <div class="container px-5 py-5 md:py-10 mx-auto">
    <div class="flex items-center lg:w-4/5 mx-auto mb-10 sm:flex-row flex-col">

      <!-- Calendar container -->
      <div class="w-full">
        <div class="relative">
          <!-- Selected Days Info -->
          <div class="selected-days-info hidden">
            <div class=" text-center">
              <span class="flex justify-center">
                <div>2024/05/01 - 2024/05/09</div>
                <span class="tooltip ml-1 pt-1 flex justify-center">
                  <span class="tooltip-contents-copied">Copied</span>
                  <svg class="w-4 h-4 inline cursor-pointer js-clipboard-default flex-shrink-0 size-4"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  </svg>
                </span>
              </span>
              <span class="block">9 days (5 business days)</span>
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
            <div id="first-month">
              <!-- header -->
              <div class="flex mb-5 pt-1">
                <span class="text-xl md:text-2xl select-none">{{ textThisMonth }}</span>
              </div>
              <!-- calendar body -->
              <div>
                <!-- Weekdays -->
                <div
                  class="grid grid-cols-7 text-sm md:text-xl border-b border-gray-200 font-light mb-1 md:mb-3 select-none">
                  <span class="calendar-header">S<span class="hidden lg:inline">un</span></span>
                  <span class="calendar-header">M<span class="hidden lg:inline">on</span></span>
                  <span class="calendar-header">T<span class="hidden lg:inline">ue</span></span>
                  <span class="calendar-header">W<span class="hidden lg:inline">ed</span></span>
                  <span class="calendar-header">T<span class="hidden lg:inline">hu</span></span>
                  <span class="calendar-header">F<span class="hidden lg:inline">ri</span></span>
                  <span class="calendar-header">S<span class="hidden lg:inline">at</span></span>
                </div>
                <!-- days -->
                <div class="grid grid-cols-7 text-base md:text-xl">
                  <template v-for="item in daysArray[0].days[0].dayOfWeek">
                    <div class="relative">
                      <div class="calendar-cell"><span class=""></span></div>
                    </div>
                  </template>
                  <template v-for="item in daysArray[0].days">
                    <div class="relative">
                      <div class="calendar-cell"><span class="day ":class="{ today: item.isToday }">{{ item.day }}</span></div>
                    </div>
                  </template>

                </div>
              </div>
            </div>

            <!-- second month -->
            <div id="second-month" :class="{ 'hidden': !isTwoMonthMode }">
              <!-- header -->
              <div class="flex mb-5 pt-1">
                <span class="text-xl md:text-2xl select-none">{{ textNextMonth }}</span>
              </div>
              <!-- calendar body -->
              <div>
                <!-- Weekdays -->
                <div class="grid grid-cols-7 text-sm md:text-xl border-b border-gray-200 mb-1 md:mb-3 select-none">
                  <span class="calendar-header">S<span class="hidden lg:inline">un</span></span>
                  <span class="calendar-header">M<span class="hidden lg:inline">on</span></span>
                  <span class="calendar-header">T<span class="hidden lg:inline">ue</span></span>
                  <span class="calendar-header">W<span class="hidden lg:inline">ed</span></span>
                  <span class="calendar-header">T<span class="hidden lg:inline">hu</span></span>
                  <span class="calendar-header">F<span class="hidden lg:inline">ri</span></span>
                  <span class="calendar-header">S<span class="hidden lg:inline">at</span></span>
                </div>
                <!-- days -->
                <div class="grid grid-cols-7 text-base md:text-xl">
                  <template v-for="item in daysArray[1].days[0].dayOfWeek">
                    <div class="relative">
                      <div class="calendar-cell"><span class=""></span></div>
                    </div>
                  </template>
                  <template v-for="item in daysArray[1].days">
                    <div class="relative">
                      <div class="calendar-cell"><span class="day " :class="{ today: item.isToday }">{{ item.day }}</span></div>
                    </div>
                  </template>

                </div>
              </div>
            </div>
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
              <textarea v-model="historyData"
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
