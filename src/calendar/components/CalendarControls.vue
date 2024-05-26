<script setup>
defineProps(['isTwoMonthsModeEnabled', 'datePickerMode'])
</script>

<template>
    <div class="calendar-controls">
        <div class="flex items-center">
            <template v-if="datePickerMode">
                <button type="button" title="Select now" @click="$emit('now')"
                    class="mr-2 py-0.5 px-1 border-2 border-indigo-500 text-indigo-600 bg-white hover:bg-gray-200 active:text-white active:bg-indigo-500 focus:ring-indigo-500 w-auto transition ease-in duration-200 text-center focus:outline-none rounded-lg text-sm">
                    Now
                </button>
            </template>
            <button type="button" class="calendar-prev-button" title="Show previous" @click="$emit('move', 'prev')">
                <svg class="fill-gray-500 w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10.6,12.71a1,1,0,0,1,0-1.42l4.59-4.58a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L9.19,9.88a3,3,0,0,0,0,4.24l4.59,4.59a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42Z" />
                </svg>
            </button>
            <button type="button" class="calendar-next-button" title="Show next" @click="$emit('move', 'next')">
                <svg class="fill-gray-500 w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z" />
                </svg>
            </button>
            <template v-if="!datePickerMode">
                <button id="switch-one" type="button" title="Show one month" @click="$emit('toggleMode', false)"
                    :class="{ 'switch-selected': !isTwoMonthsModeEnabled }"
                    class="w-full px-2 py-2 text-base font-medium text-black bg-white border-t border-b border-l rounded-l-md hover:bg-gray-100">
                    <svg class="stroke-gray-500" width="30" height="16" viewBox="0 0 30 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="2" width="26" height="20" rx="2" stroke-width="3" />
                    </svg>
                </button>
                <button id="switch-two" type="button" title="Show two months" @click="$emit('toggleMode', true)"
                    :class="{ 'switch-selected': isTwoMonthsModeEnabled }"
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
            </template>
        </div>
    </div>
</template>