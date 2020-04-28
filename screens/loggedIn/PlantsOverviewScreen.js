import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  AsyncStorage
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import PlantInstance from "../../components/plants/PlantInstance";
import * as plantIDActions from "../../store/actions/plantID";
import * as authActions from "../../store/actions/auth";
import Colors from "../../constants/Colours";
import HeaderButton from "../../components/UI/HeaderButton";

const PlantsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const userPlants = useSelector(state => state.plantID.userPlants);
  const dispatch = useDispatch();

  const loadPlants = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
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
    const tryAuth = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      } else {
          try {
            await dispatch(authActions.authenticate());
          } catch (err) {
            console.log(err);
            props.navigation.navigate('Auth');
          }
      }
    };
    tryAuth();
  }, [dispatch]);

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
    console.log(error);
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
      keyExtractor={item => item.plantId}
      renderItem={itemData => (
        <PlantInstance
          image={itemData.item.imageUrl}
          plantName={itemData.item.plantName}
          points={itemData.item.points}
          latitude={itemData.item.latitude}
          longitude={itemData.item.longitude}
          dateTimeFound={itemData.item.dateTimeFound}
          onSelect={() => {
            selectPlantHandler(itemData.item.plantId, itemData.item.plantName);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectPlantHandler(itemData.item.id, itemData.item.plantName);
            }}
          />
        </PlantInstance>
      )}
    />
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
            authActions.logout();
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
