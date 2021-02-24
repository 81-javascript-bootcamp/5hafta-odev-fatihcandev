import { API_URL } from '../constants';

export const getTasks = () => {
  return fetch(API_URL).then((data) => data.json().then((data) => data));
};

export const createTask = (task) => {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
};

export const deleteTask = (taskId) => {
  return fetch(`${API_URL}/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
