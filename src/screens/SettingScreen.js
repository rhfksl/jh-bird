import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

const SettingScreen = ({ user }) => {
  return <View></View>;
};

function mapReduxStateToReactProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapReduxStateToReactProps)(SettingScreen);
