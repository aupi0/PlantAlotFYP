import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import PlantInstance from '../../components/plants/PlantInstance';
import * as plantIDActions from "../../store/actions/plantID";
import Colors from "../../constants/Colours";

const PlantDetailScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  //get userPlants from database;
  const userPlants = useSelector(state => state.plants.plants);
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
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadPlants
    );

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

  const selectPlantHandler = (id, title) => {
    props.navigation.navigate('PlantDetail', {
      plantId: id,
      plantTitle: title
    });
  };

  //homemade temporary crap
  const id = useSelector(state => state.plantID.id);
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
            ADD TILES TO REPRESENT USERS PAST PLANTS, WITH MOST RECENT AT THE TOP
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    alignItems: "center"
  }
});

export default PlantDetailScreen;
