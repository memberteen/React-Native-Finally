import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

export async function checkLogin(_this) {
    let { firebase } = _this.props;
    let { email, password } = _this.state;
    _this.setState({ isLoading: true });
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);

        console.log("Account created");
        Actions.contentfeed({ type: 'reset' });

    } catch (error) {
        Alert.alert(
            '!Error',
            'ไม่สามารถเข้าระบบได้ สมัครใหม่ใหม?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK' }
            ]
        );
        _this.setState({ isLoading: false });
    }

}

export async function signupAsync(_this) {
    let { firebase } = _this.props;
    let { email, password } = _this.state;
    _this.setState({ isLoading: true });
    try {
        let auth = await firebase.auth()
        await auth.createUserWithEmailAndPassword(email, password);
        checkLogin(_this);

    } catch (error) {
        console.log(error.toString());
        Alert.alert(
            '!Error',
            'Signup Error : ' + error.toString() + '\nลองใหม่',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK' }
            ]
        );
        _this.setState({ isLoading: false });
    }
}

export async function signoutAsync(_this) {
    let { firebase } = _this.props;
    _this.setState({ isLoading: true });
    try {
        let auth = await firebase.auth();
        await auth.signOut();
        Actions.login({ type: 'reset' });
    } catch (error) {
        console.log(error.toString());
        Alert.alert(
            '!Error',
            'Signup Error : ' + error.toString() + '\nลองใหม่',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK' }
            ]
        );
        _this.setState({ isLoading: false });
    }
}