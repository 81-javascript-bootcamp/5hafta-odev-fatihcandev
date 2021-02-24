import './styles/main.scss';
import PomodoroApp from './app';

let pomodoroApp = new PomodoroApp({
  tableSelector: 'tasks-table',
  tableTbodySelector: 'tasks-table-tbody',
  taskFormSelector: 'task-form',
});

pomodoroApp.init();
