import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator, AsyncStorage } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colours";
import * as authActions from "../../store/actions/auth";

const LeaderBoardScreen = props => {
  const name = useSelector(state => state.auth.name);
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

  /*if (name === undefined) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }*/

  return (
    <View style={styles.screen}>
        <Text>Welcome {name} to the LeaderBoard Screen</Text>
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
            authActions.logout();
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
