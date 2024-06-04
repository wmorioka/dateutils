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
            <span class="calendar-header-title">{{ monthData.labelDate.format($t('calendar.headerLabelFormat')) }}</span>
        </div>
        <!-- calendar body -->
        <div>
            <!-- Weekdays -->
            <div class="calendar-weekdays">
                <span class="calendar-header">
                    {{ $t('calendar.weekdays.sunday') }}<span class="calendar-header-small-letters">{{ $t('calendar.weekdaysSmallLetters.sunday') }}</span>
                </span>
                <span class="calendar-header">
                    {{ $t('calendar.weekdays.monday') }}<span class="calendar-header-small-letters">{{ $t('calendar.weekdaysSmallLetters.monday') }}</span>
                </span>
                <span class="calendar-header">
                    {{ $t('calendar.weekdays.tuesday') }}<span class="calendar-header-small-letters">{{ $t('calendar.weekdaysSmallLetters.tuesday') }}</span>
                </span>
                <span class="calendar-header">
                    {{ $t('calendar.weekdays.wednesday') }}<span class="calendar-header-small-letters">{{ $t('calendar.weekdaysSmallLetters.wednesday') }}</span>
                </span>
                <span class="calendar-header">
                    {{ $t('calendar.weekdays.thursday') }}<span class="calendar-header-small-letters">{{ $t('calendar.weekdaysSmallLetters.thursday') }}</span>
                </span>
                <span class="calendar-header">
                    {{ $t('calendar.weekdays.friday') }}<span class="calendar-header-small-letters">{{ $t('calendar.weekdaysSmallLetters.sunday') }}</span>
                </span>
                <span class="calendar-header">
                    {{ $t('calendar.weekdays.saturday') }}<span class="calendar-header-small-letters">{{ $t('calendar.weekdaysSmallLetters.saturday') }}</span>
                </span>
            </div>
            <!-- days -->
            <div class="grid grid-cols-7 text-base md:text-xl" data-test="days">
                <CalendarEmptyCell v-for="_ in monthData.days[0].dayOfWeek" />
                <CalendarCell v-for="date in monthData.days" :date="date" @cell-click="onCellClick" />
            </div>
        </div>
    </div>
</template>