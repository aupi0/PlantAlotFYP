import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from "react-native";

import Card from "../UI/Card";

const PlantInstance = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.plant}>
      <View style={styles.Touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source = {{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.plantName}>{props.plantName}</Text>
              <Text style={styles.points}>{props.points}</Text>
              <Text style={styles.text}>{props.latitude}</Text>
              <Text style={styles.text}>{props.longitude}</Text>
              <Text style={styles.text}>{props.dateTime}</Text>
            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  plant: {
    height: 300,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden"
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%"
  },
  details: {
    alignItems: "center",
    height: "20%",
    padding: 10
  },
  plantName: {
    fontSize: 18,
    marginVertical: 2
  },
  text: {
    fontSize: 14,
    color: "#888"
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20
  }
});

export default PlantInstance;
