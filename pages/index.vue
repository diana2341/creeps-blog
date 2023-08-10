<template>
  <div>
    <Navbar />
    <div class="app-name">Eerie Night Reads</div>
  </div>
</template>

<script setup>
import Navbar from "../components/global/navbar.vue";
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=MedievalSharp");
.app-name {
  color: red;
  font-family: "MedievalSharp";
  font-size: 50px;
  text-align: center;
}
</style>
