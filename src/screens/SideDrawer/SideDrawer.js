import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

class SideDrawer extends Component {
    render() {
        return (
            <View
                style={[
                    styles.constainer,
                    { width: Dimensions.get('window').width * 0.8 }
                ]}
            >
                <Text>Text</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    constainer: {
        paddingTop: 22,
        backgroundColor: 'white',
        flex: 1
    }
});

export default SideDrawer;
