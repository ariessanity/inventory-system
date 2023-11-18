import React from "react";

import { Text } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "@/store";
import { decrement, increment, incrementByAmount } from "@/store/slice/counterSlice";

const Counter = () => {
  const count = useAppSelector((state: any) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div style={{ textAlign: "center" }}>
      <h4 style={{ marginBottom: 16 }}>{count}</h4>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button
        onClick={() => dispatch(decrement())}
        style={{ marginInline: 16 }}
      >
        decrement
      </button>
      <button
        onClick={() => dispatch(incrementByAmount(10))}
        style={{ marginInline: 16 }}
      >
        decrement
      </button>
    </div>
  );
};

export default Counter;