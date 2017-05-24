import React, { Component } from 'react';
import { View, Text, Image, TextInput, StyleSheet, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';

import LoadingViewComponent from './LoadingComponent';
import {checkLogin} from '../helper';

class Login extends Component {
    state = {
        email: '',
        password: '',
        isLoading: false
    }

    checkPassword() {
        Actions.contentfeed({type:'reset'});
    }
    render() {
        return (
            <View style={styles.imagebg}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop:50,
                        flex: 1
                    }}>

                    <Image source={require('../images/Group.png')}
                        style={{
                            width: 235,
                            height: 45,
                        }}
                    />
                </View>
                <View style={{
                        backgroundColor: 'rgba(0,0,0,0)',
                        alignItems: 'center',
                        marginTop:50,
                        flex: 2
                    }}>
                    <View style={styles.viewForm}>
                        <View style={styles.withBorder}>
                            <TextInput
                                style={styles.inputLogin}
                                onBlur={() => { Keyboard.dismiss() }}
                                placeholder={'Username'}
                                onChangeText={(email) => this.setState({ email })}
                            />
                        </View>
                            
                    </View>
                    <View style={styles.viewForm}>
                        <View style={styles.withBorder}>
                            <TextInput
                                style={styles.inputLogin}
                                secureTextEntry={true}
                                placeholder={'Password'}
                                onBlur={() => { Keyboard.dismiss() }}
                                onChangeText={(password) => this.setState({ password })}
                            />
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: 'rgba(0,0,0,0)',
                        alignItems: 'center',
                        marginTop:120,
                        flex: 3,
                        shadowOpacity:0.25,
                        shadowOffset:{width:0,height:5}
                    }}>
                        <Button iconLeft rounded style={{
                            alignSelf: 'center',
                            backgroundColor:'#fe2a54'
                        }}
                            onPress={()=>checkLogin(this)}>
                            <Text style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 16,
                                fontFamily:'Avenir',
                                width:120,
                                textAlign:'center',
                                
                            }}>Login</Text>
                        </Button>
                    </View>
                    <View style={{
                        backgroundColor: 'rgba(0,0,0,0)',
                        alignItems: 'center',
                        marginTop:50,
                        flex: 4,
                    }}>
                        <Button
                            onPress={() => Actions.register({ type: 'reset' })}
                            transparent primary
                            style={{
                                alignSelf:'center'
                            }}
                        >
                            <View style={{borderBottomWidth:1/2}}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#8e8e8e',
                                        textAlign:'center',
                                        fontFamily:'Avenir'
                                    }}>Create Accout</Text>
                            </View>
                        </Button>
                    </View>
                    
                    

                </View>
                <Text>{this.state.email}{this.state.password}</Text>
                <LoadingViewComponent isLoading={this.state.isLoading} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    imagebg: {
        backgroundColor:'#fdfdfd',
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
        fontSize: 18,
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
export default Login;
