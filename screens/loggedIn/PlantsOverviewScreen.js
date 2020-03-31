import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
//import { FlatList } from "react-native-gesture-handler";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import PlantInstance from "../../components/plants/PlantInstance";
import * as plantIDActions from "../../store/actions/plantID";
import Colors from "../../constants/Colours";
import HeaderButton from "../../components/UI/HeaderButton";

const PlantsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  //get userPlants from database;
  const userPlants = useSelector(state => state.plantID.userPlants);
  const dispatch = useDispatch();

  const loadPlants = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      //atm params are hard coded
      await dispatch(plantIDActions.getUserPlants());
      console.log("after getUserPlants");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadPlants);

    return () => {
      willFocusSub.remove();
    };
  }, [loadPlants]);

  useEffect(() => {
    setIsLoading(true);
    loadPlants().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadPlants]);

  const selectPlantHandler = (id, plantName) => {
    props.navigation.navigate("PlantDetail", {
      plantId: id,
      plantName: plantName
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>It Appears an error occurred!</Text>
        <Button title="Try Again" onPress={loadPlants} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && userPlants.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Plants found for this User. Maybe Try adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadPlants}
      refreshing={isRefreshing}
      data={userPlants}
      keyExtractor={plant => plant.id}
      renderItem={plantData => (
        <PlantInstance
          image={plantData.plant.imageUrl}
          plantName={plantData.plant.plantName}
          points={plantData.plant.points}
          latitude={plantData.plant.latitude}
          longitude={plantData.plant.longitude}
          dateTime={plantData.plant.dateTime}
          onSelect={() => {
            selectPlantHandler(plantData.plant.id, plantData.plant.plantName);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectPlantHandler(plantData.plant.id, plantData.plant.plantName);
            }}
          />
        </PlantInstance>
      )}
    />
  );

  //homemade temporary crap
  const id = useSelector(state => state.plantID.userPlants);
  const name = useSelector(state => state.auth.name);
  console.log("Name = " + name);
  console.log("id = " + id);

  /*imageUrl: null,
        userId: null,
        plantName: null,
        latitude: null,
        longitude: null,
        plantInfoUrl: null,
        time: null,
        commonName: null,
        probability: null);*/

  const plantInfo = async () => {
    try {
      //atm params are hard coded
      dispatch(plantIDActions.checkIdentification("fakeUrl", 978307, 1));
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };
  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="Large" />
      ) : (
        <View>
          <Text>PlantInfoScreen</Text>
          <Text>
            Hello {name} id = {id}
            ADD TILES TO REPRESENT USERS PAST PLANTS, WITH MOST RECENT AT THE
            TOP
          </Text>
          <View>
            <TouchableOpacity style={styles.touchable} onPress={plantInfo}>
              <Text>Press here</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

PlantsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "PlantAlot",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Logout"
          iconName={"ios-log-out"}
          onPress={() => {
            navData.navigation.navigate("Auth");
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PlantsOverviewScreen;
