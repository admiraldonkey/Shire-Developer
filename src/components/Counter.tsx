import { useState } from "react";

export const Counter = () => {
  const [hobbits, setHobbits] = useState(0);
  const handleRecruit = () => {
    setHobbits((hobbits) => hobbits + 1);
  };
  return (
    <div>
      <div>{hobbits}</div>
      <button onClick={handleRecruit}>Recruit!</button>
    </div>
  );
};
