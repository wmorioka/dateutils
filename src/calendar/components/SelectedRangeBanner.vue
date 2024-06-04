<script setup>
defineProps([
    'isSelectedRangeBannerVisible',
    'isCopyTooltipVisible',
    'label',
    'days',
    'businessDays'
])
</script>

<template>
    <div class="selected-days-info" :class="{ 'hidden': !isSelectedRangeBannerVisible }">
        <div class="p-3 px-10 text-center relative">
            <span class="flex justify-center">
                <div>{{ label }}</div>
                <span class="tooltip ml-1 pt-1 flex justify-center">
                    <span class="tooltip-contents-copied" :class="{ 'hidden': !isCopyTooltipVisible }">Copied</span>
                    <svg @click="$emit('copy')"
                        class="w-4 h-4 inline cursor-pointer js-clipboard-default flex-shrink-0 size-4 hover:stroke-indigo-500"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    </svg>
                </span>
            </span>
            <span class="block">
                {{ $t('calendar.selectedRange.day', days) }} ({{ $t('calendar.selectedRange.businessDay',
                businessDays) }})
            </span>
            <!-- close button -->
            <button :title="$t('calendar.selectedRange.close')" class="absolute right-1 top-1" @click="$emit('close')">
                <svg class="w-6 h-6 inline cursor-pointer flex-shrink-0 size-4" viewBox="0 0 24 24">
                    <path
                        d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z" />
                </svg>
            </button>
        </div>
    </div>
</template>