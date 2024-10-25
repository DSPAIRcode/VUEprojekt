<script setup>
import router from "@/router";
import { getPosition } from "@/services/positioningService";
import { onMounted, ref } from "vue"
// DETTA ÄR LOCATIONS SIDAN!

onMounted(() => {
    locationList.value = JSON.parse(localStorage.getItem("locations"))

    let current = locationList.value.find(loc => {
        return loc.name === "Current location"
    })
    if (!current) {
        current = { name: "Current location",
            position: { lat: 0, long: 0 }, default: false }
        locationList.value.unshift(current)
    }

    getPosition()
        .then(response => {
            current.position = response.position
            let index = locationList.value.findIndex(loc => {
                return loc.name === "Current location"
            })
            locationList.value.splice(index, 1, current);
        })
        .catch(eer => {
            let index = locationList.value.findIndex(loc => {
                return loc.name === "Current position"
            })
            locationList.value.splice(index, 1);
            console.log(eer)
        })
})

const location = ref({ name: "", position: { lat: 0, long: 0}, default: false})
const locationList = ref([])

function Save() {
    locationList.value.push({ ...location.value })
    Reset()

    localStorage.setItem("locations", JSON.stringify(locationList.value))
}

function Reset() {
    location.value = { name: "", position: { lat: 0, long: 0 }, default: false }
}

function remove(loc)   {
    locationList.value = locationList.value.filter(item => item !== loc)

    localStorage.setItem("locations", JSON.stringify(locationList.value))
}

function setDefault(loc) {
    locationList.value.forEach(item => {
        item.default = (item === loc)
    })
    localStorage.setItem("locations", JSON.stringify(locationList.value))
    router.push(`/forecast/${loc.name}`)
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
                    <span v-show="loc.name !== 'Current location'" class="raderaknapp" title="remove" @click="remove(loc)">❌</span>
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