const initialState = {
  user: {
    id: '',
    user_id: 'asdf',
    nickname: '고라니',
  },

  isLogined: false,
  friendLists: [],
  allMessages: {},
  currentChatRoomlists: [],
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
    case 'CHANGE_USER_INFO': {
      return {
        ...state,
        user: action.payload,
      };
    }
    case 'CHANGE_CURRENT_CHATTING_ROOM': {
      return {
        ...state,
        currentChatRoomlists: [...state.currentChatRoomlists, ...action.payload],
      };
    }
    case 'ADD_MESSAGE_TO_CHATTING_ROOM': {
      const curRoomId = action.payload.roomInfo.id;

      let currentChatRooms, currentChatRoomlists;
      if (!state.allMessages[curRoomId]) {
        currentChatRooms = { ...action.payload.roomInfo, messages: [action.payload.message] };
        currentChatRoomlists = [curRoomId, ...state.currentChatRoomlists];
      } else {
        let addedMessageArr = [action.payload.message, ...state.allMessages[curRoomId].messages];
        currentChatRooms = { ...state.allMessages[curRoomId] };
        currentChatRooms.messages = addedMessageArr;

        //change room list order(place latest chat room to the top)
        currentChatRoomlists = state.currentChatRoomlists.slice();
        currentChatRoomlists.splice(currentChatRoomlists.indexOf(String(curRoomId)), 1);
        currentChatRoomlists.unshift(String(curRoomId));
      }
      return {
        ...state,
        allMessages: {
          ...state.allMessages,
          [curRoomId]: currentChatRooms,
        },
        currentChatRoomlists: currentChatRoomlists,
      };
    }

    case 'HIDE_BOTTOM_TAB': {
      return {
        ...state,
        hideBottomTab: !state.hideBottomTab,
      };
    }
    case 'SET_ISLOGINED': {
      return {
        ...state,
        isLogined: !state.isLogined,
      };
    }
    default:
      return state;
  }
};

export default reducers;
