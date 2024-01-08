<template>
  <v-app >
    <v-main>
      <Navbar />
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const synth = ref(window.speechSynthesis);

onMounted(() => {
    synth.value.cancel()
})
</script>
<style>
.theme--light.v-application{
  background: transparent;
}
</style>
