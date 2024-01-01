import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    TextInput,

} from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const widthHeight = Dimensions.get('window').height;

export default SignUp = ({ navigation }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isVisible, setIsVisible] = React.useState(false);

    const handleLogin = async () => {
        await axios.post('https://w2c.onrender.com/auth/login', { email: email.toLowerCase() , password })
            .then(async res => {
                const token = res.data.accessToken
                await AsyncStorage.setItem('my-token', token);
                navigation.navigate('HomeTabs')
            })
            .catch(error => console.log(error))
    }

    return (
        <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
            <StatusBar barStyle='dark-content' />
            <SafeAreaView style={{}}>
                <View style={{ width: '100%', height: '100%' }}>
                    {/* Title */}
                    <Text style={styles.title}>đăng nhập</Text>

                    {/* Email & Password Input */}
                    <View style={styles.inputContainer}>

                        {/* Email Input */}
                        <View style={styles.input}>
                            <View style={{ marginRight: 15 }}>
                                <Feather name="mail" size={25} color="#7C808D" />
                            </View>
                            <TextInput
                                style={styles.textInput}
                                keyboardType='email-address'
                                placeholder='Địa chỉ Email'
                                placeholderTextColor="#7C808D"
                                selectionColor="#3662AA"
                                onChangeText={setEmail}
                                value={email}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.input}>
                            <View style={{ marginRight: 15 }}>
                                <Feather name="lock" size={25} color="#7C808D" />
                            </View>
                            <TextInput
                                style={styles.textInput}
                                keyboardType='visible-password'
                                placeholder='Mật khẩu'
                                secureTextEntry={!isVisible}
                                placeholderTextColor="#7C808D"
                                selectionColor="#3662AA"
                                onChangeText={setPassword}
                                value={password}
                            />
                            <TouchableOpacity
                                style={styles.visibleButton}
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                <Feather name={isVisible ? 'eye' : 'eye-off'} size={20} color="#7C808D" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* LogIn Button & SignUp Button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                            <Text style={{ fontSize: 16, fontWeight: '500', color: '#C67C4D' }}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                        >
                            <Text style={styles.loginButtonText}>Đăng nhập</Text>
                        </TouchableOpacity>
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupContainerText}>Bạn chưa có tài khoản?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                <Text style={styles.signupButtonText}>Đăng kí ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        textTransform: 'capitalize',
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 0.2 * widthHeight,
    },
    inputContainer: {
        marginTop: 40,
        marginHorizontal: 40,
    },
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    textInput: {
        flex: 1,
        borderBottomWidth: 1.5,
        paddingBottom: 10,
        borderBottomColor: "#eee",
        fontSize: 16,
        textTransform: 'lowercase'
    },
    visibleButton: {
        position: 'absolute',
        right: 0,
    },
    buttonContainer: {
        marginHorizontal: 40,
    },
    loginButton: {
        backgroundColor: "#C67C4D",
        padding: 14,
        borderRadius: 10,
        marginTop: 40,
    },
    loginButtonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "500",
        fontSize: 16,
        textTransform: 'capitalize',
    },
    signupContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 20,
    },
    signupContainerText: {
        marginRight: 10,
        fontSize: 16,
        color: '#7C808D',
    },
    signupButtonText: {
        fontSize: 16,
        color: '#C67C4E',
        fontWeight: '500',
    },

});