import { Counter } from "./Counter";
import { useUserState } from "./hooks/UseUser";
export const Header = () => {
  const user = useUserState().currentUser;
  return (
    <div>
      <p>Header successfully rendered</p>
      <p>Logged in user's name is {user?.name}</p>
      <Counter />
    </div>
  );
};
