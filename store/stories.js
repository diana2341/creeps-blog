// store/pinia.js
import { defineStore } from 'pinia'
import axios from 'axios';
import {ref} from 'vue';

export const useStoriesStore = defineStore( 'storiesStore', () => {
    const stories = ref([])
    const currStory = ref({})

    const fetchStories = async () => {
      try {
        const response = await axios.post('http://localhost:4000/graphql', {
          query: `
            query {
              stories {
                _id
                title
                img
                rating
                story
                views
                tags
                author
                date
              }
            }
          `,
        });

        const result = response.data;
        if (result.data && result.data.stories) {
          stories.value = result.data.stories;
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    }
 
    const fetchCurrStory = async (id) => {
      try{
        const response = await axios.post('http://localhost:4000/graphql', {
          query: `
            query {
              story(id: "${id}"){
                _id
                title
                img
                rating
                story
                views
                tags
                author
                date
              }
            }
          `
        })
        const result = response.data 
        if(result){
          currStory.value = result.data.story
        }

      } catch {

      }
    }
    return {stories, fetchStories, currStory, fetchCurrStory};

});
