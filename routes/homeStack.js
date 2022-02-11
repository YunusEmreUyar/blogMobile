import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Details from '../screens/Details';
import UserPosts from '../screens/UserPost';
import Category from '../screens/Category';
import Login from '../screens/Login';
import Register from '../screens/Register';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default HomeStack = () => {

    const checkIsLoggedIn = () => {
        AsyncStorage.getItem("token")
        .then(val => {
            if(val != null) {
                return true;
            }
            return false;
        })
        .catch(err => {});
    }

    
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={checkIsLoggedIn()? "Home": "Login"}
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="Login" component={Login}></Stack.Screen>
                <Stack.Screen name="Register" component={Register}></Stack.Screen>
                <Stack.Screen name="Home" component={Home}></Stack.Screen>
                <Stack.Screen name="Details" component={Details}></Stack.Screen>
                <Stack.Screen name="Category" component={Category}></Stack.Screen>
                <Stack.Screen name="UserPost" component={UserPosts}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}