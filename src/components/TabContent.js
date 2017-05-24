import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content } from 'native-base';

class TabContent extends Component {
    render() {
        return (
            <Container>
                {this.props.children}
            </Container>
        );
    }
}

export default TabContent;