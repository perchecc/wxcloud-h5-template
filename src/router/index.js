// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'

// createRouter 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      component: home
    }
  ]
})

// 抛出路由实例, 在 main.js 中引用
export default router