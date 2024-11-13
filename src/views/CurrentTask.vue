<template>
  <div class="flex">
    <SideMenu class="w-2/5 bg-blue-100"/>
    <div class="block w-full">
      <TaskList class="w-full bg-yellow-100 block" :taskKind="TaskKind.DAY" :taskDate="currentDate"></TaskList>
      <TaskList class="w-full bg-red-100 block" :taskKind="TaskKind.WEEK" :taskDate="currentDate"></TaskList>
      <TaskList class="w-full bg-green-100 block" :taskKind="TaskKind.MONTH" :taskDate="currentDate"></TaskList>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/layout/SideMenu.vue';
import TaskList from '@/components/form/TaskList.vue';
import TaskKind from '@/enums/TaskKind';

export default{
  components:{
    SideMenu,
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