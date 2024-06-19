<template>
  <div id="app">
    <h1>Todo List</h1>
    <input v-model="newTodo" @keyup.enter="addNewTodo" placeholder="Add a new task" class="input" />
    <button @click="addNewTodo" class="add-button"><i class="fas fa-plus"></i> Add</button>
    <p class="incomplete-count">Total incomplete tasks: {{ incompleteCount }}</p>
    <task-list
      :tasks="todos"
      @toggle-completion="toggleCompletion"
      @remove-task="removeTodo"
      @edit-task="editTodo"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useTodoStore } from './stores/todoStore';
import TaskList from './components/TaskList.vue';

export default {
  components: {
    TaskList
  },
  setup() {
    const newTodo = ref('');
    const todoStore = useTodoStore();

    const addNewTodo = () => {
      if (newTodo.value.trim() !== '') {
        todoStore.addTodo(newTodo.value.trim());
        newTodo.value = '';
      }
    };

    const removeTodo = (index) => {
      todoStore.removeTodo(index);
    };

    const editTodo = ({ index, newText }) => {
      todoStore.editTodoText(index, newText);
    };

    const toggleCompletion = (index) => {
      todoStore.toggleTodoCompletion(index);
    };

    return {
      newTodo,
      todos: todoStore.todos,
      incompleteCount: todoStore.incompleteCount,
      addNewTodo,
      removeTodo,
      toggleCompletion,
      editTodo
    };
  }
};
</script>

<style scoped>
#app {
  width: 600px;
  height: max-content;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background:transparent;
    border: 2px solid rgb(255, 255, 255, .2);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
}

h1 {
  text-align: center;
  color: #f3e6e6;
}

.input {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.add-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #5cb85c;
  color: white;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-button i {
  margin-right: 8px;
}

.add-button:hover {
  background-color: #4cae4c;
}

.incomplete-count {
  text-align: center;
  font-size: 14px;
  color: #e9dfdf;
  margin-bottom: 20px;
}
</style>

<style>
/* CSS Global */
body {
  height: 100vh;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background: url('/src/assets/image/JEPANGMALAM.jpg') no-repeat center center fixed;
  background-size: cover;
}
</style>