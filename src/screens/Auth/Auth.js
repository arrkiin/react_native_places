import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions,
} from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWIthBackground';

import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
    state = {};
    getDimensions = () => {
        return {
            pwContainer: {
                flexDirection:
                    Dimensions.get('window').height > 500 ? 'column' : 'row',
            },
            pwInput: {
                width: Dimensions.get('window').height > 500 ? '100%' : '48%',
            },
        };
    };
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', dims => {
            this.setState({ ...this.getDimensions() });
        });
    }
    componentDidMount() {
        this.setState({ ...this.getDimensions() });
    }
    loginHandler = () => {
        startMainTabs();
    };
    render() {
        let headingText = null;
        if (Dimensions.get('window').height > 500) {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }
        return (
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    {headingText}
                    <ButtonWithBackground
                        color="#29aaf4"
                        onPress={() => alert('Login')}
                    >
                        Switch to Login
                    </ButtonWithBackground>
                    <View style={styles.inputContainer}>
                        <DefaultInput
                            style={styles.input}
                            placeholder="Your E-Mail Address"
                        />
                        <View
                            style={[
                                styles.passwordContainer,
                                this.state.pwContainer,
                            ]}
                        >
                            <DefaultInput
                                style={[styles.input, this.state.pwInput]}
                                placeholder="Password"
                            />
                            <DefaultInput
                                style={[styles.input, this.state.pwInput]}
                                placeholder="Confirm Password"
                            />
                        </View>
                    </View>
                    <ButtonWithBackground
                        color="#29aaf4"
                        onPress={this.loginHandler}
                    >
                        Submit
                    </ButtonWithBackground>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: '100%',
        flex: 1,
    },
    inputContainer: {
        width: '80%',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb',
    },
    passwordContainer: {
        width: '100%',
        justifyContent: 'space-between',
    },
});

export default AuthScreen;
