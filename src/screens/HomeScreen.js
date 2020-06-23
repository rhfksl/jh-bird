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

function HomeScreen({ friendLists, user, changeFriendLists }) {
  const [friends, setFriendLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState('');

  // insert friendLists from store into state variable
  useEffect(() => {
    setFriendLists(friendLists);
  }, [friendLists]);

  const addFriend = () => {
    const checkFriendArr = friendLists.map((friend) => friend.nickname);
    if (checkFriendArr.includes(text)) {
      alert('이미 추가된 닉네임입니다');
      return;
    }
    const body = { myNickname: user.nickname, friendNickname: text };
    fetch('http://127.0.0.1:3000/friendLists/addFriend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.body === 'not exist') {
          alert('존재하지 않는 닉네임입니다');
        } else {
          changeFriendLists([res.body]);
          onChangeText('');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <TouchableHighlight
              style={{
                backgroundColor: '#2196F3',
                width: 14,
                alignSelf: 'flex-end',
                marginRight: 10,
                marginBottom: 2,
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={{ fontSize: 20 }}>X</Text>
            </TouchableHighlight>
            <TextInput
              autoFocus={true}
              style={styles.textInput}
              onChangeText={(text) => onChangeText(text)}
              placeholder="닉네임을 검색하세요"
            />
            <TouchableHighlight
              style={{
                backgroundColor: '#2196F3',
                width: 30,
                alignSelf: 'flex-end',
                marginRight: 10,
                marginTop: 8,
              }}
              onPress={addFriend}
              value={text}
            >
              <Text>Add</Text>
            </TouchableHighlight>
          </View>
        </Modal>
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
        <TouchableHighlight
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          style={styles.buttonContainer}
        >
          <AntDesign name="pluscircle" size={35} color="black" style={styles.addButton} />
        </TouchableHighlight>
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
