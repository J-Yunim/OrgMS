import { reqMembers, reqSaveMembers } from "../ajax";

export const members = {
  state: {
    memberList: [],
  },
  reducers: {
    update(state, payload) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    async getMembers() {
      const response = await reqMembers();
      const result = response.data;
      if (result.code === 0) {
        dispatch.members.update({
          memberList: result.data,
        });
        return 0;
      } else {
        return 1;
      }
    },
    async saveMembers(member) {
      const response = await reqSaveMembers(member);
      const result = response.data;
      console.log(result.code);
      if (result.code === 0) {
        await dispatch.members.getMembers();
        console.log(dispatch.members.memberList);
        return 0;
      } else {
        return 1;
      }
    },
  }),
};
