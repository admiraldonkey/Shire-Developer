// import { useContext } from "react";
// import { UserContext } from "./Contexts";
import { useUserState, useUserDispatch } from "./hooks/UseUser";
import type { User } from "./types/User.types";

export const SplashScreen = () => {
  const { currentUser } = useUserState();
  const dispatch = useUserDispatch();

  const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nameInput = formData.get("nameInput");

    if (typeof nameInput === "string") {
      const savedData = localStorage.getItem(nameInput);
      //TBD: Update to retrieve all data relating to player's progress from storage
      if (savedData) {
        const parsed = JSON.parse(savedData);
        dispatch({ type: "SET_USER", payload: parsed });
      } else {
        const newUser: User = { name: nameInput, theme: "light" };
        dispatch({ type: "SET_USER", payload: newUser });
        localStorage.setItem(nameInput, JSON.stringify(newUser));
      }
    }
  };
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div>
      {currentUser ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            Enter name to login:{" "}
            <input type="text" name="nameInput" placeholder="name" />
          </label>
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};
