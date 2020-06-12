const initialState = {
  user: {
    user_id: '고라니',
    chattingRoom_id: 1,
  },
  userData: {
    friendLists: [],
    allChatRooms: [],
  },
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_DATA': {
      return {
        ...state,
        userData: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducers;
