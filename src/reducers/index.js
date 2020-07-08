const initialState = {
  user: {
    id: '',
    user_id: 'asdf',
    nickname: '고라니',
  },

  friendLists: [],
  allMessages: {},
  currentChatRooms: [],
  selectedChatRooms: {},
  hideBottomTab: true,
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
      // change room list order

      let addMessagesArr, currentChatRooms;
      if (!state.allMessages[curRoomId]) {
        addMessagesArr = [action.payload];
        currentChatRooms = [curRoomId, ...state.currentChatRooms];
      } else {
        addMessagesArr = [action.payload, ...state.allMessages[curRoomId].messages.slice()];
        // change room list order(place latest chat room to the top)
        currentChatRooms = state.currentChatRooms.slice();
        let currentChatRoomsIdx = currentChatRooms.indexOf(curRoomId);
        currentChatRooms.splice(currentChatRoomsIdx, 1);
        currentChatRooms.unshift(curRoomId);
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
        currentChatRooms: currentChatRooms,
      };
    }

    case 'HIDE_BOTTOM_TAB': {
      return {
        ...state,
        hideBottomTab: !state.hideBottomTab,
      };
    }

    default:
      return state;
  }
};

export default reducers;
