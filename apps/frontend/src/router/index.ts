import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path : '/', component: () => import('../app/building-type/DetermineBuildingType.vue') },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
