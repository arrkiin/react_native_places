import React from 'react';
import { StyleSheet, View } from 'react-native';
import PlacesList from './src/components/PlacesList/PlacesList';
import PlaceInput from './src/components/PlaceInput/PlaceInput';

export default class App extends React.Component {
    state = {
        places: []
    };
    placeAddHandler = placeName => {
        this.setState(prevState => {
            return {
                places: prevState.places.concat(placeName)
            };
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <PlaceInput onPlaceAdded={this.placeAddHandler} />
                <PlacesList places={this.state.places} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 16,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
});
