import React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { connect } from 'react-redux';

const SettingScreen = ({ user, logOut }) => {
  return (
    <View style={{ paddingTop: 20, paddingLeft: 15 }}>
      <View style={{ flexDirection: 'row' }}>
        <Image style={{ width: 50, height: 50, borderRadius: 55 }} source={{ url: user.img }} />
        <View style={{ paddingLeft: 15 }}>
          <Text style={{ fontSize: 15 }}>{user.nickname}</Text>
          <Text style={{ color: 'gray' }}>{user.user_id}</Text>
        </View>
      </View>
      <Button onPress={logOut} title="logout" />
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
    logOut: () => {
      dispatch({ type: 'LOG_OUT' });
    },
  };
}

export default connect(mapReduxStateToReactProps, mapDispatchToProps)(SettingScreen);
