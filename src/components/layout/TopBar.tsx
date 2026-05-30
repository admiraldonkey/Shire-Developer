import { useUserState } from "../hooks/UseUser";
import { Options } from "../Options";

export const TopBar = () => {
  const user = useUserState().currentUser;
  return (
    <header>
      <p>Welcome, {user?.name}!</p>
      <Options />
    </header>
  );
};
