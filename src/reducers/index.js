const initialState = {
  user: {
    id: '',
    user_id: 'asdf',
    nickname: '고라니',
  },

  friendLists: [],
  allMessages: [],
  currentChatRooms: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_FRIEND_LISTS': {
      return {
        ...state,
        friendLists: action.payload,
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
      // const temp = state.allMessages.slice();
      // for (let i = 0; temp.length; i++) {
      //   // console.log('이게 먼데 대체', state.allMessages);
      //   if (temp[i].chattingRoomId === action.payload.chattingRoomId) {
      //     // const temp =
      //     // temp[i].messages.push(action.payload);
      //     console.log('store state', temp);
      //     return { ...state, allMessages: [...state.allMessages] };
      //   }
      // }
      const curRoomId = action.payload.chattingRoomId;
      const addMessagesArr = [...state.allMessages[curRoomId].messages.slice(), action.payload];
      return {
        ...state,
        allMessages: {
          ...state.allMessages,
          [curRoomId]: {
            ...state.allMessages[curRoomId],
            messages: addMessagesArr,
          },
        },
        // allMessages: state.allMessages.map((room) => {
        //   if (room.chattingRoomId === action.payload.chattingRoomId) {
        //     return {
        //       ...room,
        //       messages: [...room.messages, action.payload],
        //     };
        //   } else {
        //     return room;
        //   }
        // }),
      };
    }

    default:
      return state;
  }
};

export default reducers;
