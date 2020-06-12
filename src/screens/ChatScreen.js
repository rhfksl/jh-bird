import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import * as shortid from 'shortid';

import io from 'socket.io-client';
const socketClient = io('http://localhost:3000');

function ChatScreen({ route, navigation, user, curRoomId, possible }) {
  const [messages, setMessages] = useState([]);
  const { user_id, nickname } = user;
  const { chattingRoomId } = route.params;

  const curUser = {};
  curUser.nickname = nickname;
  curUser.chattingRoomId = chattingRoomId;

  // disconnect when goback event happens
  useEffect(() => navigation.addListener('blur', () => socketClient.disconnect(), []));

  // connect socket when enter this component
  useEffect(
    () =>
      navigation.addListener(
        'focus',
        () => socketClient.connect(),
        socketClient.emit(`joinRoom`, curUser)
      ),
    []
  );

  // get all messages at first
  socketClient.on('firstMsg', (res) => {
    const firstMsgArr = [];
    res.forEach((msg) => {
      const addMessage = (
        <Text key={shortid.generate()}>
          {msg.User.nickname}님의 말: {msg.userChat}
        </Text>
      );
      firstMsgArr.push(addMessage);
    });
    setMessages([...messages, ...firstMsgArr]);
  });

  socketClient.on('message', (res) => {
    console.log('메세지를 받아요', res);

    // let newMsg = res.map((message) => message.userChat);
    // setMessages([...messages, ...newMsg]);
  });

  const dismiss = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dismiss();
      }}
    >
      <View style={{ height: '100%', backgroundColor: 'gray' }}>
        <View style={{ backgroundColor: 'red' }}>
          <TouchableHighlight
            onPress={() => {
              socketClient.emit('message', {
                user_id: user_id,
                userChat: '바뀜?',
                chattingRoom_id: chattingRoom_id,
              });
            }}
            underlayColor="red"
          >
            <Text>새로운 채팅을 보내보잣</Text>
          </TouchableHighlight>

          <Text>채팅시작</Text>
          {messages}

          <TextInput
            style={{
              height: 40,
              backgroundColor: 'white',
              borderColor: 'tomato',
              borderWidth: 1,
              marginHorizontal: 20,
              marginVertical: 10,
              paddingHorizontal: 10,
            }}
            //  onFocus={this._onFocusTextField}
            placeholder="Type here!"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function mapReduxStateToReactProps(state) {
  return {
    user: state.user,
    curRoomId: state.curRoomId,
  };
}

export default connect(mapReduxStateToReactProps)(ChatScreen);
