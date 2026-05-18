import { useGameState, useGameDispatch } from "./hooks/UseGame";
// import { useEffect } from "react";

export const Counter = () => {
  const { hobbits } = useGameState();
  const dispatch = useGameDispatch();

  // TEMPORARILY DISABLED WHILE IMPLEMENTING OTHER FEATURES
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     dispatch({ type: "TICK" });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [dispatch]);

  const handleRecruit = () => {
    dispatch({ type: "CLICK_HOBBIT" });
  };

  return (
    <div>
      <div>{hobbits}</div>
      <button
        className="border border-black-200 p-2 mx-1"
        onClick={handleRecruit}
      >
        Recruit!
      </button>
    </div>
  );
};
