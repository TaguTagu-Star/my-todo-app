import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAm0N-BR4kPcUVkHAFSArSkBU1AIE2ZNiE",
  authDomain: "my-todo-app-77c05.firebaseapp.com",
  databaseURL: "https://my-todo-app-77c05-default-rtdb.firebaseio.com/",
  projectId: "my-todo-app-77c05",
  storageBucket: "my-todo-app-77c05.firebasestorage.app",
  messagingSenderId: "55801250708",
  appId: "1:55801250708:web:196e77d6a808626a07c581"
};

initializeApp(firebaseConfig);
createApp(App).mount('#app')
