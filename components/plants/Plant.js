import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Plant = props => {
    return (
        <View style={styles.plant}>
            <View style={styles.plantData}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
            <View style={styles.plantData}>
                <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    plant: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    plantData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 16
    }
});

export default Plant;