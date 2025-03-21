import { create } from "../mini-zustand/react";

export const useStore = create((set, get, api) => ({
  count: 0,
  num: 0,
  addCount: () => {
    set({
      count: get().count + 1,
    });
  },
  reduceCount: () => {
    set({
      count: get().count - 1,
    });
  },
}));
