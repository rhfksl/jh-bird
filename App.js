import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Main from './src/Main';
import Switch from './src/Switch';

// set redux store
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/reducers';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App() {
  return (
    <Provider store={store}>
      <Switch></Switch>
      {/* <Main /> */}
    </Provider>
  );
}
