import { useDebugValue, useSyncExternalStore } from "react";
import { createStore } from ".";

const useStore = (api, selector) => {
  const slice = useSyncExternalStore(
    api.subscribe,
    () => selector(api.getState()),
    () => selector(api.getInitialState())
  );

  useDebugValue(slice);

  return slice;
};

const createStoreImpl = (createState) => {
  const api = createStore(createState);
  const useBoundStore = (selector) => useStore(api, selector);

  Object.assign(useBoundStore, api);
  return useBoundStore;
};

export const create = (createState) =>
  createState && typeof createState === "function"
    ? createStoreImpl(createState)
    : createStoreImpl;
