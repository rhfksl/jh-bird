import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Main from './src/Main';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import BottomTabStackScreen from './src/routers/BottomTabStackScreen';

import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import reducers from './src/reducers';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App() {
  return (
    <Provider store={store}>
      <Main />
      {/* <NavigationContainer>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <BottomTabStackScreen />
        </SafeAreaView>
      </NavigationContainer> */}
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
