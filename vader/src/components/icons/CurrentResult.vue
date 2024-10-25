<!-- CurrentWeather.vue -->
<script setup>
import { ref } from "vue";
import wc from "@/assets/data/weatherCodes.json";

const weatherCodes = ref(wc);
const props = defineProps(["currentWeatherData"]);

function getDescription(code) {
    return weatherCodes.value.find(item => item.code == code)?.description || "Unknown";
}
</script>

<template>
    {{ props.currentWeatherData }}

    <blockquote>.</blockquote>
    <ul>
        <li>Weather:</li>
        <li>Temperature:</li>
        <li>Condition:</li>
        <li>Wind:</li>
    </ul>
    <ul v-if="props.currentWeatherData">
        <li> {{ props.currentWeatherData.current.temp_c }}</li>
        <li> {{ props.currentWeatherData.temp }}°{{ props.currentWeatherData.unit }}</li>
        <li> {{ getDescription(props.currentWeatherData.code) }}</li>
        <li> {{ props.current.wind_kph }} {{ props.currentWeatherData.windUnit }}</li>
    </ul>
</template>

<style scoped>
</style>
