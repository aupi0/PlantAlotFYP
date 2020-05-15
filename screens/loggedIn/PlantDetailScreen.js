import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ProgressBarAndroidBase,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import * as plantIDActions from "../../store/actions/plantID";
import * as authActions from "../../store/actions/auth";
import * as scoreBoardActions from "../../store/actions/scoreBoard";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colours";

const PlantDetailScreen = (props) => {
  const plantId = props.navigation.getParam("plantId");
  const selectedPlant = useSelector((state) =>
    state.plantID.userPlants.find((plant) => plant.plantId === plantId)
  );

  return (
    //Make scrollview if needed but stops plantId being bottem of screen
    <View style={styles.screen}>
      <Text style={styles.name}>{selectedPlant.plantName}</Text>
      <Image style={styles.image} source={{ uri: selectedPlant.imageUrl }} />
      <Text style={styles.text}>Common Name: {selectedPlant.commonName}</Text>
      <Text style={styles.text}>Points: {selectedPlant.points}</Text>
      <Text style={styles.text}>Latitude: {selectedPlant.latitude}</Text>
      <Text style={styles.text}>longitude: {selectedPlant.longitude}</Text>
      <Text style={styles.text}>
        For Extra Info:{" "}
        <Text
          style={{ color: "blue" }}
          onPress={() => Linking.openURL(selectedPlant.plantInfoUrl)}
        >
          {selectedPlant.plantInfoUrl}
        </Text>
      </Text>
      <Text style={styles.text}>
        Date and Time Found: {selectedPlant.dateTimeFound}
      </Text>
      <Text style={styles.text}>
        {selectedPlant.probability * 100}% confidence in identification
      </Text>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>Plant Identification powered by</Text>
        <Image
          source={require("../../assets/plantIdLogo.png")}
        />
      </View>
    </View>
  );
};

PlantDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "PlantAlot",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Logout"
          iconName={"ios-log-out"}
          onPress={() => {
            authActions.logout();
            plantIDActions.logout();
            scoreBoardActions.logout();
            navData.navigation.navigate("Auth");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  name: {
    fontSize: 25,
    textAlign: "center",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  points: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
  logoContainer: {
    width: '100%',
    marginTop: 30,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  logoText: {
    fontSize: 10,
    textAlign: "center"
  }
});

export default PlantDetailScreen;
