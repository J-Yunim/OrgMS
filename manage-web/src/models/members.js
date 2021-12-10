import {
  reqEditMember,
  reqEditMembers,
  reqMembers,
  reqSaveMembers,
} from "../ajax";

export const members = {
  state: {
    total: 0,
    numVC: 0,
    numChair: 0,
    numMember: 0,
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
        const { members, total, numChair, numVC } = result.data;
        dispatch.members.update({
          memberList: members,
          total,
          numChair,
          numVC,
          numMember: total - numChair - numVC,
        });
        return 0;
      } else {
        return 1;
      }
    },
    async saveMembers(member) {
      const response = await reqSaveMembers(member);
      const result = response.data;
      if (result.code === 0) {
        await dispatch.members.getMembers();
        return 0;
      } else {
        return 1;
      }
    },
    async editMember({ member, id }) {
      const response = await reqEditMember({ member, id });
      const result = response.data;
      console.log(result.code);
      if (result.code === 0) {
        await dispatch.members.getMembers();
        return 0;
      } else {
        return 1;
      }
    },
  }),
};
