import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Modal, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const AddFriend = ({ visible, setModalVisible, friends, user, changeFriendLists }) => {
  const [text, onChangeText] = useState('');

  const requestAddFriend = () => {
    for (let i = 0; i < friends.length; i++) {
      if (friends[i].nickname === text) {
        alert('이미 추가된 닉네임입니다');
        return;
      }
    }

    const body = { userId: user.id, friendNickname: text };
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
          changeFriendLists([res]);
          onChangeText('');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(!visible);
            }}
          >
            <AntDesign name="closecircleo" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            autoFocus={true}
            style={styles.textInput}
            onChangeText={(text) => onChangeText(text)}
            placeholder="닉네임을 검색하세요"
          />
          <TouchableOpacity style={styles.addButton} onPress={requestAddFriend} value={text}>
            <Text style={{ fontSize: 17 }}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: '#D0D2D2',
    height: 150,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 7,
  },
  closeButton: {
    width: 24,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 2,
  },
  textInput: {
    height: 35,
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 7,
    paddingLeft: 7,
    backgroundColor: 'white',
  },
  addButton: {
    width: 35,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 8,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    changeFriendLists: (data) => {
      dispatch({ type: 'CHANGE_FRIEND_LISTS', payload: data });
    },
  };
}

export default connect(null, mapDispatchToProps)(AddFriend);
