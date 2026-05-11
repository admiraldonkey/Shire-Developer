import { useContext } from "react";
import { UserContext } from "./Contexts";

export const User = () => {
  const userContext = useContext(UserContext);
  const handleLogin = () => {
    userContext.setUser({
      name: "Placeholder",
    });
  };
  const handleLogout = () => {
    userContext.setUser(null);
  };
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <p>
        {userContext.user
          ? `Get clicking, ${userContext.user.name}! Those hobbits aren't going to recruit themselves!`
          : `Click login to start`}
      </p>
    </div>
  );
};
