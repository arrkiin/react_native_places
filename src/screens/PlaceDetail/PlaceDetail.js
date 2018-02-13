import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import PlaceLocation from '../../components/PlaceLocation/PlaceLocation';

class PlaceDetail extends Component {
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
    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    };
    render() {
        return (
            <View
                horizontal={this.state.viewMode === 'portrait' ? false : true}
                style={[
                    styles.container,
                    this.state.viewMode === 'portrait'
                        ? styles.portraitContainer
                        : styles.landscapeContainer,
                ]}
            >
                <View style={styles.placeDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image
                            source={this.props.selectedPlace.image}
                            style={styles.placeImage}
                        />
                    </View>
                    <View style={styles.subContainer}>
                        <PlaceLocation
                            placeLocation={this.props.selectedPlace.location}
                        />
                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.placeName}>
                            {this.props.selectedPlace.name}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Icon
                                    name={
                                        Platform.OS === 'android'
                                            ? 'md-trash'
                                            : 'ios-trash'
                                    }
                                    size={30}
                                    color="red"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1,
    },
    portraitContainer: {
        flexDirection: 'column',
    },
    landscapeContainer: {
        flexDirection: 'row',
    },
    placeImage: {
        width: '100%',
        height: '100%',
    },
    placeName: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 28,
    },
    deleteButton: {
        alignItems: 'center',
    },
    subContainer: {
        flex: 1,
    },
    placeDetailContainer: {
        flex: 2,
    },
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: key => dispatch(actions.deletePlace(key)),
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
