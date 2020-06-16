import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as shortid from 'shortid';

function HomeScreen(props) {
  const [friends, setFriendLists] = useState([]);

  // insert friendLists from store into state variable
  useEffect(() => {
    const { friendLists } = props;
    setFriendLists(friendLists);
  }, [props.friendLists]);

  return (
    <View style={{ backgroundColor: 'brown' }}>
      <Text>어서오십쇼 프렌드 리스트</Text>
      {friends.map((val) => {
        return <Text key={shortid.generate()}>{val.nickname}</Text>;
      })}
    </View>
  );
}

function mapReduxStateToReactProps(state) {
  return {
    friendLists: state.friendLists,
  };
}

export default connect(mapReduxStateToReactProps)(HomeScreen);
