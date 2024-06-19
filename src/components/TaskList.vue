<template>
  <ul>
    <task-item
      v-for="(task, index) in tasks"
      :key="index"
      :task="task"
      :index="index"
      @toggle-completion="toggleCompletion"
      @remove-task="removeTask"
      @edit-task="editTask"
    />
  </ul>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
  components: {
    TaskItem
  },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleCompletion(index) {
      this.$emit('toggle-completion', index);
    },
    removeTask(index) {
      this.$emit('remove-task', index);
    },
    editTask({ index, newText }) {
      this.$emit('edit-task', { index, newText });
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
}

li:last-child {
  border-bottom: none;
}

.buttons {
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

button:hover {
  opacity: 0.8;
}

button.complete {
  background-color: #5bc0de;
  color: white;
}

button.remove {
  background-color: #d9534f;
  color: white;
}

button.edit {
  background-color: #f0ad4e;
  color: white;
}
</style>
