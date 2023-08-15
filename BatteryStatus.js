import React from 'react';
import { NativeModules, Text, View, StyleSheet, DeviceEventEmitter } from 'react-native';

var BatteryManager = NativeModules.BatteryManager;

export default class BatteryStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batteryLevel: null,
      charging: false,
    };
  }

  onBatteryStatus(info){
    this.setState({batteryLevel: info.level});
    this.setState({charging: info.isPlugged});
  }

  componentDidMount(){
    BatteryManager.updateBatteryLevel(function(info){
      this._subscription = DeviceEventEmitter.addListener('BatteryStatus', this.onBatteryStatus);
      this.setState({batteryLevel: info.level});
      console.log("Battery Level => ", this.state.batteryLevel);
      console.log("Info Level => ", info.level);
      console.log("PlugIn Status => ", info.isPlugged);
      this.setState({charging: info.isPlugged});
    }.bind(this));
  }  
  
  // componentWillUnmount(){
  //   this._subscription.remove();
  // }

  render() {
    var chargingText;
    if(this.state.charging){
      chargingText =<Text style={styles.instructions}>Charging </Text>;
    } else {
      chargingText =<Text style={styles.instructions}>Not Charging </Text>;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Battery Level {this.state.batteryLevel}
        </Text>
        {chargingText}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});