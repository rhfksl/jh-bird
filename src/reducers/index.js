const initialState = {
  user: {
    id: '',
    user_id: 'asdf',
    nickname: '고라니',
  },

  friendLists: [],
  allMessages: {},
  currentChatRooms: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_FRIEND_LISTS': {
      return {
        ...state,
        friendLists: [...state.friendLists, ...action.payload],
      };
    }
    case 'CHANGE_ALL_MESSAGES': {
      return {
        ...state,
        allMessages: action.payload,
      };
    }
    case 'GET_USER_INFO': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'CHANGE_CURRENT_CHATTING_ROOM': {
      return {
        ...state,
        currentChatRooms: [...state.currentChatRooms, ...action.payload],
      };
    }
    case 'ADD_MESSAGE_TO_CHATTING_ROOM': {
      const curRoomId = action.payload.chattingRoomId;
      let addMessagesArr;
      if (!state.allMessages[curRoomId]) {
        addMessagesArr = [action.payload];
      } else {
        addMessagesArr = [action.payload, ...state.allMessages[curRoomId].messages.slice()];
      }
      return {
        ...state,
        allMessages: {
          ...state.allMessages,
          [curRoomId]: {
            ...state.allMessages[curRoomId],
            messages: addMessagesArr,
          },
        },
      };
    }

    default:
      return state;
  }
};

export default reducers;
