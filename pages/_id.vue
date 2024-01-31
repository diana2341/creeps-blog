<template>
  <div class="current-story" v-if="!loading">
    <h1 class="curr-title" v-if="!editMode">
      {{ currStory.title }}
      <v-btn
        :icon="true"
        variant="text"
        @click="read"
        v-if="!isReading && !editMode"
      >
        <v-icon color="white">mdi-play-circle</v-icon>
      </v-btn>
      <v-btn
        :icon="true"
        variant="text"
        @click="stopRead"
        v-if="isReading && !editMode"
      >
        <v-icon color="white">mdi-stop-circle</v-icon>
      </v-btn>
      <v-btn :icon="true" @click="editMode = !editMode">
        <v-icon color="white">mdi-pencil-box-multiple</v-icon>
      </v-btn>
    </h1>
    <h1 v-else>
      <v-text-field
        label="Edit Title"
        :auto-grow="true"
        :value="currStory.title"
        v-model="title"
      ></v-text-field>
    </h1>
    <v-footer border class="data-container" v-if="!editMode">
      <div class="inner-data">
        <div><i class="fa-solid fa-eye"></i> {{ currStory.views }}</div>
        <div><i class="fa-solid fa-star"></i> {{ currStory.rating }}</div>
        <div>
          <i class="fa-solid fa-calendar-days"></i> {{ formatDate(currStory.date) }}
        </div>
        <div><i class="fa-solid fa-feather"></i> By {{ currStory.author }}</div>
        <div v-if="currSingleStory">
          <i class="fa-solid fa-clock"></i> {{ timeToRead(currSingleStory) }}
        </div>
      </div>
    </v-footer>
    <!-- <div :style="`background-image: url(${currStory.img})`" class="hero"> -->
    <div class="story-img">
      <img :src="currStory.img" />
    </div>
    <p v-if="!editMode" class="curr-story-text">{{ currSingleStory }}</p>
    <v-textarea
      label="Edit Story"
      variant="outlined"
      rows="12"
      v-else
      v-model="currSingleStory"
    ></v-textarea>
    <star-rating
      v-model="rating"
      border-color="none"
      v-if="!editMode"
    ></star-rating>

    <div class="tags" v-if="!editMode">
      <div class="tag" v-for="tag in currStory.tags">
        {{ tag }}
      </div>
      <!-- commments coming soon -->
      <!-- <div v-for="comment in currStory.comment">
            <p>{{ comment }}</p>
        </div> -->
    </div>
    <div v-else>
      <v-select
        v-model="chosenTags"
        :items="tags"
        chips
        label="Edit Tags"
        multiple
        variant="outlined"
      ></v-select>
      <div class="d-flex justify-space-between">
        <v-btn size="large" v-if="editMode" @click="submitEdit"
          >Save Edits</v-btn
        >
        <v-btn size="large" v-if="editMode" @click="editMode = false"
          >Cancel</v-btn
        >
      </div>
    </div>
    <h1 class="comments" v-if="!editMode">No Comments Yet</h1>
  </div>
  <div v-else>Loading</div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useStoriesStore } from "~/store/stories";
import { storeToRefs } from "pinia";
import { useRoute } from "@nuxtjs/composition-api";
import { StarRating } from "vue-rate-it";
import { timeToRead } from "../utils/helpers";
import { useSnackbarStore } from "~/store/snackbar";
const route = useRoute();
const storyStore = useStoriesStore();
const { fetchCurrStory, updateStory } = storyStore;
const { currStory } = storeToRefs(storyStore);
const greetingSpeech = ref(new window.SpeechSynthesisUtterance());
const rating = ref();
const synth = ref(window.speechSynthesis);
const isReading = ref(false);
const voiceList = ref([]);
const loading = ref(false);
const editMode = ref(false);
const tags = ref([]);
const chosenTags = ref([]);
const currSingleStory = ref("");
const title = ref([]);
const snackbarStore = useSnackbarStore();
const { openSnackbar } = snackbarStore;
const formatDate = (date) =>{
  const today = new Date(date);
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

return    mm + '/' + dd  + '/' + yyyy;
}
onMounted(async () => {
  loading.value = true;
  await fetchCurrStory(route.value.params.id);
  loading.value = false;
  listenForSpeechEvents();
  voiceList.value = synth.value.getVoices();
  rating.value = currStory.value.rating;
  tags.value = currStory.value.tags;
  chosenTags.value = currStory.value.tags;
  title.value = currStory.value.title;
  currSingleStory.value = currStory.value.story;
});
watch(rating, async (newRating, oldRating) => {
  console.log(newRating, oldRating,'newRating, oldRating')
  if (oldRating!== undefined && oldRating !== newRating) {
    currStory.value.rating = newRating;
    await updateStory(route.value.params.id, currStory.value);
  }
});

const listenForSpeechEvents = () => {
  greetingSpeech.value.onstart = () => {
    isReading.value = true;
  };

  greetingSpeech.value.onend = () => {
    isReading.value = false;
  };
};
const read = () => {
  // it should be 'craic', but it doesn't sound right
  greetingSpeech.value.text = `${currStory.value.story}`;
  greetingSpeech.value.voice = voiceList.value[7];
  if (synth.value.paused) {
    synth.value.resume(greetingSpeech.value);
  }
  synth.value.speak(greetingSpeech.value);

  //   11 33 17
};
const stopRead = () => {
  synth.value.cancel();
  isReading.value = false;
};
const submitEdit = async () => {
  const story = currStory.value;
  if (
    story.title !== title.value ||
    story.tags !== chosenTags.value ||
    story.story !== currSingleStory.value
  ) {
    story.title = title.value;
    story.tags = chosenTags.value;
    story.story = currSingleStory.value;
    await updateStory(route.value.params.id, story);
    openSnackbar("Success!", "This story has been succesfully updated");
    editMode.value = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};
</script>

<style>
.current-story {
  color: white;
  max-width: 900px;
  margin: auto;
  min-height: 500px;

}
.hero {
  height: 500px;
  width: 100%;
}
.story-img img {
  /* float: left;
  width: 400px;
  height: 500px;
  background-size: cover;
  padding-right: 20px; */
  float: left;
  width: 400px; /* Set your desired width */
  height: 500px; /* Set your desired height */
  object-fit: cover;
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
.inner-data {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.data-container {
  display: flex;
  justify-content: center;
  background: #fbfbfb2f !important;
  color: white !important;
  border-radius: 10px !important;
  max-width: 90%;
  margin: auto;
  margin-bottom: 40px;
}
.current-story .tags {
  justify-content: center;
  padding-top: 50px;
}
.vue-rate-it-rating-text {
  display: none;
}
.vue-rate-it-rating {
  justify-content: center;
}
.comments {
  padding-top: 70px;
  padding-bottom: 70px;
  width: 100%;
  text-align: center;
  border: solid 1px;
  border-radius: 10px;
  margin-top: 160px;
}
.theme--light.v-input input,
.theme--light.v-input textarea {
  color: white !important;
  font-size: 20px !important;
  line-height: 35px !important;
  padding: 28px !important;
}
.v-label,
.primary--text {
  color: white !important;
}
textarea,
.v-select__selections,
.v-text-field__slot input {
  border: solid #aeaeae 1px !important;
  border-radius: 5px;
  padding: 10px !important;
  margin-top: 11px !important;
  text-align: center;
}
.v-chip {
  pointer-events: none;
}
</style>
