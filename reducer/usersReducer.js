const INITIAL_STATE = {
  usersData: null,
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "users_details":
      return {
        ...state,
        usersData: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
