import React from 'react';
import {View, StyleSheet, Image, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native';
import colors from '../assets/colors/color';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {authenticate} from '../utils/AuthUtils';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.navigation = props.navigation;
    }

    setUsername = (e) => {
        this.setState({username: e.nativeEvent.text});
    }
    
    setPassword = (e) => {
        this.setState({password: e.nativeEvent.text});
    }

    render() {

        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/icon.png')}
                    style={styles.icon}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <Text style={styles.helperText}>Username</Text>
                    <TextInput 
                        placeholder='username'
                        style={styles.input}
                        onChange={this.setUsername}
                    />
                    <Text style={styles.helperText}>Password</Text>
                    <TextInput
                        placeholder='password'
                        style={styles.input}
                        secureTextEntry
                        onChange={this.setPassword}
                    />

                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => authenticate(this.state.username, this.state.password, this.navigation)}
                    >
                        <Text style={styles.loginBtnText}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.registerLink}>
                        <Text>Need an account?</Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Register")}
                            style={{marginHorizontal: 10}}
                        >
                            <Text style={{color: colors.price}}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 20
    },
    input: {
        minWidth: '80%',
        maxWidth: '80%',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 10,
        borderRadius: 15,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10
    },
    helperText: {
        marginTop: 10,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        marginHorizontal: 10
    },
    loginBtn: {
        margin: 10,
        padding: 10,
        alignSelf: 'center',
        backgroundColor: colors.price,
        borderBottomEndRadius: 10,
        borderTopStartRadius: 10,
        minWidth: '50%'
    },
    loginBtnText: {
        color: '#fff',
        fontFamily: 'Montserrat-SemiBold',
        alignSelf: 'center'
    },
    registerLink: {
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 10
    }

});