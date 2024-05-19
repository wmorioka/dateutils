<script setup>
import CalendarCell from './CalendarCell.vue'
import CalendarEmptyCell from './CalendarEmptyCell.vue'

const props = defineProps([
    'monthData',
    'isTwoMonthsModeEnabled',
    'isSecondMonth'
])
const emit = defineEmits(['cellClick'])

function cellClick(date) {
    emit('cellClick', props.monthData.year, props.monthData.month, date)
}
</script>

<template>
    <div :class="{ 'hidden': isSecondMonth && !isTwoMonthsModeEnabled }">
        <!-- header -->
        <div class="flex mb-5 pt-1">
            <span class="text-xl md:text-2xl select-none">{{ monthData.label }}</span>
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
                <CalendarEmptyCell v-for="_ in monthData.days[0].dayOfWeek" />
                <CalendarCell v-for="date in monthData.days" :date="date" @cell-click="cellClick" />
            </div>
        </div>
    </div>
</template>