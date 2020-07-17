import React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

const SettingScreen = ({ user, disconnectSocket }) => {
  return (
    <View style={{ paddingTop: 20, paddingLeft: 15 }}>
      <View style={{ flexDirection: 'row' }}>
        <Image style={{ width: 50, height: 50, borderRadius: 55 }} source={{ url: user.img }} />
        <View style={{ paddingLeft: 15 }}>
          <Text style={{ fontSize: 15 }}>{user.nickname}</Text>
          <Text style={{ color: 'gray' }}>{user.user_id}</Text>
        </View>
      </View>
      <Button onPress={disconnectSocket} title="logout" />
    </View>
  );
};

function mapReduxStateToReactProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    disconnectSocket: () => {
      dispatch({ type: 'IS_SOCKET_CONNECTED' });
    },
  };
}

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(SettingScreen);
