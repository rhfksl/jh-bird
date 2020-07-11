import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Keyboard,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import * as shortid from 'shortid';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import AddFriend from './Modal/AddFriend';
import Friend from './Modal/Friend';

function HomeScreen({ friendLists, user, changeFriendLists, navigation }) {
  const [friends, setFriendLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [friendModalvisible, setFriendModalVisible] = useState(false);
  const [friendInfo, setFriendInfo] = useState({});

  // insert friendLists from store into state variable
  useEffect(() => {
    setFriendLists(friendLists);
  }, [friendLists]);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
        {modalVisible ? (
          <AddFriend
            visible={modalVisible}
            setModalVisible={setModalVisible}
            user={user}
            friends={friends}
          />
        ) : null}
        {friendModalvisible ? (
          <Friend
            visible={friendModalvisible}
            setFriendModalVisible={setFriendModalVisible}
            friendInfo={friendInfo}
            user={user}
            navigation={navigation}
          />
        ) : null}

        <ScrollView>
          {friends.map((val) => {
            return (
              <TouchableOpacity
                key={shortid.generate()}
                style={styles.friendList}
                onPress={() => {
                  setFriendInfo(val);
                  setFriendModalVisible(!friendModalvisible);
                }}
                activeOpacity={0.7}
              >
                <Text>{val.nickname}</Text>
              </TouchableOpacity>
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
    backgroundColor: 'green',
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
