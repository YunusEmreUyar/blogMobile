import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const proxy = 'https://pencereblog.pythonanywhere.com/';

function authenticate(username, password, navigation) {
    if(username.length < 3 || password.length < 3) {
        Alert.alert("Yanıt", "Kullanıcı adı ve şifre daha uzun olmalıdır.");
    } else {
        fetch(proxy+"api/token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(resp => resp.json())
        .then(json => {
            if(json.detail) {
                Alert.alert("Yanıt", json.detail);
            } else {
                navigation.navigate("Home");
                handleAsyncStorage(json.access, username, password);
                getUserId();
            }
        })
        .catch(err => {});
    }
};

async function handleStoreUsernamePassword(username, password) {
    try {
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("password", password);
    } catch (error) {
        
    }
}

async function handleAsyncStorage(token, username, password) {
    try {
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("passwd", password);
    } catch (e) {
        
    }
};

function getUserId() {
    AsyncStorage.getItem("username")
    .then(username => {
        fetch(proxy+`api/user/${username}`)
        .then(resp => resp.json())
        .then(json => {
            AsyncStorage.setItem("userId", json.id)
        })
        .catch(err => {});
    })
    .catch(err => {});
}



export {authenticate, handleStoreUsernamePassword, getUserId};