<template>
  <v-app >
    <v-main>
      <Navbar />
      <v-snackbar
      v-model="showSnackbar"
      vertical
    >
      <div class="text-subtitle-1 pb-2">{{snackbarTitle}}</div>

      <p>{{ snackbarInfo }}</p>

      <template v-slot:actions>
        <v-btn
          color="indigo"
          variant="text"
          @click="closeSnackbar"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useSnackbarStore } from '~/store/snackbar'
import { storeToRefs } from 'pinia';

const snackbarStore = useSnackbarStore()
const { openSnackbar, closeSnackbar} = snackbarStore
const { showSnackbar, snackbarInfo, snackbarTitle } = storeToRefs(snackbarStore)
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
