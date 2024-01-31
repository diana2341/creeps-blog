import { defineStore } from "pinia"
import { ref } from "vue"

export const useSnackbarStore = defineStore("snackbarStore", () => {
    const showSnackbar = ref(false)
    const snackbarTitle = ref('')
    const snackbarInfo = ref('')
    const openSnackbar = (title, info) => {
        showSnackbar.value = true
        snackbarTitle.value = title
        snackbarInfo.value = info
    }
    const closeSnackbar = () => {
        showSnackbar.value = false
    }
    return { showSnackbar, snackbarInfo, snackbarTitle, openSnackbar, closeSnackbar}
})