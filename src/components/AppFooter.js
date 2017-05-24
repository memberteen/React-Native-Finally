import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Footer, FooterTab, Icon, Button, Text ,Header,View} from 'native-base';
import { Actions } from 'react-native-router-flux';

export default class AppFooter extends Component {
    state = {
        activeTabName: 'contentfeed'
    };
    componentWillMount() {
        let { tabName } = this.props;
        if (tabName !== 'contentfeed') {
            this.setState({ activeTabName: tabName });
        }
    }

    tabAction(tab) {
        this.setState({ activeTabName: tab });
        if (tab === 'contentfeed') {
            Actions.contentfeed({ type: 'reset' });
        } else if (tab === 'noteapp') {
            Actions.noteapp({ type: 'reset' })
        }else if(tab === 'imageuploadapp'){
            Actions.imageuploadapp()
        }
    }

    render() {
        let { onLogout } = this.props;
        return (
            <Header style={{height:80}}>
                <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:5,paddingLeft:10,paddingTop:32}}>
                        <Text style={{textAlign:'left' ,color:'#444',fontFamily:'Avenir-Heavy'}} >Comic World</Text>
                    </View>
                    <View style={{flex:3, paddingLeft:120,paddingTop:20}}>
                        <Button transparent
                            active={(this.state.activeTabName === "logout") ? true : false}
                            onPress={onLogout }  >
                            
                            <Text style={{color:'#fe2a54',textAlign:'center',fontSize:16,fontFamily:'Avenir'} }>Logout</Text>
                        </Button>
                    </View>
            </View>
            </Header>
        );
    }
}