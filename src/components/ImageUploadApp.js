import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform,
    Image,
    CameraRoll,
    ActivityIndicator
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import Camera from 'react-native-camera';
import { Button, Icon } from 'native-base';
import {Actions} from 'react-native-router-flux'

import LoadingViewComponent from './LoadingComponent';
import { signoutAsync } from '../helper';
import AppFooter from './AppFooter'
const storage = null;
const storageRef = null;
const uploadImage = null;

class ImageUploadApp extends Component {
    componentWillMount() {
        let { firebase } = this.props;
        storage = firebase.storage();
        storageRef = storage.ref('images');
        const Blob = RNFetchBlob.polyfill.Blob
        const fs = RNFetchBlob.fs
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
        window.Blob = Blob
        uploadImage = (uri, mime = 'application/octet-stream') => {
            return new Promise((resolve, reject) => {
                const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
                const sessionId = new Date().getTime()
                let uploadBlob = null
                const imageRef = storage.ref('images').child(`${sessionId}`)

                fs.readFile(uploadUri, 'base64')
                    .then((data) => {
                        return Blob.build(data, { type: `${mime};BASE64` })
                    })
                    .then((blob) => {
                        uploadBlob = blob
                        return imageRef.put(blob, { contentType: mime })
                    })
                    .then(() => {
                        uploadBlob.close()
                        return imageRef.getDownloadURL()
                    })
                    .then((url) => {
                        resolve(url)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
    constructor(props) {
        super(props)

        this.state = {
            showCam: true
        }
    }
    takePicture() {
        const options = {};
        this.setState({ uploadURL: '', isLoading: true })
        //options.location = ...
        this.camera.capture({ metadata: options })
            .then((data) => {
                uploadImage(data.path)
                    .then(url => this.setState({ uploadURL: url, showCam: false, isLoading: false }))
                    .catch(error => this.setState({ isLoading: false }));
            })
            .catch(err => console.error(err));
    }
    showCamera() {
        if (this.state.showCam) {
            return (
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    <Button transparent style={{
                        flex:1,
                        justifyContent:'flex-end',
                        alignItems:'center'
                    }} onPress={this.takePicture.bind(this)}><Icon name="md-aperture" style={{
                        fontSize:30
                    }} /></Button>
                </Camera>
            )
        } else {
            return (
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20
                }}>
                    <Image
                        source={{ uri: this.state.uploadURL }}
                        style={styles.image}
                    />
                    <Text>{this.state.uploadURL}</Text>

                    <View style={{
                        flexDirection:'row'
                    }}>
                    <Button
                        onPress={() => Actions.pop()}
                    >
                        <Icon name="ios-arrow-back-outline" style={{
                            color: 'white'
                        }} />
                        <Text style={{
                            color: 'white'
                        }}>Back</Text>
                    </Button>
                    <Button
                        onPress={() => this.setState({ showCam: true, isLoading: false })}
                    >
                        <Icon name="md-aperture" />
                        <Text  style={{
                            color: 'white'
                        }}>CAPTURE</Text>
                    </Button>
                    </View>
                </View>
            );
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showCamera()}
                <LoadingViewComponent isLoading={this.state.isLoading} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    image: {
        height: 200,
        resizeMode: 'contain',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    }
});
export default ImageUploadApp;