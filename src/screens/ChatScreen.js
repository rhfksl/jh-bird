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

function ChatScreen({ route, navigation, user, allMessages }) {
  const [messages, setMessages] = useState([]);
  const [text, onChangeText] = useState('');

  const { id, user_id, nickname } = user;
  const { chattingRoomId } = route.params;

  const makeMessageNode = (message) => {
    return (
      <Text key={shortid.generate()}>
        {message.nickname}님의 말: {message.userChat}
      </Text>
    );
  };

  useEffect(() => {
    // disconnect when goback event happens
    navigation.addListener('blur', () => socketClient.disconnect());
    // connect socket when enter this component
    navigation.addListener('focus', () => {
      socketClient.connect();

      // connect socket to selected chatting room
      const curUser = {};
      curUser.nickname = nickname;
      curUser.chattingRoomId = chattingRoomId;
      socketClient.emit(`joinRoom`, curUser);
    });

    // renderAllMessages at first
    let renderMessages = allMessages[chattingRoomId].messages.map(makeMessageNode);
    setMessages(renderMessages);
  }, []);

  useEffect(() => {
    // added renewed message to view
    setMessages(allMessages[chattingRoomId].messages.map(makeMessageNode));
  }, [allMessages[chattingRoomId]]);

  const dismiss = () => {
    Keyboard.dismiss();
  };

  const postMessages = () => {
    // 필요 chattingRoomId, userId, userChat
    const message = {};
    message.userId = id;
    message.nickname = nickname;
    message.chattingRoomId = chattingRoomId;
    message.userChat = text;

    // send message to socket server
    socketClient.emit('message', message);

    // reset text input
    onChangeText('');
  };

  const test = () => {
    const message = {};
    message.userId = id;
    message.chattingRoomId = chattingRoomId;
    message.userChat = '제발좀 보내줘....';
    socketClient.emit('message', message);
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
          <AntDesign
            name="caretcircleoup"
            size={32}
            color="black"
            style={{ marginTop: 4, alignSelf: 'center' }}
            onPress={test}
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
    allMessages: state.allMessages,
  };
}

export default connect(mapReduxStateToReactProps)(ChatScreen);
