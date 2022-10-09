import axios from "axios";

export const url = "https://hadar-todo-app.herokuapp.com";

const instance = axios.create({
  baseURL: url,
});

export default instance;
