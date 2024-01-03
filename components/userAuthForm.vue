<template>
  <v-form v-model="valid">
    <v-text-field
    v-model="userInfo.name"
    label="Name"
    :rules="[required('name')]"
    v-if="hasName"
    />
    <v-text-field
    v-model="userInfo.email"
    label="Email"
    :rules="[required('email'), emailFormat()]"
    />
    <v-text-field
    v-model="userInfo.password"
    label="Password"
    :type="showPassword? 'text' : 'password'"
    :append-icon="showPassword? 'mdi-eye' : 'mdi-eye-off'"
    @click:append = "showPassword = !showPassword"
    counter="true"
    :rules="[required('password'), minLength('password',8)]"
    />
    <v-btn
    @click="submitForm(userInfo)"
    :disabled="!valid"
    >{{ buttonText }}</v-btn>

  </v-form>
</template>
<script setup>
import {
    required,
    minLength,
    maxLength,
    emailFormat
  } from '@/utils/validations'
import { ref } from 'vue';
const valid = ref(false)
const showPassword = ref(false)
const userInfo = ref({
    email: '',
    password: ''
})


const props = defineProps({
        submitForm: Function,
        buttonText: String,
        hasName: Boolean
    })


</script>
<style scoped></style>
