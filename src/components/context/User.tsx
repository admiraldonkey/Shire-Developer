import { useContext } from "react";
import { UserContext } from "./Contexts";

export const User = () => {
  const userContext = useContext(UserContext);
  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const inputName = formData.get("nameInput");
    if (typeof inputName === "string") {
      const isStored = localStorage.getItem(inputName);
      //TBD: Update to retrieve all data relating to player's progress from storage
      if (isStored) {
        console.log(`Welcome back, ${inputName}!`);
        userContext.setUser({
          name: inputName,
        });
      } else {
        console.log(`Welcome, ${inputName}!`);
        userContext.setUser({
          name: inputName,
        });
        localStorage.setItem(`${inputName}`, inputName);
      }
    }
  };
  const handleLogout = () => {
    userContext.setUser(null);
  };
  return (
    <div>
      {userContext.user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <form method="post" onSubmit={handleLogin}>
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
