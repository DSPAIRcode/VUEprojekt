<script setup>
import { ref, watch } from 'vue';

const props = defineProps(["vinnare", "reset"]);
const score = ref({ spelare: 0, dator: 0});

// Första watch: övervakar props (specifikt vinnare) och uppdaterar poängen
watch(props, () => {
    if (props.vinnare == "spelare") {
        // Om vinnare är "spelare" ökas spelarens poäng med 1
        score.value.spelare++
    } else if(props.vinnare==="dator") {
        // Om vinnare är "dator" ökas datorns poäng med 1
        score.value.dator++
    }
})

// Andra watch: övervakar props.reset och återställer poängen vid omstart
watch(() => props.reset, () => {
    if (props.reset) {
        // Om reset är sant, återställs poängen för både spelare och dator till 0
        score.value.spelare = 0
        score.value.dator = 0
    }
})
</script>

<template>
    <div class="score">
        <p>
            <span id="player-score">{{ score.spelare }}</span> - 
            <span id="computer-score">{{ score.dator }}</span>
        </p>
    </div>
</template>

<style scoped>
#player-score {
  color: rgb(126, 255, 126);
}

#computer-score {
  color: rgb(255, 0, 0);
}

.score {
  font-size: 1.5em;
  text-align: center;
}
</style>
