<script setup>
defineProps(['date'])
</script>

<template>
    <div class="relative">
        <div class="calendar-cell">
            <span class="day" :class="{ today: date.isToday, holiday: date.isHoliday, tooltip: date.isHoliday }">
                {{ date.day }}
                <template v-if="date.isHoliday">
                    <span class="tooltip-contents">{{ date.holidayLabel }}</span>
                </template>
            </span>
        </div>
    </div>
</template>