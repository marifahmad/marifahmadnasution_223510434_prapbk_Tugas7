<template>
  <li>
    <span v-if="!isEditing" :class="{ completed: task.completed }">{{ task.text }}</span>
    <input v-else v-model="editedText" @keyup.enter="saveEdit" @blur="saveEdit" ref="editInput" class="edit-input" />
    <div class="buttons">
      <button @click="toggleCompletion" class="complete"><i :class="task.completed ? 'fas fa-times' : 'fas fa-check'"></i> {{ task.completed ? 'Incomplete' : 'Complete' }}</button>
      <button @click="removeTask" class="remove"><i class="fas fa-trash"></i> Remove</button>
      <button @click="editTask" class="edit"><i :class="isEditing ? 'fas fa-save' : 'fas fa-edit'"></i> {{ isEditing ? 'Save' : 'Edit' }}</button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      editedText: this.task.text
    };
  },
  methods: {
    toggleCompletion() {
      this.$emit('toggle-completion', this.index);
    },
    removeTask() {
      this.$emit('remove-task', this.index);
    },
    editTask() {
      if (this.isEditing) {
        this.saveEdit();
      } else {
        this.isEditing = true;
        this.$nextTick(() => this.$refs.editInput.focus());
      }
    },
    saveEdit() {
      if (this.editedText.trim()) {
        this.$emit('edit-task', { index: this.index, newText: this.editedText.trim() });
        this.isEditing = false;
      }
    }
  }
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
  color: #999;
}

.edit-input {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100px;
  margin-bottom: 5px;
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
