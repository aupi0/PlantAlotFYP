import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const PlantInformationScreen = props => {
    return <View style={styles.screen}>
        <Text>PlantInfoScreen</Text>
    </View>
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        alignItems: 'center'
    }
});

export default PlantInformationScreen;