import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as shortid from 'shortid';

import io from 'socket.io-client';
const socketClient = io('http://localhost:3000');

function ChatScreen({ route, navigation, user, allChatRooms }) {
  const [messages, setMessages] = useState([]);
  const [text, onChangeText] = useState('');

  const { id, user_id, nickname } = user;
  const { chattingRoomId } = route.params;

  useEffect(() => {
    // disconnect when goback event happens
    navigation.addListener('blur', () => socketClient.disconnect());
    // connect socket when enter this component
    navigation.addListener('focus', () => {
      socketClient.connect();

      const curUser = {};
      curUser.nickname = nickname;
      curUser.chattingRoomId = chattingRoomId;
      socketClient.emit(`joinRoom`, curUser);
    });
    let renderMessages = allChatRooms
      .filter((room) => room.chattingRoomId === chattingRoomId)[0]
      .messages.map((msg) => {
        return (
          <Text key={shortid.generate()}>
            {msg.nickname}님의 말: {msg.userChat}
          </Text>
        );
      });
    setMessages(renderMessages);
  }, []);

  socketClient.on('message', (res) => {
    console.log('메세지를 받아요', res);

    // let newMsg = res.map((message) => message.userChat);
    // setMessages([...messages, ...newMsg]);
  });

  const dismiss = () => {
    Keyboard.dismiss();
  };

  const postMessages = (e) => {
    // 필요 chattingRoomId, userId, userChat
    const message = {};
    message.userId = id;
    message.chattingRoomId = chattingRoomId;
    message.userChat = text;
    // socketClient.emit('message', message);
    // console.log('msg', message);
    // e.firstChild.value = '';
    onChangeText('');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        dismiss();
      }}
    >
      <View style={{ height: '100%', backgroundColor: 'gray' }}>
        <View style={{ backgroundColor: 'red' }}>
          {messages}

          <View style={{ backgroundColor: 'purple', display: 'flex', flexDirection: 'row' }}>
            <TextInput
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                flexGrow: 1,
                height: 30,
                backgroundColor: 'white',
                // borderColor: 'tomato',
                borderWidth: 1,
                marginLeft: 20,
                // marginHorizontal: 20,
                marginVertical: 10,
                paddingHorizontal: 10,
              }}
              onChangeText={(text) => onChangeText(text)}
              value={text}
              placeholder="채팅을 입력하세요"
            ></TextInput>
            <AntDesign
              name="caretcircleoup"
              size={32}
              color="black"
              style={{ marginTop: 4, alignSelf: 'center' }}
              onPress={postMessages}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function mapReduxStateToReactProps(state) {
  return {
    user: state.user,
    curRoomId: state.curRoomId,
    allChatRooms: state.userData.allChatRooms,
  };
}

export default connect(mapReduxStateToReactProps)(ChatScreen);
