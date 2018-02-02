import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const placeInput = ({ placeName, onPlaceNameChanged, onPlaceSubmit }) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="An awesome place"
                value={placeName}
                onChangeText={onPlaceNameChanged}
                style={styles.placeInput}
            />
            <Button
                title="Add"
                style={styles.placeButton}
                onPress={onPlaceSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    placeInput: { width: '70%' },
    placeButton: {
        width: '30%'
    }
});

export default placeInput;
