<template>
  <v-form @submit.prevent="submit" class="sub-form">
    <h1 class="sub-title">Submit your Story</h1>
    <v-text-field
      v-model="image"
      variant="outlined"
      placeholder="Paste image URL"
    ></v-text-field>
    <v-text-field
      v-model="title"
      :counter="10"
      variant="outlined"
      placeholder="title"
    ></v-text-field>
    <v-textarea v-model="story" placeholder="story"></v-textarea>
    <v-select
      v-model="selectedTags"
      chips
      :items="tags"
      placeholder="Select"
      multiple
    ></v-select>

    <v-btn class="me-4" type="submit"> submit </v-btn>
  </v-form>
</template>
<script setup>
import { ref } from "vue";
import  { useStoriesStore } from "~/store/stories"
import { useRouter } from '@nuxtjs/composition-api';

const $router = useRouter();

const storiesStore = useStoriesStore()
const { createStory } = storiesStore
const title = ref("");
const story = ref("");
const selectedTags = ref([]);
const tags = ref([
    
  "#Creepypasta",
  "#HorrorStories",
  "#CreepyTales",
  "#ScaryStories",
  "#DarkFiction",
  "#HauntedNarratives",
  "#ChillingTales",
  "#NightmareFuel",
  "#EerieEncounters",
  "#GothicHorror",
  "#SpookyReads",
  "#SupernaturalStories",
  "#CreepyCharacters",
  "#FearfulFables",
  "#GhostlyNarratives",
  "#SinisterStories",
  "#CreepyWriting",
]);
const image = ref(null)
const submit = async () => {
  const singleStory = {
    title:title.value,
    author:"anonymous",
    img: image.value,
    story: story.value,
    tags: selectedTags.value
  }
 const newStory = await createStory(singleStory)
 console.log(newStory,'newStory')
 $router.push(`/${newStory._id}`)
};
</script>
<style >
.sub-form input:not(.v-select__slot input),
.sub-form textarea,
.sub-form .v-select__slot,
.img-file .v-input__slot{
  background-color: rgba(255, 255, 255, 0.302);
  padding: 20px;
  padding-left: 10px;
  border-radius: 10px;
  color:white
}
.img-file .v-input__slot{
    padding:10px;
    font-size: 14px;

}
.mdi-camera {
    color: white!important;;
}
.sub-title {
  color: rgb(174, 3, 3);
}
.sub-form .v-chip {
  pointer-events: none;
}
label {
  padding-left: 10px!important;
  color: white!important;
  padding-bottom: 10px;
}
.v-file-input .v-input__prepend-outer{
    display: none;
}
.theme--light.v-text-field > .v-input__control > .v-input__slot:before{
    border: none!important;
}
.v-file-input__text{
    color: white !important;
}
textarea{
    color: white !important;
}
input::placeholder, textarea::placeholder{
    color: white!important;
}
</style>
