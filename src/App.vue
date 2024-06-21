<template>
  <div>
    <button @click="kuliah" class="add-kuliah">Tugas 1 - 7</button>
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

    <!-- List Options Section -->
    <div v-if="showOptions" class="options-list" style="text-align: center;">
      <button @click="closeOptions" class="close-options">x</button>
      <h1 style="color: #fff;">Choose Task</h1>
      <ul>
        <li v-for="(option, index) in options" :key="index" @click="redirectToOption(optionLinks[index])">{{ option }}</li>
      </ul>
    </div>
    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h1>Halaman ini Free Tugas</h1>
        <button @click="closeModal" class="close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useTodoStore } from './stores/todoStore';
import TaskList from './components/TaskList.vue';

export default {
  components: {
    TaskList
  },
  setup() {
    const newTodo = ref('');
    const todoStore = useTodoStore();

    const options = reactive([
      'Tugas 1',
      'Tugas 2',
      'Tugas 3',
      'Tugas 4',
      'Tugas 5',
      'Tugas 6',
      'Tugas 7'
    ]);
    const optionLinks = reactive([
      'https://ahmad-projectcv.netlify.app',
      '/FreeTugas',
      'https://marifahmad.netlify.app',
      'https://marifahmad-223510434-prapbk.netlify.app',
      'https://marifahmad-223510434-ppbk-t5-landingp.netlify.app',
      'https://marifahmadnasution-223510434-t6-inapi.netlify.app',
      'https://marifahmadnasution-223510434-t7-pinia.netlify.app/'
    ]);
    const showOptions = ref(false); // State to control visibility of options

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

    const kuliah = () => {
      showOptions.value = !showOptions.value;
      localStorage.setItem('showOptions', showOptions.value);
    };

    const closeOptions = () => {
      showOptions.value = false;
      localStorage.setItem('showOptions', showOptions.value);
    };

    const redirectToOption = (url) => {
      window.location.href = url;
    };

    onMounted(() => {
      const savedShowOptions = localStorage.getItem('showOptions');
      if (savedShowOptions !== null) {
        showOptions.value = JSON.parse(savedShowOptions);
      }
    });

    return {
      newTodo,
      todos: todoStore.todos,
      incompleteCount: todoStore.incompleteCount,
      addNewTodo,
      removeTodo,
      toggleCompletion,
      editTodo,
      kuliah,
      closeOptions,
      options,
      optionLinks,
      showOptions,
      redirectToOption
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

.add-kuliah {
  margin-bottom: 10px;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.options-list {
  margin-top: 20px;
  background:transparent;
  border: 2px solid rgb(255, 255, 255, .2);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  position: relative;
  padding: 10px;
}

.options-list h1 {
  font-size: 18px;
  color: #333;
}

.options-list ul {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  list-style-type: none;
}

.options-list li {
  margin-right: 10px;
  padding: 20px;
  margin-bottom: 8px;
  font-size: 16px;
  color: hsl(0, 14%, 95%);
  cursor: pointer;
  background-color:rgb(33, 194, 55);
  width: max-content;
  /* Animasi transisi */
}

.options-list li:hover {
  box-shadow: #333;
  transform: scale(1.1); /* Efek zoom dengan scale 1.1 saat dihover */
}

.options-list li:active {
  transform: translateY(2px); /* Efek ketika sedang diklik */
}

.close-options {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff5c5c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.add-kuliah[data-v-7a7a37b1] {
  margin-left: 80px;
}
.close-options:hover {
  background-color: #ff3b3b;
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
