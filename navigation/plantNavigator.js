import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import LeaderBoardScreen from "../screens/loggedIn/LeaderBoardScreen";
import CameraScreen from "../screens/loggedIn/CameraScreen";
import PlantInformationScreen from "../screens/loggedIn/PlantInformationScreen";
import AuthScreen from "../screens/anonymousUser/AuthScreen";
import Colors from "../constants/Colors";

const PlantStackNavigator = createStackNavigator(
  {
    LeaderBoard: LeaderBoardScreen,
    Camera: CameraScreen,
    PlantInformation: PlantInformationScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary
      },
      headerTitleStyle: {
        textAlign: "center"
      },
      headerTintColor: "white"
    }
  }
);

const PlantTabNavigator = createBottomTabNavigator(
  {
    LeaderBoard: {
      screen: PlantStackNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-stats" size={30} color={tabInfo.tintColor} />
          );
        }
      }
    },
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="md-camera" size={30} color={tabInfo.tintColor} />
          );
        },
        tabBarVisible: false
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primary
    }
  }
);

const PlantDrawNavigator = createDrawerNavigator({
  LeaderBoard: PlantTabNavigator,
  PlantInformation: PlantInformationScreen
});

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.primary
    },
    headerTintColor: 'white'
  }
});

const PlantLoginNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Plant: PlantDrawNavigator
});




export default createAppContainer(PlantLoginNavigator);
