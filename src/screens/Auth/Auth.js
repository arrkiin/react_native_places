import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

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
        authMode: 'login',
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
    componentDidMount() {
        this.props.onAutoSignIn();
    }
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login',
            };
        });
    };
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
    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        };
        this.props.onTryAuth(authData, this.state.authMode);
    };
    render() {
        let headingText = null;
        let confirmPasswordControl = null;
        let submitButton = (
            <ButtonWithBackground
                color="#29aaf4"
                onPress={this.authHandler}
                disabled={
                    !this.state.controls.email.valid ||
                    !this.state.controls.password.valid ||
                    (!this.state.controls.confirmPassword.valid &&
                        this.state.authMode === 'signup')
                }
            >
                Submit
            </ButtonWithBackground>
        );
        if (this.props.isLoading) {
            <ActivityIndicator />;
        }
        if (this.state.viewMode == 'portrait') {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }
        if (this.state.authMode === 'signup') {
            confirmPasswordControl = (
                <DefaultInput
                    style={[
                        styles.input,
                        this.state.viewMode === 'portrait'
                            ? styles.portraitPwInput
                            : styles.landscapePwInput,
                    ]}
                    placeholder="Confirm Password"
                    value={this.state.controls.confirmPassword.value}
                    onChangeText={value =>
                        this.updateInputState('confirmPassword', value)
                    }
                    valid={this.state.controls.confirmPassword.valid}
                    touched={this.state.controls.confirmPassword.touched}
                    secureTextEntry
                />
            );
        }
        return (
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImage}
            >
                <KeyboardAvoidingView
                    style={styles.container}
                    behaviour="padding"
                >
                    {headingText}
                    <ButtonWithBackground
                        color="#29aaf4"
                        onPress={this.switchAuthModeHandler}
                    >
                        Switch to{' '}
                        {this.state.authMode === 'login' ? 'Sign Up' : 'Login'}
                    </ButtonWithBackground>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
                            />
                            <View
                                style={
                                    this.state.viewMode === 'portrait' ||
                                    this.state.authMode === 'login'
                                        ? styles.portraitPasswordContainer
                                        : styles.landscapePasswordContainer
                                }
                            >
                                <DefaultInput
                                    style={[
                                        styles.input,
                                        this.state.viewMode === 'portrait' ||
                                        this.state.authMode === 'login'
                                            ? styles.portraitPwInput
                                            : styles.landscapePwInput,
                                    ]}
                                    placeholder="Password"
                                    value={this.state.controls.password.value}
                                    onChangeText={value =>
                                        this.updateInputState('password', value)
                                    }
                                    valid={this.state.controls.password.valid}
                                    touched={
                                        this.state.controls.password.touched
                                    }
                                    secureTextEntry
                                />
                                {confirmPasswordControl}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {submitButton}
                </KeyboardAvoidingView>
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

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) =>
            dispatch(actions.tryAuth(authData, authMode)),
        onAutoSignIn: () => dispatch(actions.authAutoSignIn()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
