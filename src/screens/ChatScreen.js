import React, { useState, useEffect, useRef } from 'react';
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
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Item,
  Keyboard,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { AntDesign } from '@expo/vector-icons';
import * as shortid from 'shortid';

import io from 'socket.io-client';
const socketClient = io('http://127.0.0.1:3000');

function ChatScreen({ route, navigation, user, allMessages }) {
  const [messages, setMessages] = useState([]);
  const [text, onChangeText] = useState('');

  let flatList = useRef();

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
    // setMessages(allMessages[chattingRoomId].messages.map(makeMessageNode));
    // flatList.current.scrollToEnd();
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

  const flatItem = (message) => {
    return (
      <Text key={shortid.generate()} style={{ backgroundColor: 'blue' }}>
        {message.nickname}님의 말: {message.userChat}
      </Text>
    );
  };

  const getItemLayout = (data, index) => {
    return { length: data.length, offset: data.length * index, index };
  };

  return (
    <>
      {/* <View style={{ backgroundColor: 'gray', flex: 1 }}> */}
      {/* <KeyboardAvoidingView
          behavior="position"
          enabled
          style={{ display: 'flex', flex: 1, flexGrow: 1, backgroundColor: 'green' }}
        > */}
      <KeyboardAvoidingView
        // behavior={Platform.OS == 'ios' ? 'position' : 'height'}
        behavior="position"
        keyboardVerticalOffset={60}
        style={{ flex: 1, backgroundColor: 'green' }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ backgroundColor: 'yellow', display: 'flex' }}
        >
          <FlatList
            ref={flatList}
            getItemLayout={getItemLayout}
            initialScrollIndex={allMessages[chattingRoomId].messages.length - 1}
            onContentSizeChange={() => flatList.current.scrollToEnd({ animated: false })}
            data={allMessages[chattingRoomId].messages}
            renderItem={({ item }) => flatItem(item)}
            keyExtractor={(item) => item.id.toString()}
            style={{ height: '90%', display: 'flex', backgroundColor: 'yellow' }}
            // contentContainerStyle={{
            //   display: 'flex',
            //   justifyContent: 'flex-end',
            //   flex: 1,
            // }}
          />
        </TouchableWithoutFeedback>

        {/* <View style={{ backgroundColor: 'red', height: '50%' }}>{messages}</View> */}
        {/* <KeyboardAvoidingView
          behavior="padding"
          enabled
          keyboardVerticalOffset={60}
          style={{ backgroundColor: 'yellow', flex: 1 }}
        > */}
        <View style={{ backgroundColor: 'purple', height: '10%', flexDirection: 'row' }}>
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
      </KeyboardAvoidingView>
      {/* </View> */}
    </>
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
