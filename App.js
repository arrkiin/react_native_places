import React from 'react';
import { StyleSheet, View } from 'react-native';
import PlacesList from './src/components/PlacesList';
import PlaceInput from './src/components/PlaceInput';

export default class App extends React.Component {
    state = {
        placeName: '',
        places: []
    };
    placeNameChangedHandler = value => {
        this.setState({
            placeName: value
        });
    };
    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === '') {
            return;
        }
        this.setState(prevState => {
            return {
                places: prevState.places.concat(prevState.placeName)
            };
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <PlaceInput
                    placeName={this.state.placeName}
                    onPlaceNameChanged={this.placeNameChangedHandler}
                    onPlaceSubmit={this.placeSubmitHandler}
                />
                <View style={styles.listContainer}>
                    <PlacesList places={this.state.places} />
                </View>
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
    },
    listContainer: {
        width: '100%'
    }
});
