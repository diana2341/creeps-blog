<template>
    <div>hello</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import stories from '../pages/placeholder/stories.json'
const story = ref({})
const currentID = 0
onMounted(()=>{
    console.log(route)
    story.value = stories.data.find(story => story.id === currentID)
})
</script>