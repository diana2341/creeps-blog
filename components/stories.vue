<template>
  <div>
    <div v-for="story in stories" class="story">
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
              {{ story.date }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import allStories from "../pages/placeholder/stories.json";
import { onMounted, ref } from "vue";
import { useStoriesStore } from "~/store/stories";
import { storeToRefs } from "pinia";

const storyStore = useStoriesStore();
const { fetchStories } = storyStore;
const { stories } = storeToRefs(storyStore);
onMounted(async () => {
  await fetchStories();
  console.log(stories.value);
});

const timeToRead = (text) => {
  const wordsPerMinute = 200; // Average case.
  let result;

  let textLength = text.split(" ").length; // Split by words
  if (textLength > 0) {
    let value = Math.ceil(textLength / wordsPerMinute);
    result = `${value} min read`;
  }
  return result;
};
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
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Koulen");

.story {
  color: white;
  border-bottom: solid rgba(255, 255, 255, 0.485) 1px;
  margin-bottom: 50px;
  padding-bottom: 10px;
  max-width: 70%;
}

.story-inner-card {
  display: flex;
  align-items: start;
  gap: 30px;
}
.story-inner-card img {
  height: 400px;
  width: 250px;
  object-fit: cover;
}
/* truncate with css */
/* .story-text  {
  position: relative;
  max-height: calc(1.5rem * 4);
  max-lines: 5;
  overflow: hidden;
  padding-right: 1rem;
}
.story-text::before {
  position: absolute;
  content: "...";
  bottom: 0;
  right: 0;
}
.story-text::after {
  content: "";
  position: absolute;
  right: 0;
  width: 1rem;
  height: 1rem;
  background: white;
} */
.card-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
}
.author {
  text-transform: capitalize;
}
.story-title {
  font-size: 30px;
  font-weight: bold;
  font-family: "Koulen";
  letter-spacing: 1.5px;
}
.metadata {
  display: flex;
  gap: 10px;
}
.stars {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}
.stars i {
  font-size: 12px;
}
</style>
