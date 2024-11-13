<template>
  <div class="flex">
    <SideMenu class="w-2/5 bg-blue-100"/>
    <TaskList class="w-full bg-yellow-100" :taskKind="TaskKind.DAY" :taskDate="currentDate" />
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
import TaskList from './components/TaskList.vue'
import TaskKind from './enums/TaskKind'

export default {
  name: 'App',
  components: {
    TaskList,
    SideMenu
  },
  data(){
    return {
      currentDate: new Date(),
      TaskKind,
    };
  }
}
</script>