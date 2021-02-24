import { getTasks, createTask, deleteTask } from './utils/api';
import getIcon from './utils/getIcon';
import toggleDisabledState from './utils/toggleDisabledState';
import toggleLoadingState from './utils/toggleLoadingState';

class PomodoroApp {
  constructor(options) {
    const { tableSelector, tableTbodySelector, taskFormSelector } = options;
    this.$tableEl = document.getElementById(tableSelector);
    this.$tableTbody = document.getElementById(tableTbodySelector);
    this.$taskForm = document.getElementById(taskFormSelector);
    this.$taskFormInput = this.$taskForm.querySelector('input');
    this.$taskFormButton = this.$taskForm.querySelector('button');
  }

  fillTaskTable() {
    getTasks().then((currentTasks) => {
      currentTasks.forEach((task) => {
        this.createTaskRow(task);
        this.bindDeleteButtonEvent(task.id);
      });
    });
  }

  createTaskRow(task) {
    const $newTaskEl = document.createElement('tr');
    $newTaskEl.setAttribute('data-id', task.id);
    $newTaskEl.innerHTML = `
        <td><span class="id-row"></span></td>
        <td>${task.title}</td>
        <td>
          <button class="btn btn-danger" id="delete-button-${task.id}">
            ${getIcon('trash')}
          </button>
        </td>
    `;
    this.$tableTbody.appendChild($newTaskEl);
  }

  handleAddTask() {
    this.$taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      toggleDisabledState(this.$taskFormButton);
      toggleLoadingState(this.$taskFormButton, true, 'white');
      const task = { title: this.$taskFormInput.value };
      this.handleCreateTask(task);
      this.clearInputValue();
    });
  }

  handleCreateTask(task) {
    createTask(task).then((data) =>
      data.json().then((newTask) => {
        this.createTaskRow(newTask);
        this.bindDeleteButtonEvent(newTask.id);
        toggleDisabledState(this.$taskFormButton);
        toggleLoadingState(this.$taskFormButton, false);
      })
    );
  }

  toggleDisabledStateOnAllButtons() {
    const $deleteButtons = this.$tableTbody.querySelectorAll('button');
    $deleteButtons.forEach((button) => toggleDisabledState(button));
  }

  getDeleteButton(taskId) {
    return document.getElementById(`delete-button-${taskId}`);
  }

  bindDeleteButtonEvent(taskId) {
    const $deleteButton = this.getDeleteButton(taskId);
    $deleteButton.addEventListener('click', () => {
      this.toggleDisabledStateOnAllButtons();
      toggleDisabledState(this.$taskFormButton);
      toggleLoadingState($deleteButton, true, 'white');
      this.handleRemoveTask(taskId);
    });
  }

  handleRemoveTask(taskId) {
    deleteTask(taskId).then((response) =>
      response.json().then((deletedTask) => {
        const { id } = deletedTask;
        const $deleteButton = this.getDeleteButton(id);
        const rowToDelete = document.querySelector(`tr[data-id="${id}"]`);
        rowToDelete?.remove();
        toggleLoadingState($deleteButton, false);
        this.toggleDisabledStateOnAllButtons();
        toggleDisabledState(this.$taskFormButton);
      })
    );
  }

  clearInputValue() {
    this.$taskFormInput.value = '';
  }

  init() {
    this.fillTaskTable();
    this.handleAddTask();
  }
}

export default PomodoroApp;
