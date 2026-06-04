// import { useUserState } from "../hooks/UseUser";
import { Options } from "../Options";

export const TopBar = () => {
  // const user = useUserState().currentUser;
  return (
    <header className="shrink-0 border-b border-amber-200/10 bg-black px-4 py-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-sm text-amber-100">Welcome, test!</p>

        <div className="flex flex-wrap gap-2">
          <Options />
        </div>
      </div>
    </header>
  );
};
