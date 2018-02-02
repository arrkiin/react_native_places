import React from 'react';
import { StyleSheet, View } from 'react-native';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceInput from './src/components/PlaceInput/PlaceInput';
import placeImage from './src/assets/beautiful-place.jpg';

export default class App extends React.Component {
    state = {
        places: []
    };
    placeAddHandler = placeName => {
        this.setState(prevState => {
            return {
                places: prevState.places.concat({
                    key: Math.random(),
                    name: placeName,
                    image: placeImage
                })
            };
        });
    };
    placeDeletedHandler = key => {
        this.setState(prevState => {
            return {
                places: prevState.places.filter(place => place.key !== key)
            };
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <PlaceInput onPlaceAdded={this.placeAddHandler} />
                <PlaceList
                    places={this.state.places}
                    onItemDeleted={this.placeDeletedHandler}
                />
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
