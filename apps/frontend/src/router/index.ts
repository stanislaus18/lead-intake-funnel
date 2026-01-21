import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path : '/', component: () => import('../app/components/ShellSP.vue') },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
