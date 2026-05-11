export type User = {
  name: string;
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export type UserContextProviderProps = {
  children: React.ReactNode;
};
