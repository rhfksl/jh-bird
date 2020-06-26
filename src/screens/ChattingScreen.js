import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import io from 'socket.io-client';
const socketClient = io('http://127.0.0.1:3000');

import { GiftedChat } from 'react-native-gifted-chat';

const ChattingScreen = ({ user, navigation, allMessages, route, changeHideBottomTabStatus }) => {
  const { chattingRoomId } = route.params;
  const [messages, setMessages] = useState([]);
  // console.log('this is navigation', navigation);

  useEffect(() => {
    // disconnect when goback event happens
    navigation.addListener('blur', () => {
      socketClient.disconnect();
      changeHideBottomTabStatus();
    });
    // connect socket when enter this component
    navigation.addListener('focus', () => {
      changeHideBottomTabStatus();
      socketClient.connect();
      // connect socket to selected chatting room
      const curUser = {};
      curUser.nickname = user.nickname;
      curUser.chattingRoomId = chattingRoomId;
      socketClient.emit(`joinRoom`, curUser);
    });
  }, []);

  useEffect(() => {
    if (allMessages[chattingRoomId]) {
      setMessages([...allMessages[chattingRoomId].messages]);
    }
  }, [allMessages]);

  const onSend = (newMsg = []) => {
    newMsg[0].chattingRoomId = chattingRoomId;
    socketClient.emit('message', newMsg[0]);
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.id,
        name: user.nickname,
        avatar: 'https://placeimg.com/140/140/any',
      }}
      renderUsernameOnMessage={true}
    />
  );
};

function mapReduxStateToReactProps(state) {
  return {
    user: state.user,
    allMessages: state.allMessages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeHideBottomTabStatus: () => {
      dispatch({ type: 'HIDE_BOTTOM_TAB' });
    },
  };
}

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(ChattingScreen);
