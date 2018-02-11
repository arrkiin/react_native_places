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
import validate from '../../utility/validation';

import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
    state = {
        viewMode:
            Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true,
                },
                touched: false,
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6,
                    equalTo: 'confirmPassword',
                },
                touched: false,
            },
            confirmPassword: {
                value: '',
                valid: false,
                validationRules: {
                    equalTo: 'password',
                },
                touched: false,
            },
        },
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
    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules
                .equalTo;
            if (this.state.controls[equalControl].touched) {
                const equalValue = this.state.controls[equalControl].value;
                connectedValue = {
                    ...connectedValue,
                    equalTo: equalValue,
                };
            }
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true,
                    },
                },
            };
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
                            value={this.state.controls.email.value}
                            onChangeText={value =>
                                this.updateInputState('email', value)
                            }
                            valid={this.state.controls.email.valid}
                            touched={this.state.controls.email.touched}
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
                                value={this.state.controls.password.value}
                                onChangeText={value =>
                                    this.updateInputState('password', value)
                                }
                                valid={this.state.controls.password.valid}
                                touched={this.state.controls.password.touched}
                            />
                            <DefaultInput
                                style={[
                                    styles.input,
                                    this.state.viewMode === 'portrait'
                                        ? styles.portraitPwInput
                                        : styles.landscapePwInput,
                                ]}
                                placeholder="Confirm Password"
                                value={
                                    this.state.controls.confirmPassword.value
                                }
                                onChangeText={value =>
                                    this.updateInputState(
                                        'confirmPassword',
                                        value
                                    )
                                }
                                valid={
                                    this.state.controls.confirmPassword.valid
                                }
                                touched={
                                    this.state.controls.confirmPassword.touched
                                }
                            />
                        </View>
                    </View>
                    <ButtonWithBackground
                        color="#29aaf4"
                        onPress={this.loginHandler}
                        disabled={
                            !this.state.controls.email.valid ||
                            !this.state.controls.password.valid ||
                            !this.state.controls.confirmPassword.valid
                        }
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
