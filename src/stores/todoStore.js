import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem('todos')) || []
  }),
  actions: {
    addTodo(text) {
      this.todos.push({ text, completed: false });
      this.saveTodos();
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      this.saveTodos();
    },
    toggleTodoCompletion(index) {
      this.todos[index].completed = !this.todos[index].completed;
      this.saveTodos();
    },
    editTodoText(index, newText) {
      this.todos[index].text = newText;
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  },
  getters: {
    incompleteCount(state) {
      return state.todos.filter(todo => !todo.completed).length;
    }
  }
});
