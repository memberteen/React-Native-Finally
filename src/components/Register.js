import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import {checkLogin,signupAsync} from '../helper';

import LoadingViewComponent from './LoadingComponent'

class Register extends Component {
    state = {
        email: '',
        password: '',
        repassword: '',
        isLoading: false
    }
    render() {
        return (
            <View style={styles.imagebg}>
                <View
                    style={{
                        alignItems: 'center',
                        marginTop: 119.5,
                        flex: 1
                    }}>

                    <Image source={require('../images/Group.png')}
                        style={{
                            width: 235,
                            height: 45
                        }}
                    />
                </View>
                <View style={{flex:2 ,marginTop:120}}>
                    <View style={styles.viewForm}>
                        <View style={styles.withBorder}>
                            <TextInput
                                style={styles.inputLogin}
                                onBlur={() => { Keyboard.dismiss() }}
                                onChangeText={(email) => this.setState({ email })}
                                placeholder={'Email'}
                            />
                        </View>
                    </View>
                    <View style={styles.viewForm}>
                        <View style={styles.withBorder}>
                            <TextInput
                                style={styles.inputLogin}
                                secureTextEntry={true}
                                onBlur={() => { Keyboard.dismiss() }}
                                placeholder={'Password'}
                                onChangeText={(password) => this.setState({ password })}
                        />
                        </View>
                    </View>
                    <View style={styles.viewForm}>
                        <View style={styles.withBorder}>
                            <TextInput
                                style={styles.inputLogin}
                                secureTextEntry={true}
                                placeholder={'Comfirm-Password'}
                                onBlur={() => { Keyboard.dismiss() }}
                                onChangeText={(repassword) => this.setState({ repassword })}
                            />
                        </View>
                        
                    </View>
                </View>
                <View style={{flex:3,marginTop:219.5}}>
                    <Button  rounded style={{
                        alignSelf: 'center',
                        backgroundColor:'#fe2a54',
                        shadowOpacity:0.25,
                        shadowOffset:{width:0,height:5}
                    }}
                        onPress={()=>signupAsync(this)}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 16,
                            fontFamily:'Avenir',
                            width:120,
                            textAlign:'center'
                        }}>Register</Text>
                    </Button>
                </View>
                <View style={{flex:4, marginTop:40}}>
                    <Button
                        onPress={() => Actions.login({ type: 'reset' })}
                        transparent primary
                        style={{
                            alignSelf: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                textAlign: 'center',
                                paddingBottom: -60,
                                color: '#8e8e8e',
                                fontFamily:'Avenir'
                            }}>Back to Login</Text>
                    </Button>

                </View>
                <LoadingViewComponent isLoading={this.state.isLoading} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    imagebg: {
        backgroundColor: '#fdfdfd',
        width: null,
        height: null,
        flex: 1
        
    },
    viewForm: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:46,
        marginRight:46,
        marginTop:6,
        marginBottom:6
    },
    labelLogin: {
        color: 'white',
        textAlign: 'right',
        fontWeight: 'bold',
        fontSize: 17,
        marginRight: 10,
        flex: 1
    },
    inputLogin: {
        height: 40,
        fontFamily:'Avenir'
    },
    withBorder: {
        flex: 1,
        borderBottomWidth:1/2,
        borderBottomColor: '#fe2a54'
    }
});
export default Register;
