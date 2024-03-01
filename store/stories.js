// store/pinia.js
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useStoriesStore = defineStore("storiesStore", () => {
  const stories = ref([]);
  const currStory = ref({});
  const topStories = ref([])

  const fetchStories = async () => {
    try {
      const response = await axios.post("http://localhost:4000/graphql", {
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
      console.error("Error fetching stories:", error);
    }
  };
  const createStory = async (newStory) => {
    const base64Image = newStory.img.toString('base64');
    try{
      const response = await axios.post('http://localhost:4000/graphql',{
        query: `
        mutation CreateStory {
          createStory( input: {
            author: "${newStory.author}"
            date: "${new Date()}"
            img: "${base64Image}"
            rating: ${0}
            story: ${JSON.stringify(newStory.story)}
            tags: ${JSON.stringify(newStory.tags)}
            title: "${newStory.title}"
            views: ${0}
          }) {
            _id
            author
            date
            img
            rating
            story
            tags
            title
            views
          }
        }`
      })
      const createdStory = response.data.data.createStory
      stories.value.push(createdStory)
      return createdStory
    } catch(error) {
      console.error('Error creating story:', error);
      throw error;
    }
  }

  const fetchCurrStory = async (id) => {
    try {
      const response = await axios.post("http://localhost:4000/graphql", {
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
          `,
      });
      const result = response.data;
      if (result) {
        currStory.value = result.data.story;
      }
    } catch {}
  };

  const updateStory = async (id, updatedStory) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/graphql`,
        {
          query: `
          mutation UpdateStory {
            updateStory(id: "${id}", input: {
              title: "${updatedStory.title}",
              date: "${updatedStory.date}",
              story: ${JSON.stringify(updatedStory.story)},
              author: "${updatedStory.author}",
              tags: ${JSON.stringify(updatedStory.tags)},
              img: "${updatedStory.img}",
              rating: ${updatedStory.rating},
              views: ${updatedStory.views},
            }) {
              title
              date
              story
              author
              tags
              img
              rating
              views
            }
          }
        `
        },
        
      );
      const updatedStoryResult = response.data.data.updateStory
      currStory.value = updatedStoryResult
      currStory.value._id = id

      return updatedStoryResult 
    } catch (error) {
      console.error('Error updating story:', error);
      throw error;
    }
  }
  const deleteStory = async(id) =>{
    const response = axios.post(`http://localhost:4000/graphql`,
      {
        query: `
        mutation DeleteStory{
          deleteStory(id:"${id}"){
            _id
          }
        }
        `
      }
    )
    stories.value = stories.value.filter(story => story._id !== id )
    return response.data;


  }
  const getTopStories = async() => {
   await fetchStories()
    if(stories.value.length){
      const top = stories.value.sort((a,b)=> b.views - a.views).slice(0,3)
      topStories.value = top
    }

  }
  return { stories, fetchStories, currStory, fetchCurrStory, updateStory, createStory, deleteStory, getTopStories, topStories };
});
