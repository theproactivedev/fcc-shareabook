import {
  ADD_USER, REMOVE_USER, SAVE_USER_PROFILE
} from './actions.js';

export const initialState = {
  isFetching: false,
  isUserAuthenticated: false,
  user: {
    userName: "",
    userId: "",
    userToken: "",
    name: "",
    city: "",
    state: ""
  },
  error: ""
}

const rootReducer = (state=initialState, action) => {
  switch(action.type) {
    case ADD_USER:
      return {
        ...state,
        isUserAuthenticated: true,
        user: {
          userName: action.user.userName,
          userId: action.user.userId,
          userToken: action.user.userToken
        }
      };
    case REMOVE_USER:
      return {
        ...state,
        isUserAuthenticated: false,
        user: {
          userName: "",
          userId: "",
          userToken: ""
        }
      };
    case SAVE_USER_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.user.name || "",
          city: action.user.city || "",
          state: action.user.state || ""
        }
      }
    default:
      return state;
  }
};

export default rootReducer;
