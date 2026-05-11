import { createContext } from "react";
import type { UserContextType } from "./User.types";

export const UserContext = createContext({} as UserContextType);
