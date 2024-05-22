<script setup>
import { ref } from 'vue'
import Multiselect from 'vue-multiselect'
import { timezones } from '../lib/timezones'
import { createTimezoneData, saveTimezoneIDs, getTimezoneIDs } from './lib/timezoneTableFunctions'

const options = ref([])
const selectedOption = ref()
const isDeleteButtonsVisible = ref(false)
const selectedTimezoneIDs = ref([])
const timezoneData = ref([])

init()

function init(){
    options.value = []
    for (const id in timezones) {
        if (Object.hasOwnProperty.call(timezones, id)) {
            const element = timezones[id];
            const label = `(UTC${element['offset']}) ${element['name']}(${element['abbreviation']}) - ${element['location']}`
            options.value.push({ id: id, label: label })
        }
    }
    selectedTimezoneIDs.value = getTimezoneIDs()
    updateTimezoneData()
}
function updateTimezoneData() {
    timezoneData.value = createTimezoneData(selectedTimezoneIDs.value)
}
/**
 * Add a timezone to table
 */
function addTimezone(){
    if (selectedOption.value === undefined
     || selectedTimezoneIDs.value.indexOf(selectedOption.value.id) > -1) {
        return false
    }
    console.log('selected option =', selectedOption.value.id)
    selectedTimezoneIDs.value.push(selectedOption.value.id)
    console.log(selectedTimezoneIDs.value)
    updateTimezoneData()
    saveTimezoneIDs(selectedTimezoneIDs.value)
}
function deleteTimezone(id){
    const index = selectedTimezoneIDs.value.indexOf(id)
    if (index > -1) {
        selectedTimezoneIDs.value.splice(index, 1)
    }
    console.log(selectedTimezoneIDs.value)
    updateTimezoneData()
    saveTimezoneIDs(selectedTimezoneIDs.value)
}
/**
 * Toggle delete buttons visibility
 */
function toggleDeleteButtons(){
    isDeleteButtonsVisible.value = !isDeleteButtonsVisible.value
}

</script>

<template>
    <div class="container px-5 py-5 md:py-10 mx-auto">
        <div class="flex items-center lg:w-4/5 mx-auto mb-5 flex-row justify-between">
            <!-- Controls -->

            <div class="flex">
                <multiselect v-model="selectedOption" track-by="label" label="label" placeholder="Select one"
                    :allow-empty="false" :options="options" deselect-label="">
                </multiselect>

                <button @click="addTimezone" type="button"
                    class="ml-2 py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 focus:ring-indigo-500 text-white w-full md:w-20 transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg">
                    Add
                </button>
            </div>
            <div>
                <button id="button-edit" class="text-indigo-500" @click="toggleDeleteButtons"
                    :class="{ hidden: isDeleteButtonsVisible }">
                    Edit
                </button>
                <button id="button-done" class="text-indigo-500" @click="toggleDeleteButtons"
                    :class="{ hidden: !isDeleteButtonsVisible }">
                    Done
                </button>
            </div>
        </div>
        <div class="flex items-center lg:w-4/5 mx-auto mb-10 flex-row">
            <!-- Timezone Table -->
            <div class="overflow-x-auto">
                <table>
                    <tbody>
                        <tr class="delete-button-row" :class="{ hidden: !isDeleteButtonsVisible }">
                            <template v-for="tz in timezoneData">
                                <th class="timezone-delete-button-cell">
                                    <button class="delete-button inline cursor-pointer" @click="deleteTimezone(tz.id)">
                                        <svg class="fill-du_red inline" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24" width="24" height="24">
                                            <path
                                                d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm5,13H7v-2h10v2Z" />
                                        </svg>
                                    </button>
                                </th>
                            </template>
                        </tr>
                    </tbody>
                </table>
                <table class="relative">
                    <thead>
                        <tr id="current-time" class="absolute w-full h-0.5 top-32 bg-du_red">
                            <td colspan="5" class="hidden"></td>
                        </tr>
                        <tr>
                            <template v-for="tz in timezoneData">
                                <th class="timezone-header-cell">{{ tz.zoneInfo.offset }}</th>
                            </template>
                        </tr>
                        <tr>
                            <template v-for="tz in timezoneData">
                                <th class="timezone-header-cell">
                                    <span :title="tz.zoneInfo.name">{{ tz.zoneInfo.abbreviation }}</span>
                                </th>
                            </template>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="i in 24">
                            <tr>
                                <template v-for="tz in timezoneData">
                                    <td class="timezone-cell" :class="tz.table[i - 1]['class']">{{tz.table[i -
                                        1]['label']}}</td>
                                </template>
                            </tr>
                        </template>


                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<style src="../assets/vue-multiselect.css"></style>
