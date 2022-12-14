//EXAMPLE Rematch
export const count = {
  state: 0, // initial state
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return state + payload;
    }
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch.count.increment(payload);
    }
  })
};

export const user = {
  state: {
    firstname: "default",
    fullname: "default",
    pictureURL: "",
    tokenJWT: ""
  },
  reducers: {
    setName: (state, payload) => payload,
    setToken: (state, payload) => {
      state.tokenJWT = payload;
      return { ...state };
    },
    removeToken: (state, payload) => {
      state.tokenJWT = "";
      return { ...state };
    },
    setProfile: (state, payload) => {
      state.firstname = payload.firstname;
      state.fullname = payload.fullname;
      state.pictureURL = payload.pictureURL;
      return { ...state };
    }
  }
};
