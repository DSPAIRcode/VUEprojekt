<script setup>
// DETTA ÄR HOME SIDAN!!

//import CurrentResult from "@/components/icons/CurrentResult.vue";
import ForecastResult from "@/components/icons/forecastResult.vue";
import { getCurrentWeather, getForecast } from "@/forecastService";
import { ref, watchEffect } from "vue";

const currentLocation = ref({ lat: 60.0, long: 20.0, name: "Nuvarande Position" })
const info = ref({})
const currentinfo = ref({})
const props = defineProps(["location"])

watchEffect(() => {
    let locationList = JSON.parse(localStorage.getItem("locations"))
    if (props.location) {
        currentLocation.value = locationList.find(loc => {
            return loc.name.toLocaleLowerCase() === props.location.toLocaleLowerCase()
     })
    } else {
        currentLocation.value = locationList.find(loc => {
            return loc.default
        })
    }

    // hämtar väder-data om det finns en gilig plats
    if (currentLocation.value)  {
        getForecast(currentLocation.value)
    .then(response => {
        info.value = response
    })
    .catch(err => {
        console.log(err)
    })

    }

        if (currentLocation.value)  {
            getCurrentWeather(currentLocation.value)
        .then(response => {
            currentinfo.value = response
        })
        .catch(err => {
            console.log(err)
        })

        }
    
})
</script>

<template>
    <template v-if="!currentLocation">
        <h2>Angiven plats saknas</h2>
        <p>{{ props.location }} finns inte i listan över platser</p>
    </template>
    <template v-else>
    <h2>{{ currentLocation.name }}</h2>
    <p class="location">Lat: <span>{{ currentLocation.position.lat.toFixed(3) }}</span></p>
    <p class="location">long: <span>{{ currentLocation.position.long.toFixed(3) }}</span></p>
    <ForecastResult :forecast="info" />
    </template>
</template>

<style scoped>
.location {
    display: inline-block;
    margin: 0 1em;
}
</style>