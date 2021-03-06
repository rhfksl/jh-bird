import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native';
import BottomTabStackScreen from './routers/BottomTabStackScreen';

import io from 'socket.io-client';
const socketClient = io('http://127.0.0.1:3000');

function Main({
  changeFriendLists,
  changeAllMessages,
  changeUserInfo,
  changeCurrentChatRooms,
  addMessageToChattingRoom,
  user,
  logOut,
  isSocketConnected,
}) {
  useEffect(() => {
    // request user Data
    fetch('http://127.0.0.1:3000/users/datas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.user_id }),
    })
      .then((response) => response.json())
      .then((res) => {
        // insert chats and friendsLists in store
        changeUserInfo(res.user);
        changeFriendLists(res.friendLists);

        // reverse all messages for ordering chatting messages
        Object.values(res.allChatRooms).forEach((room) => {
          room.count = 0;
          room.messages.reverse();
        });

        changeAllMessages(res.allChatRooms);

        // connect socketIo to myself for getting messages sent to me
        socketClient.connect();
        socketClient.emit(`joinRoom`, { nickname: res.user.nickname, friendId: res.user.id });

        socketClient.on('message', (message) => {
          // get messages in real time
          addMessageToChattingRoom(message);
        });

        // add current rooms in store
        changeCurrentChatRooms(Object.keys(res.allChatRooms));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!isSocketConnected) {
      // disconnect socketIo before logout
      socketClient.disconnect();
      logOut();
    }
  }, [!isSocketConnected]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <BottomTabStackScreen />
    </SafeAreaView>
  );
}

function mapReduxStateToReactProps(state) {
  return {
    user: state.user,
    currentChatRooms: state.currentChatRooms,
    isLogined: state.isLogined,
    isSocketConnected: state.isSocketConnected,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeUserInfo: (data) => {
      dispatch({ type: 'CHANGE_USER_INFO', payload: data });
    },
    changeFriendLists: (data) => {
      dispatch({ type: 'CHANGE_FRIEND_LISTS', payload: data });
    },
    changeAllMessages: (data) => {
      dispatch({ type: 'CHANGE_ALL_MESSAGES', payload: data });
    },
    changeCurrentChatRooms: (data) => {
      dispatch({ type: 'CHANGE_CURRENT_CHATTING_ROOM', payload: data });
    },
    addMessageToChattingRoom: (data) => {
      dispatch({ type: 'ADD_MESSAGE_TO_CHATTING_ROOM', payload: data });
    },
    logOut: () => {
      dispatch({ type: 'LOG_OUT' });
    },
  };
}

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(Main);
