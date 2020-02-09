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
import PlantInformationScreen from "../screens/loggedIn/PlantInformationScreen";
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

const PlantStackNavigator = createStackNavigator(
  {
    LeaderBoard: LeaderBoardScreen,
    Camera: CameraScreen,
    PlantInformation: PlantInformationScreen
  },
  {
    navigationOptions: {
      /*drawerIcon: drawerConfig => (
        <Ionicons
          name='ios-cart'
          size={23}
          color={drawerConfig.tintColor}
        />
      )*/
    },
    defaultNavigationOptions: defaultNavOptions
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
      activeTintColor: Colours.primary
    }
  }
);

const PlantDrawNavigator = createDrawerNavigator(
  {
    LeaderBoard: PlantTabNavigator,
    PlantInformation: PlantInformationScreen
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
