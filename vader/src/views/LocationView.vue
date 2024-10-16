<script setup>
import { ref } from "vue"
// DETTA ÄR LOCATIONS SIDAN!

const location = ref({ name: "", position: { lat: 0, long: 0}, default: false})

const locationList = ref([
    { name: "Mariehamn", position: { lat: 60.0, long: 20.0 } , default: false },
    { name: "Stockholm", position: { lat: 59.32, long: 18.32 } , default: true },
    { name: "London", position: { lat: 51.5, long: -0.1 } , default: false },
    { name: "Cape town", position: { lat: -34, long: 18.5 } , default: false },
])

function Save() {
    locationList.value.push({ ...location.value })
    Reset()
}

function Reset() {
    location.value = { name: "", position: { lat: 0, long: 0 }, default: false }
}

function remove(loc)   {
    locationList.value = locationList.value.filter(item => item !== loc)
}

function setDefault(loc) {
    locationList.value.forEach(item => {
        item.default = (item === loc)
    })
}
</script>

<template>
    <h2>Locations</h2>
    <label>Namn: <input type="text" v-model="location.name" /></label>
    <label>Lat: <input type="number" max="90" min="-90" step=".1" size="5" v-model="location.position.lat" /></label>
    <label>Long: <input type="number" max="180" min="-180" step=".1" size="8"  v-model="location.position.long" /></label>
        <button @click="Save">Save</button>   <button @click="Reset">Reset</button>
        <hr>
        <h3>List</h3>
            <ul>
                <li v-for="loc in locationList" :key="loc" :class="loc.default ? 'default' : ''" @click="setDefault(loc)">
                    {{ loc.name }},
                    ( {{ Math.abs(loc.position.lat).toFixed(2) }}°{{ loc.position.lat > 0 ? 'N' : 'S' }}
                    {{ Math.abs(loc.position.long).toFixed(2) }}°{{ loc.position.long > 0 ? 'E' : 'W' }} )
                    <span class="raderaknapp" title="remove" @click="remove(loc)">❌</span>
                </li>
            </ul>
</template>

<style scoped>

.default {
    font-weight: bold;
}

label {
    display: block;
    width: 15em;
    padding-top: .5em;
}

.raderaknapp {
    font-weight: bold;
}
</style>