import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import store from './redux/store.js';

import Navigation from './Navigation';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SafeAreaProvider>
        <Provider store={ store }>
          <Navigation />
        </Provider>
      </SafeAreaProvider>
    )
  }
}