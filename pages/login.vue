<!-- pages/login.vue -->
<template>
  <v-card title="Log In" max-width="500" class="mx-auto pa-4">
    <v-card-title class="text-center d-flex align-center justify-center"
      >Log in</v-card-title
    >
    <UserAuthForm buttonText="Login" :submitForm="loginUser" />
  </v-card>
</template>

<script >
export default{
methods:{
 loginUser (user) {
  this.$auth.loginWith('local', {
    data: {
      email: user.email,
      password: user.password,
    },
  });
  alert("login btn click");
}
}}
</script>

