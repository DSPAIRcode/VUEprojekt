<script setup>
import { ref } from "vue";
import KnappRad from "../components/KnappRad.vue";
import ResultatRad from "../components/ResultatRad.vue";
import PoangRad from "../components/PoangRad.vue";
  
  const knappar = ref(["Sten", "Sax", "Påse"]);
  const resultat = ref({});
  const vinnare = ref("");
  const reset = ref(true);
  
  function hittaVinnare(valdaKnappar) {
    reset.value = false;
    vinnare.value = "";
    let spelare = knappar.value.indexOf(valdaKnappar.spelare);
    let dator = knappar.value.indexOf(valdaKnappar.dator);
    resultat.value = { spelare: spelare, dator: dator };
  }
  
  function raknaPoang(v) {
    vinnare.value = v;
  }
  
  function resetSpelet() {
    reset.value = true;
  }
</script>

<template>
    <div>
      <header>
      </header>
      <main>
        <KnappRad :knappar="knappar" :reset="reset" @valda-knappar="hittaVinnare" />
        <ResultatRad :valda-knappar="resultat" :reset="reset" @vinnare="raknaPoang" />
        <PoangRad :vinnare="vinnare" :reset="reset" />
  
        <div class="score">
          <button id="nolla" @click="resetSpelet">Nollställ Poäng</button>
        </div>
      </main>
    </div>
</template>
  
<style scoped>
  
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
    background-color: rgb(255, 255, 255);
  }
  
  button.spelarval {
    background-color: rgb(0, 218, 40);
  }
  
  #nolla {
    margin-top: 2em;
    padding: .3em .6em;
    font-size: .8em;
    background-color: white;
  }

  #nolla:hover {
    background-color: rgb(189, 255, 211);
    transition: 1s;
  }
</style>
  