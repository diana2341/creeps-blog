<template>
  <div>
    <div class="app-name">Top 3 Stories</div>
    <div class="d-flex story-box">
      <div v-for="story in stories" class="story top">
        <div class="story-inner-card">
          <div>
            <NuxtLink :to="`/${story._id}`">
              <img :src="story.img" />
            </NuxtLink>
          </div>
          <div class="card-right">
            <div class="stars">
              <span v-for="star in renderStars(story.rating).full"
                ><i class="fa-solid fa-star"></i
              ></span>
              <span v-for="star in renderStars(story.rating).half"
                ><i class="fa-solid fa-star-half-stroke"></i
              ></span>
              <span v-for="star in renderStars(story.rating).empty"
                ><i class="fa-regular fa-star"></i
              ></span>
            </div>
            <NuxtLink :to="`/${story._id}`">
              <span class="story-title">{{ story.title }}</span>
            </NuxtLink>
            <NuxtLink :to="`/${story._id}`">
              <span class="story-text">{{
                story.story.substring(0, 250) + "..."
              }}</span>
            </NuxtLink>
            <div class="metadata">
              <div>
                <i class="fa-solid fa-clock"></i>
                {{ timeToRead(story.story) }}
              </div>
              <div><i class="fa-solid fa-eye"></i> {{ story.views }} Views</div>
              <div>
                <i class="fa-solid fa-comments"></i>
                {{ story?.comments?.length }} Comments
              </div>
            </div>

            <div class="tags">
              <div v-for="tag in story.tags" class="tag">
                {{ tag }}
              </div>
            </div>

            <div class="metadata">
              <span class="author"
                ><i class="fa-solid fa-feather"></i> {{ story.author }}</span
              >
              <span
                ><i class="fa-solid fa-calendar-days"></i>
                {{ dateFormatter(story.date) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStoriesStore } from "~/store/stories";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { timeToRead, dateFormatter } from "../utils/helpers";

const storiesStore = useStoriesStore();
const { getTopStories } = storiesStore;
const { topStories } = storeToRefs(storiesStore);
const stories = ref([]);
onMounted(async () => {
  await getTopStories();
  stories.value = topStories.value;
});
const renderStars = (rating) => {
  let stars = {};

  if (Number(rating) === rating && rating % 1 !== 0) {
    stars.half = 1;
    stars.full = Math.trunc(rating);
    stars.empty = rating >= 4 ? 0 : 5 - Math.trunc(rating) - stars.half;
  } else {
    stars.full = rating;
    stars.empty = rating !== 5 ? 5 - rating : 0;
  }
  return stars;
};
</script>
<style>
.top div {
  color: white;
}
.story {
  flex-grow: 1;
}
.top img {
  max-width: 500px;
  height: 200px;
  min-width: 300px;
}
.story-box {
  gap: 10px;
  /* justify-content: space-evenly; */
}
.metadata {
  display: flex;
  gap: 10px;
}
.story .story-title {
  font-size: 18px;
  font-weight: 600;
}
.card-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  position: relative;
}
</style>
