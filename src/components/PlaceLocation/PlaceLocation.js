import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const placeLocation = props => {
    const region = {
        ...props.placeLocation,
        latitudeDelta: 0.0122,
        longitudeDelta:
            Dimensions.get('window').width /
            Dimensions.get('window').height *
            0.0122,
    };
    return (
        <MapView initialRegion={region} style={styles.map}>
            <Marker coordinate={props.placeLocation} />
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default placeLocation;
