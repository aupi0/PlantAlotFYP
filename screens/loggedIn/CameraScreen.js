import React, { useState, useEffect, AsyncStorage } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Camera } from "expo-camera";
import * as Location from 'expo-location';
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";

import * as plantIDActions from "../../store/actions/plantID";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CameraScreen = props => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [error, setError] = useState();
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  const photo = async () => {
    if (this.camera) {
      try {
        const SavedPhoto = await this.camera.takePictureAsync({
          base64: true
        });
        const location = await Location.getCurrentPositionAsync({
          timeout: 5000
        });

        //atm longitude and latitude are haredcoded
        dispatch(plantIDActions.identifyPlant(SavedPhoto, location.coords.latitude, location.coords.longitude, userId));
        /*const plantData = await AsyncStorage.getItem("plantData");
        const jsonPlantData = JSON.parse(plantData);
        const plantId = jsonPlantData.plantId;
        const imageUrl = jsonPlantData.imageUrl;
        console.log("plantId = " + plantId);
        console.log("imageUrl = " + imageUrl);
        dispatch(plantIDActions.checkIdentification(imageUrl, plantId));*/
        timeWaste = async() => {
          return new Promise((resolve) =>
            setTimeout(
              () => { resolve('result') },
              20000
            )
          );
        }
  
        const timeWasteData = await this.timeWaste();
  
        if (timeWasteData !== null) {
          props.navigation.navigate("PlantsOverview");
        }
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
    (async() => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      setHasLocationPermission(status === "granted");
    })();
  });

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status === "granted");
    })();
  });

  if (hasCameraPermission === null || hasLocationPermission === null) {
    return <View style={styles.screen}><ActivityIndicator size="large" color={Colors.primary}/></View>;
  }
  if (hasCameraPermission === false) {
    return (
      <View style={styles.screen}>
        <Text>Please Provide Access to the Camera and reload to use this app!</Text>
      </View>
    );
  }
  if (hasLocationPermission === false) {
    return (
      <View style={styles.screen}>
        <Text>Please Provide Access to Location Information and reload to use this app!</Text>
      </View>
    )
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
    justifyContent: "center",
    alignItems: "center"
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
