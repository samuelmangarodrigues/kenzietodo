import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://test-todo-kenzie.herokuapp.com/api/',
});
