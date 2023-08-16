import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';

export default class RoundButton extends React.Component {
  render() {
    const {title, onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 48,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: '#59C7EA'
  },
  buttonText: {
    fontSize: 14,
    color: 'white'
  },
});
