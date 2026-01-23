import './styles.scss';
import { createApp } from 'vue';
import App from './app/App.vue';
import { createPinia } from 'pinia';
import router from './router';

const app = createApp(App);
app.use(createPinia());
app.use(router)
app.mount('#root');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => {
        console.log('SW registered:', reg)
      })
      .catch(err => {
        console.error('SW registration failed:', err)
      })
  })
}