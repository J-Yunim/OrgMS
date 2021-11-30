import ajax from "./ajax";

export const reqRegister = (user) => ajax("/register", user, "POST");

export const reqLogin = ({ username, password }) =>
  ajax("/login", { username, password }, "POST");

export const reqUser = () => ajax("/user");

export const reqSaveTasks = (columns) =>
  ajax("/savetasks", { columns }, "POST");
export const reqSaveProject = (name) => ajax("/saveproject", { name }, "POST");
export const reqGetTasks = () => ajax("/gettasks");
