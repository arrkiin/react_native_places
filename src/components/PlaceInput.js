import React from 'react';

class PlaceInput extends Component {
    state = {
        placeName: '',
    };
    placeNameChangedHandler = value => {
        this.setState({
            placeName: value,
        });
    };
    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="An awesome place"
                    value={this.state.placeName}
                    onChangeText={this.placeNameChangedHandler}
                    style={styles.placeInput}
                />
                <Button
                    title="Add"
                    style={styles.placeButton}
                    onPress={this.placeSubmitHandler}
                />
            </View>
        );
    }
}
