<script setup>
import { watch } from "vue";

const props = defineProps(["knappar", "reset"]);
const emit = defineEmits(["valdaKnappar"]);

watch(() => props.reset, () => {
  if (props.reset) {
    let buttons = document.getElementsByClassName("alternativ");
    for (let b of buttons) {
      b.classList.remove("spelarval");
      b.classList.remove("datorval");
      b.title = "";
    }
  }
});

function spelarval(e) {
  let buttons = document.getElementsByClassName("alternativ");
  for (let b of buttons) {
    b.classList.remove("spelarval");
  }
  e.target.classList.add("spelarval");
  emit("valdaKnappar", { spelare: e.target.getAttribute("data-value"), dator: datorval() });
}

function datorval() {
  let val = Math.floor(Math.random() * props.knappar.length);
  let buttons = document.getElementsByClassName("alternativ");

  for (let b of buttons) {
    b.classList.remove("datorval");
    b.title = "";

    if (b.getAttribute("data-value") === props.knappar[val]) {
      b.classList.add("datorval");
      b.title = "Datorns val";
    }
  }
  return props.knappar[val];
}
</script>

<template>
  <div class="knapprad">
    <button v-for="knapp in props.knappar" :key="knapp" @click="spelarval" 
    :class="['alternativ', knapp.toLowerCase()]" :data-value="knapp">
    </button>
  </div>
</template>

<style scoped>
.knapprad {
  display: flex;
  justify-content: center;
  gap: 1em;
}

button.alternativ {
  width: 80px; /* Justera storlek som behövs */
  height: 80px;
  background-size: cover;
  background-position: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

/* Bakgrundsbilder för varje knapp */
button.sten {
  background-image: url('@/assets/stone.png');
}

button.sax {
  background-image: url('@/assets/scissors.png');
}

button.påse {
  background-image: url('@/assets/paper.png');
}

/* Spelarens val - grön bakgrund */
button.spelarval {
  background-color: rgba(0, 218, 40, 0.3);
}

/* Datorns val - röd ram */
button.datorval {
  border: 3px solid red;
}
</style>
