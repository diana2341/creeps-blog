<template>
    
  <div class="current-story">
    <h1 class="curr-title">

{{ currStory.title }}
<v-btn :icon="true" variant="text" @click="read" v-if="!isReading">
  <v-icon color="white">mdi-play-circle</v-icon>
</v-btn>
<v-btn :icon="true" variant="text" @click="stopRead" v-if="isReading">
  <v-icon color="white">mdi-stop-circle</v-icon>
</v-btn>
</h1>
    <v-footer border class="data-container">
            <div class="inner-data">
                <div><i class="fa-solid fa-eye"></i> {{ currStory.views }}</div>
                <div><i class="fa-solid fa-star"></i> {{ currStory.rating }}</div>
                <div><i class="fa-solid fa-calendar-days"></i> {{ currStory.date }}</div>
                <div><i class="fa-solid fa-feather"></i> By {{ currStory.author }}</div>

            </div>
        </v-footer>
    <!-- <div :style="`background-image: url(${currStory.img})`" class="hero"> -->
    <div class="story-img">
      <img :src="currStory.img" />
    </div>
    <p class="curr-story-text">{{ currStory.story }}</p>
    <!-- commments coming soon -->
    <!-- <div v-for="comment in currStory.comment">
            <p>{{ comment }}</p>
        </div> -->
        <star-rating v-model="rating" border-color="none"></star-rating>

        <div class=tags>
        <div class="tag"  v-for="tag in currStory.tags" >
            {{ tag }}
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, beforeDestroy } from "vue";
import { useStoriesStore } from "~/store/stories";
import { storeToRefs } from "pinia";
import { useRoute } from "@nuxtjs/composition-api";
import {StarRating} from 'vue-rate-it';

const route = useRoute();

const storyStore = useStoriesStore();
const { fetchCurrStory } = storyStore;
const { currStory } = storeToRefs(storyStore);
const greetingSpeech = ref(new window.SpeechSynthesisUtterance());
const rating = ref();
const synth = ref(window.speechSynthesis);
const isReading = ref(false);
const voiceList = ref([])

onMounted(async () => {
  await fetchCurrStory(route.value.params.id);
  console.log(currStory.value, "??");
  listenForSpeechEvents();
  voiceList.value = synth.value.getVoices()
  rating.value = currStory.value.rating

});

const listenForSpeechEvents = () => {
    console.log('in here')
  greetingSpeech.value.onstart = () => {
    isReading.value = true;
    console.log('in here1')

  };

  greetingSpeech.value.onend = () => {
    isReading.value = false;
    console.log('in here2')

  };
};
const read = () => {
  // it should be 'craic', but it doesn't sound right
  greetingSpeech.value.text = `${currStory.value.story}`;
  greetingSpeech.value.voice = voiceList.value[7]
  console.log(synth.value,'synth.value')
  if(synth.value.paused){
    console.log('paused')
    synth.value.resume(greetingSpeech.value)
  }
  synth.value.speak(greetingSpeech.value);
 

//   11 33 17
};
const stopRead = () => {
   console.log(synth.value,'synth.value') 
   synth.value.cancel()
   isReading.value = false;
}
</script>

<style>
.current-story {
  color: white;;
  max-width: 900px;
  margin: auto
}
.hero {
  height: 500px;
  width: 100%;
}
.story-img img {
  float: left;
  width: 400px;
  height: 500px;
  background-size: cover;
  padding-right: 20px;
}
.curr-title {
  text-align: center;
  margin-bottom: 30px;
}
.curr-story-text {
  font-size: 20px;
  line-height: 35px;
  /* padding-top:35px */
}
.inner-data{
    display: flex;
    align-items: center;
    justify-content: center;
    gap:20px
}
.data-container{
    display: flex;
    justify-content: center;
    background: #fbfbfb2f!important;
    color: white!important;
    border-radius: 10px!important;
    max-width: 90%;
    margin:auto;
    margin-bottom: 40px;


}
.current-story .tags{
    justify-content: center;
    padding-top:50px
}
.vue-rate-it-rating-text{
    display: none
}
.vue-rate-it-rating{
    justify-content: center;
}
</style>
