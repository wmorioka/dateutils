<script setup>
defineProps(['date'])
</script>

<template>
    <div class="relative">
        <div class="calendar-cell">
            <span class="day" @click="$emit('cellClick', date.day)"
                :class="{ today: date.isToday, holiday: date.isHoliday, tooltip: date.isHoliday }">
                {{ date.day }}
                <template v-if="date.isHoliday">
                    <span class="tooltip-contents">{{ date.holidayLabel }}</span>
                </template>
            </span>
        </div>
        <template v-if="date.isSelected">
            <div class="select-container" :class="date.selectedClass"></div>
        </template>
    </div>
</template>