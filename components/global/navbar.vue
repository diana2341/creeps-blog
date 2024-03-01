<template>
  <div class="nav">
    <div class="Logo">
      <NuxtLink to="/">
        <img src="logo.png" />
      </NuxtLink>
      <div class="nav-list">
        <ul>
          <li>
            <NuxtLink to="/createStory">
              Submit a Story
              <i class="fa-regular fa-file-lines"></i>
            </NuxtLink>
          </li>
          <li @click="randomStory">
            Random Story
            <i class="fa-solid fa-shuffle"></i>
          </li>
          <li @click="topStory">
            Top Stories
            <i class="fa-solid fa-arrow-trend-up"></i>
          </li>
          <li>
            Recent Stories
            <i class="fa-solid fa-clock-rotate-left"></i>
          </li>

          <li></li>
        </ul>
      </div>
    </div>

    <div>
      <v-btn v-if="$auth.loggedIn" to="/login">Logout</v-btn>
      <v-btn v-else to="/register">
        Create Account
        <i class="fa-solid fa-user-plus"></i>
      </v-btn>
    </div>
  </div>
</template>
<script setup>
import { useStoriesStore } from "~/store/stories";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useRouter } from '@nuxtjs/composition-api';

const email = ref("");
const password = ref("");
const logo = ref(null);
const storiesStore = useStoriesStore()
const { fetchStories } = storiesStore;
const { stories } = storeToRefs(storiesStore)
const $router = useRouter();

const login = async () => {
  try {
    await this.$auth.loginWith("local", {
      data: { email: this.email, password: this.password },
    });
    // Redirect or perform actions upon successful login
  } catch (error) {
    console.error(error);
  }
};
const randomStory = () => {
  if(stories.value.length){
    const story = stories.value[Math.floor(Math.random()*stories.value.length)];
    $router.push(`/${story._id}`)

  }
};


const topStory = () =>{
  if(stories.value.length){
    $router.push('/topStories')
  }

}

onMounted (async() => {
// if (this.$auth.loggedIn) {
//   // Do something when the user is logged in
//   // console.log("heree")
// }
 await fetchStories()
})
</script>
<style>
.nav-list li {
  list-style-type: none;
  cursor: pointer;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(200, 200, 200);
  width: 100%;
  min-height: 100px;
  padding-left: 10px;
  padding-right: 10px;
}
.nav .v-btn:not(.regular) {
  border-radius: 15px;
  background: transparent !important;
  border: solid rgb(185, 2, 2) 1px;
  color: white;
}
.v-btn__content {
  display: flex;
  align-items: center;
  gap: 4px;
}
.v-btn__content i {
  font-size: 13px;
}
i {
  font-size: 16px;
}
.nav-list ul {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  gap: 50px;
}

.Logo img {
  width: 120px;
}
.Logo {
  display: flex;
  align-items: center;
}
.regular {
  box-shadow: none !important;
}
.regular:hover {
  background-color: transparent !important;
}
</style>
