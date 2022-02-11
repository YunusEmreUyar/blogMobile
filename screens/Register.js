import React from 'react';
import {View, Alert, Image, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Text, TextInput, ActivityIndicator} from 'react-native';
import colors from '../assets/colors/color';
import GoBackButton from '../components/GoBackButton';
import {handleStoreUsernamePassword, authenticate} from '../utils/AuthUtils';


const proxy = "https://artandmovieisnotgonnabethename.herokuapp.com";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: '',
            isFetching: false,
        }
        this.navigation = props.navigation;
    }

    handleSubmit = () => {
        if(
            this.state.username.length > 3 &&
            this.state.password.length > 3 &&
            this.state.password2.length > 3 &&
            this.state.email.length > 3    
        ) {
            console.log(this.state);
            fetch(proxy+"/api/register/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    password2: this.state.password2,
                    email: this.state.email
                })
            })
            .then(response => response.json())
            .then(json => {
                if(json.detail) {
                    Alert.alert("Response", json.detail);
                } else {
                    handleStoreUsernamePassword(this.state.username, this.state.password);
                    this.navigation.navigate("Login");
                    Alert.alert("Response", "Please confirm your email before using this app.");
                }
            })
            .catch(err => {});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    contentInsetAdjustmentBehavior="automatic"
                    showsVerticalScrollIndicator={false}    
                >
                    {/* Go Back Button */}
                    <GoBackButton navigation={this.navigation}/>
                    {/* Main Section */}
                    <View style={styles.innerContainer}>
                        <Image
                            source={require('../assets/icon.png')}
                            style={styles.icon}
                        />
                        <KeyboardAvoidingView
                                keyboardVerticalOffset={-500}
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={{flex:1}}
                            >
                            <Text style={styles.helperText}>Username</Text>
                            <TextInput 
                                placeholder='username'
                                style={styles.input}
                                onChange={(e) => this.setState({username:e.nativeEvent.text})}
                            />
                            <Text style={styles.helperText}>Email</Text>
                            <TextInput 
                                placeholder='email'
                                style={styles.input}
                                onChange={(e) => this.setState({email:e.nativeEvent.text})}
                            />
                            <Text style={styles.helperText}>Password</Text>
                            <TextInput
                                placeholder='password'
                                style={styles.input}
                                secureTextEntry
                                onChange={(e) => this.setState({password:e.nativeEvent.text})}
                            />
                            <Text style={styles.helperText}>Password confirm</Text>
                            <TextInput
                                placeholder='password confirm'
                                style={styles.input}
                                secureTextEntry
                                onChange={(e) => this.setState({password2:e.nativeEvent.text})}
                            />
                            {
                                this.state.isFetching
                                ?   (<ActivityIndicator size={"large"} color={colors.price} />)
                                :   (<TouchableOpacity
                                        style={styles.loginBtn}
                                        onPress={() => {
                                            this.setState({isFetching: true});
                                            this.handleSubmit()
                                        }}
                                    >
                                        <Text style={styles.loginBtnText}>Login</Text>
                                    </TouchableOpacity>)
                            }

                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            </View>
            
        );
    }
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        borderRadius: 20,
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
    }
});