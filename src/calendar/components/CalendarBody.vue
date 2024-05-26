<script setup>
import CalendarCell from './CalendarCell.vue'
import CalendarEmptyCell from './CalendarEmptyCell.vue'

const props = defineProps([
    'monthData',
    'isTwoMonthsModeEnabled',
    'isSecondMonth'
])
const emit = defineEmits(['onCellClick'])

function onCellClick(date) {
    emit('onCellClick', props.monthData.year, props.monthData.month, date)
}
</script>

<template>
    <div :class="{ 'hidden': isSecondMonth && !isTwoMonthsModeEnabled }">
        <!-- header -->
        <div class="calendar-header-container">
            <span class="calendar-header-title">{{ monthData.label }}</span>
        </div>
        <!-- calendar body -->
        <div>
            <!-- Weekdays -->
            <div class="calendar-weekdays">
                <span class="calendar-header">S<span class="calendar-header-small-letters">un</span></span>
                <span class="calendar-header">M<span class="calendar-header-small-letters">on</span></span>
                <span class="calendar-header">T<span class="calendar-header-small-letters">ue</span></span>
                <span class="calendar-header">W<span class="calendar-header-small-letters">ed</span></span>
                <span class="calendar-header">T<span class="calendar-header-small-letters">hu</span></span>
                <span class="calendar-header">F<span class="calendar-header-small-letters">ri</span></span>
                <span class="calendar-header">S<span class="calendar-header-small-letters">at</span></span>
            </div>
            <!-- days -->
            <div class="grid grid-cols-7 text-base md:text-xl">
                <CalendarEmptyCell v-for="_ in monthData.days[0].dayOfWeek" />
                <CalendarCell v-for="date in monthData.days" :date="date" @cell-click="onCellClick" />
            </div>
        </div>
    </div>
</template>