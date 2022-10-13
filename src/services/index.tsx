import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://kenzie-test-todo.herokuapp.com/api/',
});
