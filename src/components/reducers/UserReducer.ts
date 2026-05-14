import { type UserState, type UserAction } from "../types/User.types";

export const initialUserState: UserState = {
  currentUser: null,
};

export const userReducer = (
  state: UserState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    case "SET_USER":
      return { currentUser: action.payload };
    case "LOGOUT":
      return { currentUser: null };
    case "SET_THEME":
      if (!state.currentUser) return state;
      return { currentUser: { ...state.currentUser, theme: action.payload } };
    default:
      return state;
  }
};
