const createStoreImpl = (createState) => {
  let state;
  const listeners = new Set();

  const setState = (partial, replace = false) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;

    if (!Object.is(nextState, state)) {
      const prevState = state;
      state = replace ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, prevState));
    }
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const getInitialState = () => {
    return initialState;
  };

  const api = { setState, getState, subscribe, getInitialState };

  const initialState = (state = createState(setState, getState, api));

  return api;
};

export const createStore = (createState) =>
  createState && typeof createState === "function"
    ? createStoreImpl(createState)
    : createStoreImpl;
