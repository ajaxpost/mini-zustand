// import { createStore } from "zustand/vanilla";

// const store = createStore((set, get, api) => ({
//   count: 0,
//   add: () => {
//     set((state) => ({ count: state.count + 1 }));
//   },
// }));

// const { getInitialState, getState, setState, subscribe } = store;

// console.log(getInitialState(), "getInitialState");
// console.log(getState(), "getState");
// const del1 = subscribe((state, preState) => {
//   console.log("当前 State", state);
//   console.log("上一个 State", preState);
// });
// setState({ count: 10 });

// console.log(getInitialState(), "getInitialState");
// console.log(getState(), "getState");

import { createStore } from "../mini-zustand";

const store = createStore((set, get, api) => ({
  count: 0,
  add: () => {
    set((state) => ({ count: state.count + 1 }));
  },
}));

const { getInitialState, getState, setState, subscribe } = store;

subscribe((state, preState) => {
  console.log("当前 State", state);
  console.log("上一个 State", preState);
});

console.log(getInitialState(), "getInitialState");
console.log(getState(), "getState");

setState({ count: 10 });

console.log(getInitialState(), "getInitialState");
console.log(getState(), "getState");

getState().add();

console.log(getInitialState(), "getInitialState");
console.log(getState(), "getState");
