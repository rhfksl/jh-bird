const initialState = {
  user: {
    user_id: 'asdf',
    chattingRoom_id: 1,
    nickname: '고라니',
  },
  userData: {
    friendLists: [],
    allChatRooms: [],
  },
  curRoomId: '',
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_DATA': {
      return {
        ...state,
        userData: action.payload,
      };
    }
    case 'CHANGE_CURRENT_CHATTING_ROOM': {
      return {
        ...state,
        curRoomId: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducers;
