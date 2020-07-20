import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import io from 'socket.io-client';
const socketClient = io('http://127.0.0.1:3000');

import { GiftedChat } from 'react-native-gifted-chat';

const ChattingScreen = ({
  user,
  friendLists,
  navigation,
  allMessages,
  route,
  changeHideBottomTabStatus,
  addFriendInStore,
  initializeCount,
}) => {
  const { chattingRoomId, friendId } = route.params;
  const [messages, setMessages] = useState([]);
  const [isHeFriend, setIsHeFriend] = useState(false);

  useEffect(() => {
    // disconnect when goback event happens
    navigation.addListener('blur', () => {
      socketClient.disconnect();
      changeHideBottomTabStatus();

      // initialize this chattingRoom count
      initializeCount(chattingRoomId);
    });
    // connect socket when enter this component
    navigation.addListener('focus', () => {
      changeHideBottomTabStatus();
      socketClient.connect();

      // connect socket to friend
      const curUser = {};
      curUser.nickname = user.nickname;
      curUser.friendId = friendId;
      socketClient.emit(`joinRoom`, curUser);

      // initialize this chattingRoom count
      initializeCount(chattingRoomId);
    });

    // render messages at first
    if (allMessages[chattingRoomId]) {
      setMessages(allMessages[chattingRoomId].messages);
    }

    // check is if He is a friend of mine
    let leng = friendLists.length;
    for (let i = 0; i < leng; i++) {
      if (friendLists[i].id === friendId) {
        setIsHeFriend(true);
      }
    }
  }, []);

  useEffect(() => {
    if (allMessages[chattingRoomId]) {
      setMessages([...allMessages[chattingRoomId].messages]);
    }
  }, [allMessages[chattingRoomId]]);

  const sendMessage = (newMsg = []) => {
    newMsg[0].friendId = friendId;
    socketClient.emit('message', newMsg[0]);
  };

  const addFriend = () => {
    fetch('http://127.0.0.1:3000/friendLists/addFriend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user.id, friendId: friendId }),
    })
      .then((res) => res.json())
      .then((res) => {
        // addFriend in store
        addFriendInStore([res]);
        setIsHeFriend(true);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      {!isHeFriend ? (
        <TouchableOpacity style={styles.addFriendButton} onPress={addFriend}>
          <Text>친구 추가</Text>
        </TouchableOpacity>
      ) : null}
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={(msg) => sendMessage(msg)}
          user={{
            _id: user.id,
            name: user.nickname,
            avatar: 'https://placeimg.com/140/140/any',
          }}
          renderUsernameOnMessage={true}
          renderAvatarOnTop={true}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  addFriendButton: {
    display: 'flex',
    height: 30,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapReduxStateToReactProps(state) {
  return {
    user: state.user,
    allMessages: state.allMessages,
    friendLists: state.friendLists,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeHideBottomTabStatus: () => {
      dispatch({ type: 'HIDE_BOTTOM_TAB' });
    },
    addFriendInStore: (friend) => {
      dispatch({ type: 'CHANGE_FRIEND_LISTS', payload: friend });
    },
    initializeCount: (chattingRoomId) => {
      dispatch({ type: 'INITIALIZE_COUNT', payload: chattingRoomId });
    },
  };
}

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(ChattingScreen);
