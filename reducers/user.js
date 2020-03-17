import { createAction, handleActions } from "redux-actions";

const initialState = {
  loading: false
};

const sleep = (time) => {
  return new Promise(resolve => setTimeout(() => resolve(true), time))
}

export const loginAction = createAction("LOGIN_ACTION", async () => {
  try {
    await sleep(4000)
    return ({ firstName: "Aaron", lastName: "Lee" });
  } catch (error) {
    throw error;
  }
});

export const loginoutAction = createAction("LOGIN_OUT_ACTION", async () => {
  try {
    await sleep(4000)
    return ({});
  } catch (error) {
    throw error;
  }
});


const reducer = handleActions({
  [loginAction]: {
    PENDING: (state) => ({ ...state, loading: true }),
    FULFILLED: (state, { payload }) => ({ ...state, loading: false, ...payload }),
    REJECTED: (state) => ({ loading: false })
  },
  [loginoutAction]: {
    PENDING: (state) => ({ ...state, loading: true }),
    FULFILLED: (state, { payload }) => ({ loading: false }),
    REJECTED: (state) => ({ loading: false })
  }
}, initialState);

export default reducer;