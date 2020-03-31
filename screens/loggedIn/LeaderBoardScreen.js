import React, { useState } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

const LeaderBoardScreen = props => {
  //const [name, setName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const name = useSelector(state => state.auth.name);
  const test = getName;

  const getName = async () => {
    setIsLoading(true);
    const usersName = await AsyncStorage.getItem("usersName");
    const jsonName = JSON.parse(usersName);
    setName(jsonName.name);
    console.log(name);
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="Large" />
      ) : (
        <Text>Welcome {name} to the LeaderBoard Screen</Text>
      )}
    </View>
  );
};

LeaderBoardScreen.navigationOptions = navData => {
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
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default LeaderBoardScreen;
