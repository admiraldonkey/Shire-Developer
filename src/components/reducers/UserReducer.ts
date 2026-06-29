import { type UserState, type UserAction } from "../../types/User.types";

export const initialUserState: UserState = {
  currentUser: null,
};

export const userReducer = (
  state: UserState,
  action: UserAction,
): UserState => {
  switch (action.type) {
    // Logged in user is saved
    case "SET_USER":
      return { currentUser: action.payload };
    // Clears current user state
    case "LOGOUT":
      return { ...state, currentUser: null };
    // User data has been deleted, user state returns to default
    case "DELETE":
      return initialUserState;
    default:
      return state;
  }
};
