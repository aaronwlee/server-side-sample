import { combineReducers, createStore, applyMiddleware } from "redux";
import { createPromise } from "redux-promise-middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import isServer from "../utils/isServer";
import user from "./user";

function configureStore(initialState = {}) {
  const reducers = combineReducers({
    user: user
  });

  const middlewares = applyMiddleware(
    createPromise({ promiseTypeDelimiter: "/" }),
  );

  const devTool = process.env.NODE_ENV === "production" ? middlewares : composeWithDevTools(middlewares);

  const store = createStore(
    reducers,
    initialState,
    devTool
  );

  if (isServer) {
    return store;
  }

  if (!isServer && !window.reduxStore) {
    window.reduxStore = store;
  }
  return window.reduxStore;
}

export default configureStore;
