import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import { Provider, useDispatch } from "react-redux";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";

import * as plantIDActions from "../../store/actions/plantID";
import PlantInformationScreen from "./PlantInformationScreen";

const ImageTakerScreen = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const photo = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      setPhotoTaken(photoTaken = true);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <ActivityIndicator size="large" />;
  }
  if (hasPermission === false) {
    Alert.alert(
      "Insifficient Permissions",
      "Please Provide Access to the Camera to Take a Photo!",
      [{ text: "Okay" }]
    );
    return (
      <View style={styles.screen}>
        <Text>Please Provide Access to the Camera to Take a Photo!</Text>
      </View>
    );
  }
  if (photoTaken == false) {
    return (
      <View style={styles.flex}>
        <Camera
          style={styles.flex}
          type={type}
          ref={ref => {
            this.camera = ref;
          }}
        >
          <View style={styles.touchableContainer}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => {
                props.navigation.navigate("LeaderBoard");
              }}
            >
              <Ionicons name="md-close" style={styles.icons} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable} onPress={() => {}}>
              <Text style={styles.icons}></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable} onPress={photo}>
              <Ionicons name="md-camera" style={styles.icons} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Ionicons name="md-reverse-camera" style={styles.icons} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  } else {
    try {
      await dispatch(plantIDActions.identifyPlant(photo, 10, 20));
      props.navigation.navigate("PlantInformation");
    } catch (err) {
      setError(err.message);
    }
  }
};

ImageTakerScreen.navigationOptions = {
  headerTitle: "Camera"
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  touchableContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20
  },
  touchable: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center"
  },
  close: {
    flex: 0.1,
    alignSelf: "flex-start",
    alignItems: "flex-start"
  },
  icons: {
    color: "#fff",
    fontSize: 40
  }
});

export default ImageTakerScreen;
