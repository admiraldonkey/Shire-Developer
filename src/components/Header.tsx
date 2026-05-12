import { User } from "./context/User";
import { useContext } from "react";
import { UserContext } from "./context/Contexts";
import { Counter } from "./Counter";
export const Header = () => {
  const userContext = useContext(UserContext);
  return (
    <div>
      {userContext.user ? <Counter /> : 0}
      <User />
    </div>
  );
};
