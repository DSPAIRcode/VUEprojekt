<script setup>
import { ref } from "vue";
import KnappRad from "./components/KnappRad.vue";
import ResultatRad from "./components/ResultatRad.vue";
import PoangRad from "./components/PoangRad.vue";



const knappar = ref(["Sten", "Sax", "Påse"]);
const resultat = ref({})
const vinnare = ref("")
const reset = ref(true)

function hittaVinnare(valdaKnappar) {
  reset.value = false
  vinnare.value = ""
  console.log("ValdaKnappar:", valdaKnappar)
  let spelare = knappar.value.indexOf(valdaKnappar.spelare)
  let dator = knappar.value.indexOf(valdaKnappar.dator)
  resultat.value = { spelare: spelare, dator: dator }
}

function raknaPoang(v) {
  vinnare.value = v
}

</script>

<template>
  <header>
    <h1>Sten, sax, Påse!</h1>
  </header>

  <main>
    <KnappRad :knappar="knappar" :reset="reset" @valda-knappar="hittaVinnare" />
    <ResultatRad :valda-knappar="resultat" :reset="reset" @vinnare="raknaPoang" />
    <PoangRad :vinnare="vinnare" :reset="reset" />

    <div class="score">
      <button id="nolla" @click="reset = true">Nollställ Poäng</button>
    </div>

  </main>
</template>

<style scoped>
header  {
  text-align: center;
  margin-bottom: 1.2em;
}

button  {
  padding: .6em 1.2em;
  font-size: 1.2em;
  background-color: beige;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.knapprad {
  display: flex;
  justify-content: center;
  gap: .6em;
}

.resultat {
  font-size: 1.2em;
  text-align: center;
  margin: 1.2em 0;
}

.score  {
  font-size: 1.2em;
  text-align: center;
}

button:hover.alternativ {
  background-color: rgb(202, 202, 183);
}

button.spelarval {
  background-color: rgb(0, 218, 40);
}

#nolla {
  margin-top: 2em;
  padding: .3em .6em;
  font-size: .8em;
}
</style>
