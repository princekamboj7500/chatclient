import './bootstrap';
//import '/public/build/css/bootstrap.min.css';
import './css/bootstrap.min.css';
import './css/icons.min.css';
import './css/app.min.css';

import store from './store';
import router from "./router";
import {createApp} from 'vue'

import App from './App.vue'

//createApp(App).mount("#app")
createApp(App).use(router).use(store).mount("#app");