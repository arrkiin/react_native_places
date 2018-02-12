import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class PickLocation extends Component {
    state = {
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta:
                Dimensions.get('window').width /
                Dimensions.get('window').height *
                0.0122,
        },
        locationChosen: false,
    };
    pickLocationHandler = event => {
        const coord = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coord.latitude,
            longitude: coord.longitude,
        });
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coord.latitude,
                    longitude: coord.longitude,
                },
                locationChosen: true,
            };
        });
    };
    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(
            pos => {
                const coordsEvent = {
                    nativeEvent: {
                        coordinate: {
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude,
                        },
                    },
                };
                this.pickLocationHandler(coordsEvent);
            },
            error => {
                console.log(error);
                alert('Fetching the Position failed');
            },
            { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
        );
    };
    render() {
        let marker = null;
        if (this.state.locationChosen) {
            marker = <Marker coordinate={this.state.focusedLocation} />;
        }
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    ref={ref => (this.map = ref)}
                >
                    {marker}
                </MapView>
                <View style={styles.button}>
                    <Button
                        title="Locate Me"
                        onPress={this.getLocationHandler}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: 250,
    },
    button: {
        margin: 8,
    },
});

export default PickLocation;
