<script setup>
import { ref, watch } from "vue";

const props = defineProps(["valdaKnappar", "reset"])
const emit = defineEmits(["vinnare"]) // Definierar emit för att skicka händelsen "vinnare"
const resultat = ref("Låt spelet börja!")

// övervakar props (valdaKnappar) och uppdaterar resultatet baserat på spelets regler
watch(props, () => {
    console.log("Resultatet har ändrats till:", props.valdaKnappar)
    if (props.valdaKnappar.spelare == props.valdaKnappar.dator) {
        resultat.value = "Oavgjort!"
    } else if (props.valdaKnappar.spelare % 2 == props.valdaKnappar.dator % 2)  {
        // samma paritet - högsta talet vinner
        if (props.valdaKnappar.spelare > props.valdaKnappar.dator)  {
            resultat.value = "Du vann!"
            emit("vinnare", "spelare")
        } else {
            resultat.value = "Datorn vann"
            emit("vinnare", "dator")
        }
    } else {
        // olika paritet - lägsta vinner
        if (props.valdaKnappar.spelare < props.valdaKnappar.dator) {
            resultat.value = "Du vann!"
            emit("vinnare", "spelare")
        } else {
            resultat.value = "Datorn vann"
            emit("vinnare", "dator")
        }
    }
})

watch(() => props.reset, () => {
    if (props.reset)    {
        resultat.value = "Låt spelet börja!"
    }
})

</script>
<template>
    <div class="resultat">
        <p id="resultat">{{ resultat }}</p>
    </div>
</template>
<style scoped></style>