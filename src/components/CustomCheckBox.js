import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import I18n from './../../i18n/i18n';

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
            <View><Text style={{fontSize: 14, color: '#8D9092'}}>{I18n.t('remember')}</Text></View>
        </View>
    );
};
  
export default Checkbox;