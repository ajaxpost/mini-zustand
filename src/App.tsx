import { FC, useState, useSyncExternalStore } from "react";
import { useStore } from "./store";
import "./lib/store-vanila";

let count = 0;

const subscribes = [];

const App: FC = () => {
  const [show, setShow] = useState(false);
  const number = useSyncExternalStore(
    (listener) => {
      subscribes.push(listener);
      return () => {
        const index = subscribes.indexOf(listener);
        subscribes.splice(index, 1);
      };
    },
    () => {
      return count;
    },
    () => {
      return count;
    }
  );

  const newCount = useStore((store) => store.count);
  const addCount = useStore((store) => store.addCount);

  return (
    <>
      app{number}
      <button onClick={() => setShow(!show)}>「点击触发重新 render」</button>
      <button
        onClick={() => {
          count++;
          subscribes.forEach((listener) => listener());
        }}
      >
        count++
      </button>
      <hr />
      newCount = {newCount}
      <button onClick={() => addCount()}>addNewCount</button>
      <button
        onClick={() =>
          useStore.setState((state) => ({
            count: state.count - 1,
            num: state.num + 1,
          }))
        }
      >
        reduceNewCount
      </button>
    </>
  );
};

export default App;
