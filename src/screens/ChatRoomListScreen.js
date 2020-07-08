import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import shortid from 'shortid';

function ChatRoomListScreen({ navigation, allMessages, currentChatRooms, user, friendLists }) {
  const [chatRoomLists, setChatRoomLists] = useState([]);

  const getFriendNickname = (roomInfo) => {
    if (roomInfo.userId === user.id) {
      return { roomname: roomInfo.roomname2, friendId: roomInfo.userId2 };
    } else {
      return { roomname: roomInfo.roomname, friendId: roomInfo.userId };
    }
  };

  const makeChatRoomComponent = (roomId, roomInfo) => {
    const { friendId, roomname } = getFriendNickname(roomInfo);
    return (
      <TouchableOpacity
        key={shortid.generate()}
        style={{ backgroundColor: 'yellow', height: 70, marginBottom: 10 }}
        onPress={() => {
          navigation.navigate('chatting', {
            chattingRoomId: roomId,
            friendId: friendId,
          });
        }}
      >
        <Text>{roomname}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (currentChatRooms.length) {
      const changeRoomOrder = [];
      for (let room of currentChatRooms) {
        changeRoomOrder.push(makeChatRoomComponent(room, allMessages[room]));
      }
      setChatRoomLists(changeRoomOrder);
    }
  }, [currentChatRooms]);

  return (
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <ScrollView>{chatRoomLists}</ScrollView>
    </View>
  );
}

function mapReduxStateToReactProps(state) {
  return {
    allMessages: state.allMessages,
    currentChatRooms: state.currentChatRooms,
    user: state.user,
    friendLists: state.friendLists,
  };
}

export default connect(mapReduxStateToReactProps)(ChatRoomListScreen);
