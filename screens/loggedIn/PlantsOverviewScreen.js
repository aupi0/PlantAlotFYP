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
import * as scoreBoardActions from "../../store/actions/scoreBoard";
import Colors from "../../constants/Colours";
import HeaderButton from "../../components/UI/HeaderButton";

const PlantsOverviewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const userPlants = useSelector(state => state.plantID.userPlants);
  const emptyMessage = [{text: "No Plants found for this User. Maybe Try adding some!"}];
  const errorMessage = [{text: "It Appears an error occurred!"}];
  const dispatch = useDispatch();

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

  const loadPlants = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      dispatch(plantIDActions.getUserPlants());
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

  const selectPlantHandler = (id) => {
    props.navigation.navigate("PlantDetail", {
      plantId: id
    });
  };

  if (error) {
    console.log(error);
    return (
      <FlatList
        onRefresh={loadPlants}
        refreshing={isRefreshing}
        data={errorMessage}
        keyExtractor={item => item.text}
        contentContainerStyle={styles.centered}
        renderItem={itemData => (
          <View>
            <Text>{itemData.item.text}</Text>
            <Button title="Try Again" onPress={loadPlants} color={Colors.primary} />
          </View>
        )}
      />
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
        <FlatList
        onRefresh={loadPlants}
        refreshing={isRefreshing}
        data={emptyMessage}
        keyExtractor={item => item.text}
        contentContainerStyle={styles.centered}
        renderItem={itemData => (
          <Text>{itemData.item.text}</Text>
        )}
    />
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
            selectPlantHandler(itemData.item.plantId);
          }}
        >
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
            plantIDActions.logout();
            scoreBoardActions.logout();
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
