import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import { useDispatch } from "react-redux";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";

import * as plantIDActions from "../../store/actions/plantID";

const CameraScreen = props => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const photo = async () => {
    if (this.camera) {
      const SavedPhoto = await this.camera.takePictureAsync({
        base64: true
      });
      try {
        //atm params are hard coded
        dispatch(plantIDActions.identifyPlant(SavedPhoto, 10, 20, 1));
        console.log("after identifyPlant");
        dispatch(plantIDActions.checkIdentification("fakeUrl", 978307, 1));
        console.log("after dispatch");
        props.navigation.navigate("PlantsOverview");
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

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
};

CameraScreen.navigationOptions = {
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

export default CameraScreen;
