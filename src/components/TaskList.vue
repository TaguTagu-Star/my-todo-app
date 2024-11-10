<template>
  <div >
    <button class="flex justify-between items-center border border-black rounded w-11/12 ml-2 mt-4 mb-1 mr-2"
      @click="changeOpenClose">
      <span>{{ listName }} </span>
      <span v-if="!openFlag">↓</span>
      <span v-if="openFlag">↑</span>
    </button>
    <div v-if="openFlag">
      <div class="flex justify-between items-center border border-black w-11/12 m-2 ml-6" 
        v-for="item in todoList" v-bind:key="item.task_id">
        <div>
          <input type="checkbox" :id="item.id" @click="changeCheckBox(item.id, $event.target.checked)" v-model="item.doneFlag">
          <span v-if="!item.isEdit" class="m-1">{{ item.task_name }}</span>
          <input v-if="item.isEdit" v-model="item.editValue" type="textbox" :placeholder="item.task_name">
        </div>
        <div>
          <button v-if="item.isEdit" @click="changeEditMode(item.task_id)" class="bg-red-300 text-xs p-1 m-1 rounded  ">キャンセル</button>
          <button v-if="item.isEdit" @click="clickAttachButton(item.task_id, item.editValue)" class="bg-green-300 text-xs p-1 m-1 rounded  ">完了</button>
          <button v-if="!item.isEdit" @click="changeEditMode(item.task_id)" class="bg-orange-300 text-xs p-1 m-1 rounded">編集</button>
          <button v-if="!item.isEdit" @click="confirmDeleteTask(item)" class="bg-red-400 text-xs p-1 m-1 rounded w-15">削除</button>
        </div>
      </div>
    </div>
    <ConfirmPopup v-if="deletePopupFlag" @confirm="deleteTaskObject" @cancel="hideDeletePopup">
      <template v-slot:displayMessage>
        <p class="text-xs">このタスクを本当に 削除してもよろしいですか？</p>
        <p class="text-xs">※取り消しはできません。</p>
      </template>
    </ConfirmPopup>
  </div>
</template>

<script>
import firebaseUtils from '../firebase/firebase.config.js'
import ConfirmPopup from './ConfirmPopup.vue'
import { format } from 'date-fns'

export default {
  components:{
    ConfirmPopup,
  },
  props:{
    taskKind:{
      type: Number,
      required: false,
    },
    taskDate:{
      type: Date,
      required: false,
    }
  },
  data() {
    return {
      listName: '',
      todoList: [],
      openFlag: false,
      deletePopupFlag: false,
      deleteTask: null,
    };
  },
  created(){
    // タスクリストの表示名の初期化
    switch (this.taskKind){
      case 1: // day
        this.listName = format(this.taskDate, 'MM月dd日');
        break;
      case 2: // week
        this.listName = format(new Date(this.taskDate.getFullYear(), this.taskDate.getMonth(),this.taskDate.getDate()-this.taskDate.getDay()), 'MM月dd日週');
        break;
      case 3: // month
        this.listName = format(this.taskDate, 'yyyy年MM月');
        break;
    }
    this.listName = '・' + this.listName + 'のタスク一覧';
    // タスクリストの初期化処理
    const initTaskList = firebaseUtils.ref(firebaseUtils.firebaseDb,"task_list");
    firebaseUtils.onValue(initTaskList, snapshot=>{
      const data = snapshot.val();
      if(data){
        const taskList = Object.keys(data).map(key =>({
          id: key,
          task_id: data[key].task_id,
          task_name: data[key].task_name,
          doneFlag: data[key].doneFlag,
          kind: data[key].kind,
          isEdit: false,
          editValue: data[key].task_name,
        })).filter(item=>(item.kind == this.taskKind));
        this.todoList = taskList;
      }
    });

  },
  methods: {
    changeOpenClose(){
      this.openFlag=!this.openFlag;
    },
    async changeCheckBox(task_id, isChecked){
      const updateContents = {};
      updateContents['/task_list/' + task_id + '/doneFlag'] = isChecked;
      try{
        await firebaseUtils.update(firebaseUtils.ref(firebaseUtils.firebaseDb),updateContents);
      }catch(error){
        console.error("Error updating Data:", error);
      }
    },
    changeEditMode(task_id){
      this.todoList[task_id-1].isEdit = !this.todoList[task_id-1].isEdit;
    },
    clickAttachButton(task_id, editValue){
      this.attachEdit(task_id,editValue);
    },
    async attachEdit(task_id, editValue){
      //更新用オブジェクトを作成し更新
      const updateContents = {};
      updateContents['/task_list/' + task_id + '/task_name'] = editValue;
      try{
        await firebaseUtils.update(firebaseUtils.ref(firebaseUtils.firebaseDb),updateContents);
      }catch(error){
        console.error("Error updating Data:", error);
      }
    },
    confirmDeleteTask(taskObject){
      this.deleteTask = taskObject;
      this.deletePopupFlag = true;
    },
    async deleteTaskObject(){
      if(this.deleteTask){
        try{
          await firebaseUtils.set(firebaseUtils.ref(firebaseUtils.firebaseDb,'/task_list/' + this.deleteTask.task_id),null);
          this.hideDeletePopup();
        }catch(error){
          console.error("Error deleting Data:", error);
        }
      }
    },
    hideDeletePopup(){
      this.deletePopupFlag = false;
      this.deleteTask = null;
    }
  }
};
</script>
