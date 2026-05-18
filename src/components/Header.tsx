import { Counter } from "./Counter";
import { useUserState } from "./hooks/UseUser";
export const Header = () => {
  const user = useUserState().currentUser;
  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <Counter />
    </div>
  );
};
