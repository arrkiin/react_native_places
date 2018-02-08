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
    state = {
        viewMode:
            Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    };
    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', this.updateStyles);
    }
    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyles);
    }
    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? 'portrait' : 'landscape',
        });
    };
    loginHandler = () => {
        startMainTabs();
    };
    render() {
        let headingText = null;
        if (this.state.viewMode == 'portrait') {
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
                            style={
                                this.state.viewMode === 'portrait'
                                    ? styles.portraitPasswordContainer
                                    : styles.landscapePasswordContainer
                            }
                        >
                            <DefaultInput
                                style={[
                                    styles.input,
                                    this.state.viewMode === 'portrait'
                                        ? styles.portraitPwInput
                                        : styles.landscapePwInput,
                                ]}
                                placeholder="Password"
                            />
                            <DefaultInput
                                style={[
                                    styles.input,
                                    this.state.viewMode === 'portrait'
                                        ? styles.portraitPwInput
                                        : styles.landscapePwInput,
                                ]}
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
    portraitPasswordContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    landscapePasswordContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    portraitPwInput: {
        width: '100%',
    },
    landscapePwInput: {
        width: '48%',
    },
});

export default AuthScreen;
