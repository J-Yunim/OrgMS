import { reqLogin, reqRegister, reqUser } from "../ajax";

export const user = {
  state: {
    username: "",
    type: "", // admin/user ？ TODO
  },

  reducers: {
    update(state, payload) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    async registerUser(user) {
      const response = await reqRegister(user);
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
    async loginUser(user) {
      const response = await reqLogin(user);
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
    async getUser() {
      const response = await reqUser();
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
  }),
};
