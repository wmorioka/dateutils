<script setup>
import { ref } from 'vue'

const isSettingsOpened = ref(false)
function toggleSettings() {
    isSettingsOpened.value = !isSettingsOpened.value
}

defineProps([
    'isSaveTooltipVisible',
    'errors',
    'presets'
])

const holidaysCSVText = defineModel()

// It seems if I use defineModel(), I need to defineEmits explicitly.
defineEmits(['save', 'addPreset'])
</script>

<template>
    <div class="lg:w-4/5 mb-10 mx-auto">
        <div id="toggle-settings" class="cursor-pointer inline-block" @click="toggleSettings">
            <span class="text-indigo-500">{{ $t('calendar.settings.label') }}</span><svg id="settings-arrow-down"
                :class="{ hidden: isSettingsOpened }" class="inline-block fill-indigo-400 w-6 h-6" viewBox="0 0 24 24"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" />
            </svg><svg id="settings-arrow-up" :class="{ hidden: !isSettingsOpened }"
                class="inline-block fill-indigo-400 w-6 h-6" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18,15.5a1,1,0,0,1-.71-.29l-4.58-4.59a1,1,0,0,0-1.42,0L6.71,15.21a1,1,0,0,1-1.42-1.42L9.88,9.21a3.06,3.06,0,0,1,4.24,0l4.59,4.58a1,1,0,0,1,0,1.42A1,1,0,0,1,18,15.5Z" />
            </svg>
        </div>
        <div id="settings-container" class="py-2" :class="{ hidden: !isSettingsOpened }">
            <div class=" mb-3" v-html="$t('calendar.settings.description')"></div>
            <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">
                <div class="sm:col-span-3">
                    <label for="holidays-data" class="inline-block  mt-2.5 ">
                        {{ $t('calendar.settings.inputLabel') }}
                    </label>
                </div>

                <div class="sm:col-span-9">
                    <div class="sm:flex">
                        <textarea v-model="holidaysCSVText"
                            class="flex-1 w-full md:w-2/3 px-4 py-2 text-base placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            :class="{ error: errors.length > 0 }" id="holidays-data"
                            :placeholder="$t('calendar.settings.placeholder')" name="holidays-data" rows="7"
                            cols="40"></textarea>
                    </div>
                    <template v-for="error in errors">
                        <div class="text-red-500">
                            {{ error }}
                        </div>
                    </template>
                </div>
            </div>
            <div class="mb-6 mt-6 w-full text-center">
                <div class="flex justify-center tooltip">
                    <button type="button" @click="$emit('save')"
                        class="py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 focus:ring-indigo-500 text-white w-40 transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg">
                        {{ $t('calendar.settings.saveButtonLabel') }}
                    </button>
                    <span class="tooltip-contents-copied" :class="{ hidden: !isSaveTooltipVisible }">Saved</span>
                </div>
            </div>
            <div class=" mb-2">
                {{ $t('calendar.settings.presetDescription') }}
            </div>
            <div class=" mb-2">
                <template v-for="(value, key) in presets">
                    <button @click="$emit('addPreset', key)" class="text-indigo-500 block mb-2">{{ value.label
                        }}</button>
                </template>
            </div>
        </div>
    </div>
</template>