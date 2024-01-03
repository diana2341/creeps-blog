<!-- pages/login.vue -->
<template>
  <v-card title="Register" max-width="500" class="mx-auto pa-4">
    <v-card-title class="text-center d-flex align-center justify-center"
      >Register</v-card-title
    >
    <UserAuthForm
      buttonText="Register"
      :submitForm="registerUser"
      :hasName="true"
    />
  </v-card>
</template>

<script setup>
const registerUser = (user) => {
  this.$auth.loginWith("local", {
    data: {
      email: user.email,
      password: user.password,
    },
  });
  alert("login btn click");
};
</script>
