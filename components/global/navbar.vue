<template>
  <div class="nav">
    <div class="Logo">Logo</div>
    <div class="nav-list">
      <ul>
        <li>Random Story</li>
        <li>Top Stories</li>
        <li>Recent Stories</li>
        <li><v-btn>Create Account</v-btn></li>
      </ul>
    </div>
  </div>
</template>
<style>
li {
  list-style-type: none;
}
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  width: 100%;
  min-height: 100px;
}
.nav-list ul {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 20px;
  gap: 20px;
}
</style>
