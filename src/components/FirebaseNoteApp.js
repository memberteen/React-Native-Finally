import React, { Component } from 'react';
import { ListView, View, Text, Alert, TextInput, Keyboard, Platform, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Card, Thumbnail, CardItem, ListItem } from 'native-base';

import LoadingViewComponent from './LoadingComponent';
import { signoutAsync } from '../helper';
import AppFooter from './AppFooter'

class FirebaseNoteApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            noteText: '',
            isLoading:false
        };
        this.itemsRef = this.getRef().child('items');
    }

    getRef() { // connect firebase database
        let { firebase } = this.props;
        return firebase.database().ref();
    }
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            
            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    _key: child.key
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items),
                isLoading:false
            });

        });
    }
    componentDidMount() {
        this.setState({ isLoading: true });
        this.listenForItems(this.itemsRef);
    }
    _renderItem(item) {
        const onPress = () => {
            Alert.alert(
                'Delete row',
                null,
                [
                    { text: 'Delete', onPress: (text) => this.itemsRef.child(item._key).remove() },
                    { text: 'Cancel', onPress: (text) => console.log('Cancelled') }
                ]
            );
        };

        return (

            <ListItem onPress={onPress} >
                <Text>{item.title}</Text>
            </ListItem>

        );
    }
    _addItem() {
        this.itemsRef.push({ title: this.state.noteText });
        this.setState({ noteText: '' });
    }
    render() {
        return (
            <Container>
                <Content>
                    <View style={{
                        marginTop: Platform.OS === 'ios' ? 25 : 0,
                        flexDirection: 'row',
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderBottomColor: '#cccccc',
                        borderBottomWidth: 1,
                        marginBottom: 5
                    }}>
                        <TextInput
                            style={{
                                height: 40,
                                marginRight: 10,
                                backgroundColor: 'white',
                                flex: 5
                            }}
                            value={this.state.noteText}
                            onBlur={() => { Keyboard.dismiss() }}
                            onChangeText={(noteText) => this.setState({ noteText })}
                        />
                        <Button stye={{
                            flex: 1
                        }}
                            onPress={this._addItem.bind(this)}
                        >
                            <Icon name="md-add-circle" />
                        </Button>
                    </View>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderItem.bind(this)}
                        enableEmptySections={true}
                    />
                </Content>
                <AppFooter onLogout={() => signoutAsync(this)} tabName="noteapp" />
                <LoadingViewComponent isLoading={this.state.isLoading} />
            </Container>
        );
    }
}

export default FirebaseNoteApp;