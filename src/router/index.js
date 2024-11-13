import { createRouter, createWebHashHistory } from 'vue-router'
import CurrentTask from '@/views/CurrentTask.vue'
import AddTask from '@/views/AddTask.vue'
import PastTask from '@/views/PastTask.vue'
import Setting from '@/views/SettingApp.vue'

const routes = [
  {
    path: '/current',
    name: 'Current',
    component: CurrentTask
  },
  {
    path: '/add',
    name: 'Add',
    component: AddTask
  },
  {
    path: '/past',
    name: 'Past',
    component: PastTask 
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting 
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
