import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

import validate from '../../utility/validation';

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange',
    };
    state = {};
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }
    componentWillMount() {
        this.reset();
    }
    componentDidUpdate() {
        if (this.props.placeAdded) {
            this.props.navigator.switchToTab({ tabIndex: 0 });
            // this.props.onStartAddPlace();
        }
    }
    reset = () => {
        this.setState({
            controls: {
                placeName: {
                    value: '',
                    valid: false,
                    validationRules: {
                        minLength: 1,
                    },
                    touched: false,
                },
                location: {
                    value: null,
                    valid: false,
                },
                image: {
                    value: null,
                    valid: false,
                },
            },
        });
    };
    onNavigatorEvent = event => {
        if (event.type === 'ScreenChangedEvent') {
            if (event.id === 'willAppear') {
                this.props.onStartAddPlace();
            }
        }
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left',
                });
            }
        }
    };
    placeNameChangedHandler = (key, value) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value.trim(),
                            prevState.controls[key].validationRules,
                            {}
                        ),
                        touched: true,
                    },
                },
            };
        });
    };
    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true,
                    },
                },
            };
        });
    };
    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true,
                    },
                },
            };
        });
    };
    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value,
            this.state.controls.location.value,
            this.state.controls.image.value
        );
        this.reset();
        this.imagePicker.reset();
        this.locationPicker.reset();
        // this.props.navigator.switchToTab({ tabIndex: 0 });
    };
    render() {
        let submitButton = (
            <Button
                title="Share the Place!"
                onPress={this.placeAddedHandler}
                disabled={
                    !this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                }
            />
        );
        if (this.props.isLoading) {
            submitButton = <ActivityIndicator />;
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage
                        ref={ref => (this.imagePicker = ref)}
                        onImagePicked={this.imagePickedHandler}
                    />
                    <PickLocation
                        ref={ref => (this.locationPicker = ref)}
                        onPickLocation={this.locationPickedHandler}
                    />
                    <PlaceInput
                        placeData={this.state.controls.placeName}
                        onChangeText={value =>
                            this.placeNameChangedHandler('placeName', value)
                        }
                    />
                    <View style={styles.button}>{submitButton}</View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    placeholder: {
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: '#eee',
        width: '80%',
        height: 150,
    },
    button: {
        margin: 8,
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
});

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        placeAdded: state.places.placeAdded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) =>
            dispatch(actions.addPlace(placeName, location, image)),
        onStartAddPlace: () => dispatch(actions.startAddPlace()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
