import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

const Checkbox = ({
    id,
    btnstyles,
    btnstylesSelect,
    checked,
    selectedIndex,
    onCheckboxChange,
}) => {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            {selectedIndex !== id ? (
                <TouchableOpacity
                style={btnstyles}
                onPress={() => {
                    onCheckboxChange(id);
                }}></TouchableOpacity>
            ) : (
                <TouchableOpacity
                style={btnstylesSelect}
                onPress={() => {
                    onCheckboxChange(id);
                }}></TouchableOpacity>
            )}
            <View><Text style={{fontSize: 14, color: '#8D9092'}}>Remember</Text></View>
        </View>
    );
};
  
export default Checkbox;