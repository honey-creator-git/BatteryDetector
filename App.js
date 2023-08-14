import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import BatteryStatus from './BatteryStatus.js';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <SafeAreaProvider>
        <BatteryStatus />
      </SafeAreaProvider>
    )
  }
}