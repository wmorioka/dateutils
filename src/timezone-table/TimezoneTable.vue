<script setup>
import { ref } from 'vue'
import Multiselect from 'vue-multiselect'
import { timezones } from '../lib/timezones.js'

const options = ref([])
const selectedTimezone = ref()
init()

function init(){
    options.value = []
    for (const key in timezones) {
        if (Object.hasOwnProperty.call(timezones, key)) {
            const element = timezones[key];
            const label = `(UTC${element['offset']}) ${element['name']}(${element['abbreviation']}) - ${element['location']}`
            options.value.push({ key: key, label: label })
        }
    }
    console.log(options.value)
}

function select(option){
    console.log(option)

}

</script>

<template>
    <div class="container px-5 py-5 md:py-10 mx-auto">
        <div class="flex items-center lg:w-4/5 mx-auto mb-5 flex-row justify-between">
            <!-- Controls -->

            <div class="flex">
                <multiselect v-model="selectedTimezone" track-by="label" label="label" placeholder="Select one"
                    :allow-empty="false" :options="options" deselect-label="" @select="select">
                </multiselect>

                <button id="button-add" type="button"
                    class="ml-2 py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 focus:ring-indigo-500 text-white w-full md:w-20 transition ease-in duration-200 text-center text-base shadow-md focus:outline-none rounded-lg">
                    Add
                </button>
            </div>
            <div>
                <button id="button-edit" class="text-indigo-500">
                    Edit
                </button>
                <button id="button-done" class="hidden text-indigo-500">
                    Done
                </button>
            </div>
        </div>
        <div class="flex items-center lg:w-4/5 mx-auto mb-10 flex-row">
            <!-- Timezone Table -->
            <div class="overflow-x-auto">
                <table>
                    <tbody>
                        <tr class="delete-button-row hidden">
                            <th class="timezone-delete-button-cell">
                                <button id="delete-1" class="delete-button inline cursor-pointer">
                                    <svg class="fill-du_red inline" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" width="24" height="24">
                                        <path
                                            d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm5,13H7v-2h10v2Z" />
                                    </svg>
                                </button>
                            </th>
                            <th class="timezone-delete-button-cell">
                                <button id="delete-2" class="delete-button inline cursor-pointer">
                                    <svg class="fill-du_red inline" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" width="24" height="24">
                                        <path
                                            d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm5,13H7v-2h10v2Z" />
                                    </svg>
                                </button>
                            </th>
                            <th class="timezone-delete-button-cell">
                                <button id="delete-3" class="delete-button inline cursor-pointer">
                                    <svg class="fill-du_red inline" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" width="24" height="24">
                                        <path
                                            d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm5,13H7v-2h10v2Z" />
                                    </svg>
                                </button>
                            </th>
                            <th class="timezone-delete-button-cell">
                                <button id="delete-4" class="delete-button inline cursor-pointer">
                                    <svg class="fill-du_red inline" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" width="24" height="24">
                                        <path
                                            d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm5,13H7v-2h10v2Z" />
                                    </svg>
                                </button>
                            </th>
                            <th class="timezone-delete-button-cell">
                                <button id="delete-5" class="delete-button inline cursor-pointer">
                                    <svg class="fill-du_red inline" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24" width="24" height="24">
                                        <path
                                            d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm5,13H7v-2h10v2Z" />
                                    </svg>
                                </button>
                            </th>
                        </tr>

                    </tbody>
                </table>
                <table class="relative">
                    <thead>
                        <tr id="current-time" class="absolute w-full h-0.5 top-32 bg-du_red">
                            <td colspan="5" class="hidden"></td>
                        </tr>
                        <tr>
                            <th class="timezone-header-cell">-8:00</th>
                            <th class="timezone-header-cell">-5:00</th>
                            <th class="timezone-header-cell">+0:00</th>
                            <th class="timezone-header-cell">+5:30</th>
                            <th class="timezone-header-cell">+9:00</th>
                        </tr>
                        <tr>
                            <th class="timezone-header-cell">PST</th>
                            <th class="timezone-header-cell">EST</th>
                            <th class="timezone-header-cell">GMT</th>
                            <th class="timezone-header-cell">IST</th>
                            <th class="timezone-header-cell">JST</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="timezone-cell">16:00</td>
                            <td class="timezone-cell bg-slate-300">19:00</td>
                            <td class="timezone-cell bg-slate-800 text-white">0:00</td>
                            <td class="timezone-cell bg-slate-300">5:30</td>
                            <td class="timezone-cell">9:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-100">17:00</td>
                            <td class="timezone-cell bg-slate-400 text-white">20:00</td>
                            <td class="timezone-cell bg-slate-700 text-white">1:00</td>
                            <td class="timezone-cell bg-slate-200">6:30</td>
                            <td class="timezone-cell">10:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-200">18:00</td>
                            <td class="timezone-cell bg-slate-500 text-white">21:00</td>
                            <td class="timezone-cell bg-slate-600 text-white">2:00</td>
                            <td class="timezone-cell bg-slate-100">7:30</td>
                            <td class="timezone-cell">11:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-300">19:00</td>
                            <td class="timezone-cell bg-slate-600 text-white">22:00</td>
                            <td class="timezone-cell bg-slate-500 text-white">3:00</td>
                            <td class="timezone-cell">8:30</td>
                            <td class="timezone-cell">12:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-400 text-white">20:00</td>
                            <td class="timezone-cell bg-slate-700 text-white">23:00</td>
                            <td class="timezone-cell bg-slate-400 text-white">4:00</td>
                            <td class="timezone-cell">9:30</td>
                            <td class="timezone-cell">13:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-500 text-white">21:00</td>
                            <td class="timezone-cell bg-slate-800 text-white">0:00</td>
                            <td class="timezone-cell bg-slate-300">5:00</td>
                            <td class="timezone-cell">10:30</td>
                            <td class="timezone-cell">14:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-600 text-white">22:00</td>
                            <td class="timezone-cell bg-slate-700 text-white">1:00</td>
                            <td class="timezone-cell bg-slate-200">6:00</td>
                            <td class="timezone-cell">11:30</td>
                            <td class="timezone-cell">15:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-700 text-white">23:00</td>
                            <td class="timezone-cell bg-slate-600 text-white">2:00</td>
                            <td class="timezone-cell bg-slate-100">7:00</td>
                            <td class="timezone-cell">12:30</td>
                            <td class="timezone-cell">16:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-800 text-white">0:00</td>
                            <td class="timezone-cell bg-slate-500 text-white">3:00</td>
                            <td class="timezone-cell">8:00</td>
                            <td class="timezone-cell">13:30</td>
                            <td class="timezone-cell bg-slate-100">17:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-700 text-white">1:00</td>
                            <td class="timezone-cell bg-slate-400 text-white">4:00</td>
                            <td class="timezone-cell">9:00</td>
                            <td class="timezone-cell">14:30</td>
                            <td class="timezone-cell bg-slate-200 ">18:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-600 text-white">2:00</td>
                            <td class="timezone-cell bg-slate-300">5:00</td>
                            <td class="timezone-cell">10:00</td>
                            <td class="timezone-cell">15:30</td>
                            <td class="timezone-cell bg-slate-300 ">19:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-500 text-white">3:00</td>
                            <td class="timezone-cell bg-slate-200">6:00</td>
                            <td class="timezone-cell">11:00</td>
                            <td class="timezone-cell">16:30</td>
                            <td class="timezone-cell bg-slate-400 text-white">20:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-400 text-white">4:00</td>
                            <td class="timezone-cell bg-slate-100">7:00</td>
                            <td class="timezone-cell">12:00</td>
                            <td class="timezone-cell bg-slate-100">17:30</td>
                            <td class="timezone-cell bg-slate-500 text-white">21:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-300">5:00</td>
                            <td class="timezone-cell">8:00</td>
                            <td class="timezone-cell">13:00</td>
                            <td class="timezone-cell bg-slate-200">18:30</td>
                            <td class="timezone-cell bg-slate-600 text-white">22:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-200">6:00</td>
                            <td class="timezone-cell">9:00</td>
                            <td class="timezone-cell">14:00</td>
                            <td class="timezone-cell bg-slate-300">19:30</td>
                            <td class="timezone-cell bg-slate-700 text-white">23:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell bg-slate-100">7:00</td>
                            <td class="timezone-cell">10:00</td>
                            <td class="timezone-cell">15:00</td>
                            <td class="timezone-cell bg-slate-400 text-white">20:30</td>
                            <td class="timezone-cell bg-slate-800 text-white">0:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell">8:00</td>
                            <td class="timezone-cell">11:00</td>
                            <td class="timezone-cell">16:00</td>
                            <td class="timezone-cell bg-slate-500 text-white">21:30</td>
                            <td class="timezone-cell bg-slate-700 text-white">1:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell">9:00</td>
                            <td class="timezone-cell">12:00</td>
                            <td class="timezone-cell bg-slate-100">17:00</td>
                            <td class="timezone-cell bg-slate-600 text-white">22:30</td>
                            <td class="timezone-cell bg-slate-600 text-white">2:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell">10:00</td>
                            <td class="timezone-cell">13:00</td>
                            <td class="timezone-cell bg-slate-200">18:00</td>
                            <td class="timezone-cell bg-slate-700 text-white">23:30</td>
                            <td class="timezone-cell bg-slate-500 text-white">3:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell">11:00</td>
                            <td class="timezone-cell">14:00</td>
                            <td class="timezone-cell bg-slate-300">19:00</td>
                            <td class="timezone-cell bg-slate-800 text-white">0:30</td>
                            <td class="timezone-cell bg-slate-400 text-white">4:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell">12:00</td>
                            <td class="timezone-cell">15:00</td>
                            <td class="timezone-cell bg-slate-400 text-white">20:00</td>
                            <td class="timezone-cell bg-slate-700 text-white">1:30</td>
                            <td class="timezone-cell bg-slate-300 ">5:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell">13:00</td>
                            <td class="timezone-cell">16:00</td>
                            <td class="timezone-cell bg-slate-500 text-white">21:00</td>
                            <td class="timezone-cell bg-slate-600 text-white">2:30</td>
                            <td class="timezone-cell bg-slate-200 ">6:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell">14:00</td>
                            <td class="timezone-cell bg-slate-100">17:00</td>
                            <td class="timezone-cell bg-slate-600 text-white">22:00</td>
                            <td class="timezone-cell bg-slate-500 text-white">3:30</td>
                            <td class="timezone-cell bg-slate-100">7:00</td>
                        </tr>
                        <tr>
                            <td class="timezone-cell">15:00</td>
                            <td class="timezone-cell bg-slate-200">18:00</td>
                            <td class="timezone-cell bg-slate-700 text-white">23:00</td>
                            <td class="timezone-cell bg-slate-400 text-white">4:30</td>
                            <td class="timezone-cell">8:00</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<style src="../assets/vue-multiselect.css"></style>
