import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Keyboard,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import * as shortid from 'shortid';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import AddFriend from './Modal/AddFriend';

function HomeScreen({ friendLists, user, changeFriendLists, navigation }) {
  const [friends, setFriendLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  // const [text, onChangeText] = useState('');

  // insert friendLists from store into state variable
  useEffect(() => {
    setFriendLists(friendLists);
  }, [friendLists]);

  // const addFriend = () => {
  //   const checkFriendArr = friendLists.map((friend) => friend.nickname);
  //   if (checkFriendArr.includes(text)) {
  //     alert('이미 추가된 닉네임입니다');
  //     return;
  //   }
  //   const body = { myNickname: user.nickname, friendNickname: text };
  //   fetch('http://127.0.0.1:3000/friendLists/addFriend', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(body),
  //   })
  //     .then((response) => response.json())
  //     .then((res) => {
  //       if (res.body === 'not exist') {
  //         alert('존재하지 않는 닉네임입니다');
  //       } else {
  //         changeFriendLists([res.body]);
  //         onChangeText('');
  //       }
  //     })
  //     .catch((err) => console.log(err));
  //   };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
        {modalVisible ? (
          <AddFriend
            visible={modalVisible}
            setModalVisible={setModalVisible}
            nickname={user.nickname}
            friends={friends}
          />
        ) : null}

        <ScrollView>
          <Text>어서오십쇼 프렌드 리스트</Text>
          {friends.map((val) => {
            return (
              <View key={shortid.generate()} style={styles.friendList}>
                <Text>{val.nickname}</Text>
              </View>
            );
          })}
        </ScrollView>
        <View style={{ flex: 1 }}>
          <TouchableHighlight
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={styles.buttonContainer}
          >
            <AntDesign name="pluscircle" size={35} color="black" style={styles.addButton} />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('chatting', { chattingRoomId: 2 });
            }}
          >
            <AntDesign name="pluscircle" size={50} color="black" />
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  friendList: {
    paddingLeft: 10,
    paddingTop: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  textInput: {
    height: 30,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 7,
    paddingLeft: 7,
    backgroundColor: 'white',
  },
  buttonContainer: {
    // backgroundColor: 'blue',
    width: 38,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  addButton: {
    // alignSelf: 'flex-end',
    // marginRight: 10,
    // marginTop: 10,
  },
});

function mapReduxStateToReactProps(state) {
  return {
    friendLists: state.friendLists,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeFriendLists: (data) => {
      dispatch({ type: 'CHANGE_FRIEND_LISTS', payload: data });
    },
  };
}

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(HomeScreen);
