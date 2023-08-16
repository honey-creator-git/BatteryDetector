import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LoginScreen from './AuthenticationPages/LoginScreen.js';
import SignupScreen from './AuthenticationPages/SignupScreen.js';
import MyTabBar from '../components/TabBarComponent.js';

const Tab = createMaterialTopTabNavigator();

const AuthenticationScreen = () => {
    return (
        <Tab.Navigator
            initialRouteName="login"
            tabBar={(props) => <MyTabBar { ...props } />}
            style={{backgroundColor: 'white'}}
        >
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Signup" component={SignupScreen} />
        </Tab.Navigator>
    );
}

export default AuthenticationScreen
