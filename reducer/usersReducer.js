const INITIAL_STATE = {
  usersData: null,
  CurrentUserCred: null,
  messages: [],
  // usersDetails: null,
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "users_details":
      return {
        ...state,
        usersData: action.payload,
      };

    case "Current_UserCred":
      return {
        ...state,
        CurrentUserCred: action.payload,
      };

    case "get_messages":
      return {
        ...state,
        messages: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
