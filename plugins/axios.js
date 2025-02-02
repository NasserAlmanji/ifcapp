import axios from 'axios'

export default defineNuxtPlugin(() => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your backend URL
  })

  return {
    provide: {
      axios: axiosInstance,
    },
  }
})