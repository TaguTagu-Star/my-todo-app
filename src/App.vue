<template>
  <TaskList :taskKind="TaskKind.DAY" :taskDate="currentDate" />
</template>

<script>
import TaskList from './components/TaskList.vue'
import TaskKind from './enums/TaskKind'

export default {
  name: 'App',
  components: {
    TaskList
  },
  data(){
    return {
      currentDate: new Date(),
      TaskKind,
    };
  }
}
</script>