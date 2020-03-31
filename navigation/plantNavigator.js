import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { SafeAreaView, Button, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import LeaderBoardScreen from "../screens/loggedIn/LeaderBoardScreen";
import CameraScreen from "../screens/loggedIn/CameraScreen";
import PlantsOverviewScreen from "../screens/loggedIn/PlantsOverviewScreen";
import PlantDetailScreen from "../screens/loggedIn/PlantDetailScreen";
import AuthScreen from "../screens/anonymousUser/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import Colours from "../constants/Colours";
import * as authActions from "../store/actions/auth";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: ""
  },
  headerTitleStyle: {
    //fontFamily: FONT_NAME
  },
  headerBackTitleStyle: {
    //fontFamily: FONT_NAME
  },
  headerTintColor: Colours.primary
};

const plantStackNavigator = createStackNavigator(
  {
    PlantsOverview: PlantsOverviewScreen,
    PlantDetail:  PlantDetailScreen
  },
  {
      defaultNavigationOptions: defaultNavOptions
  }
);

const stackNavigator = createStackNavigator(
  {
    LeaderBoard: LeaderBoardScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const PlantTabNavigator = createBottomTabNavigator(
  {
    LeaderBoard: {
      screen: stackNavigator,
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
    },
    'User\'s Plants': {
      screen: plantStackNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-leaf" size={30} color={tabInfo.tintColor} />
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Colours.primary
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const PlantDrawNavigator = createDrawerNavigator(
  {
    LeaderBoard: PlantTabNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colours.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colours.primary}
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    }
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
);

const PlantLoginNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Plant: PlantDrawNavigator
});

export default createAppContainer(PlantLoginNavigator);
