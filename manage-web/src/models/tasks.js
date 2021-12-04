import { reqGetTasks } from "../ajax";

export const tasks = {
  state: {
    name: "",
    columns: {}, // columns
  },
  reducers: {
    update(state, payload) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    async loadTasks() {
      const response = await reqGetTasks();
      const result = response.data;
      if (result.code === 0) {
        dispatch.user.update({
          username: result.data.username,
        });
        return 0;
      } else {
        return 1;
      }
    },
    async saveTasks(columns) {},
    async saveName(name) {},
  }),
};
