<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">TODOリスト</h1>
    <ul>
      <li v-for="item in todos" :key="item.id" class="mb-2">{{ item.text }}</li>
    </ul>
    <input v-model="newTodo" placeholder="新しいTODOを追加" class="border p-2 rounded mb-4">
    <button @click="addTodo" class="bg-blue-500 text-white p-2 rounded">追加</button>
  </div>
</template>

<script>
import { getDatabase, ref, push, set, onValue } from 'firebase/database'

export default {
  data() {
    return {
      todos: [],
      newTodo: ""
    };
  },
  created() {
    const tempdb = getDatabase();
    const todosRef = ref(tempdb, "todos");
    onValue(todosRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const todosArray = Object.keys(data).map(key => ({
          id: key,
          text: data[key].text
        }));
        this.todos = todosArray;
      }
    });
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        const tempdb = getDatabase();
        const todosRef = ref(tempdb, "todos");
        const newTodoRef = push(todosRef);
        set(newTodoRef, {
          text: this.newTodo
        });
        this.newTodo = "";
      }
    }
  }
};
</script>
