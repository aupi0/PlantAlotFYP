import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";

import * as plantIDActions from "../../store/actions/plantID";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CameraScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode);
  const [error, setError] = useState();
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const photo = async () => {
    if (this.camera) {
      try {
        setIsLoading(true);
        const savedPhoto = await this.camera.takePictureAsync({
          base64: true,
          quality: 0.5,
          exif: false,
        });
        const location = await Location.getCurrentPositionAsync({
          timeout: 5000,
        });

        dispatch(
          plantIDActions.identifyPlant(
            savedPhoto,
            location.coords.latitude,
            location.coords.longitude,
            userId
          )
        );
        timeWaste = async () => {
          return new Promise((resolve) =>
            setTimeout(() => {
              resolve("result");
            }, 7000)
          );
        };

        const timeWasteData = await this.timeWaste();

        if (timeWasteData !== null) {
          setIsLoading(false);
          props.navigation.navigate("PlantsOverview");
        }
      } catch (err) {
        setError(err.message);
        console.log(err.message);
        setIsLoading(false);
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
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (hasCameraPermission === false) {
    return (
      <View style={styles.screen}>
        <Text>
          Please Provide Access to the Camera and reload to use this app!
        </Text>
      </View>
    );
  }
  if (hasLocationPermission === false) {
    return (
      <View style={styles.screen}>
        <Text>
          Please Provide Access to Location Information and reload to use this
          app!
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.flex}>
      <Camera
        style={styles.flex}
        type={type}
        ref={(ref) => {
          this.camera = ref;
        }}
      >
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              props.navigation.navigate("Leaderboard");
            }}
          >
            <Ionicons name="md-close" style={styles.icons} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRow}>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.on
                  ? Camera.Constants.FlashMode.off
                  : Camera.Constants.FlashMode.on
              );
            }}
          >
            <Ionicons
              name={
                flash === Camera.Constants.FlashMode.on
                  ? "ios-flash"
                  : "ios-flash-off"
              }
              style={styles.icons}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable} onPress={photo}>
            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Ionicons name="md-camera" style={styles.icons} />
            )}
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
  headerTitle: "Camera",
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomRow: {
    backgroundColor: "transparent",
    width: "100%",
    bottom: 0,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  touchable: {
    marginHorizontal: 50,
    marginVertical: 5,
  },
  topRow: {
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  close: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  icons: {
    color: "#fff",
    fontSize: 40,
  },
});

export default CameraScreen;
