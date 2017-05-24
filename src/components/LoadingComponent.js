import React, { Component, PropTypes } from 'react';
import { View, ActivityIndicator,Text } from 'react-native';

LoadingViewComponent.prototype = {
    isLoading: PropTypes.bool
}
function LoadingViewComponent(props) {
    const { isLoading } = props;
    if (isLoading) {
        return (
            <View style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,0.60)',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <ActivityIndicator
                    color="white"
                />
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#ffffff'
                }}>Loading...</Text>
            </View>
        );
    } else {
        return null;
    }
}

export default LoadingViewComponent;
