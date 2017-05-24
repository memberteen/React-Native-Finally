import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import { Icon } from 'native-base';
import * as firebase from 'firebase'


import Login from './components/Login'
import Register from './components/Register'
import ContentFeed from './components/ContentFeed'
import FirebaseNoteApp from './components/FirebaseNoteApp'
import ImageUploadApp from './components/ImageUploadApp'

const LogoutIcon = ({ selected }) => {
    return (
        <View style={{
            justifyContent: 'center',
            margin: 5,
            alignItems: 'center',
            flex: 1
        }}>
            <Icon name="md-lock" style={{ color: selected ? 'red' : 'black', fontSize: selected ? 35 : 25 }} />
            <Text style={{ fontSize: 12, color: selected ? 'red' : 'black' }}>{title}</Text>
        </View>
    )
}
const TabIcon = ({ selected, title }) => {
    var iconname = 'md-home';
    if (title === 'Home Feed') {
        iconname = 'logo-buffer';
    } else if (title === 'Logout') {
        iconname = 'md-lock';
    }
    return (
        <View style={{
            justifyContent: 'center',
            margin: 5,
            alignItems: 'center',
            flex: 1
        }}>
            <Icon name={iconname} style={{ color: selected ? 'red' : 'black', fontSize: selected ? 35 : 25 }} />
            <Text style={{ fontSize: 12, color: selected ? 'red' : 'black' }}>{title}</Text>
        </View>
    );
}
export default class App extends Component {
    componentWillMount() {
        var config = {
            apiKey: "AIzaSyA5_BXuGrMEMlg4fdAXqJmeDv7MpWv3jNY",
            authDomain: "blazing-torch-3505.firebaseapp.com",
            databaseURL: "https://blazing-torch-3505.firebaseio.com",
            projectId: "blazing-torch-3505",
            storageBucket: "blazing-torch-3505.appspot.com",
            messagingSenderId: "529412272501"
        };
        firebase.initializeApp(config);
    }
    render() {
        return (
            <Router>
                <Scene key="root">

                    <Scene key="login" component={Login} title="Login" hideNavBar initial firebase={firebase} />
                    <Scene key="register" component={Register} title="Register" hideNavBar firebase={firebase} />
                    <Scene key="contentfeed" component={ContentFeed} title="Home Feed" hideNavBar firebase={firebase} />
                    <Scene key="noteapp" component={FirebaseNoteApp} title="NoteApp" hideNavBar firebase={firebase} />
                    <Scene key="imageuploadapp" component={ImageUploadApp} title="ImageUploadApp" hideNavBar firebase={firebase} />
                </Scene>
            </Router>
        );
    }
}
let style = StyleSheet.create({
    tabBarStyle: {
        overflow: 'hidden',
        padding: 5,
        backgroundColor: '#EEEEEE',
        opacity: .8,
        alignItems: 'center',
        justifyContent: 'center'
    }
});