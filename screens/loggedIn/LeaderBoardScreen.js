import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import LeaderBoard from "react-native-leaderboard";

import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colours";
import * as scoreBoardActions from "../../store/actions/scoreBoard";
import * as plantIDActions from "../../store/actions/plantID";
import * as authActions from "../../store/actions/auth";
import Colours from "../../constants/Colours";

const LeaderBoardScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const scoreBoardData = useSelector(
    (state) => state.scoreBoard.scoreBoardData
  );
  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.name);
  const userPoints = useSelector((state) => state.scoreBoard.points);
  const userPosition = useSelector((state) => state.scoreBoard.position);
  const errorData = [{ text: "It Appears an error occurred!" }];
  const dispatch = useDispatch();

  useEffect(() => {
    const tryAuth = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      } else {
        try {
          dispatch(authActions.authenticate());
        } catch (err) {
          console.log(err);
          props.navigation.navigate("Auth");
        }
      }
    };
    tryAuth();
  }, [dispatch]);

  const loadScoreBoard = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      dispatch(scoreBoardActions.getScoreBoard(userId));
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError, userId]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadScoreBoard
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadScoreBoard]);

  useEffect(() => {
    setIsLoading(true);
    loadScoreBoard().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadScoreBoard]);

  const ordinalSuffix = (i) => {
    const j = i % 10;
    const k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    } else if (j == 2 && k != 12) {
      return i + "nd";
    } else if (j == 3 && k != 13) {
      return i + "rd";
    } else {
      return i + "th";
    }
  };

  if (error) {
    console.log(error);
    return (
      <FlatList
        onRefresh={loadScoreBoard}
        refreshing={isRefreshing}
        data={errorMessage}
        keyExtractor={(item) => item.text}
        contentContainerStyle={styles.centered}
        renderItem={(itemData) => (
          <View>
            <Text>{itemData.item.text}</Text>
            <Button
              title="Try Again"
              onPress={loadScoreBoard}
              color={Colors.primary}
            />
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

  return (
    <View style={styles.screen}>
      <FlatList
        onRefresh={loadScoreBoard}
        refreshing={isRefreshing}
        data={errorData}
        keyExtractor={(item) => item.text}
        renderItem={() => (
          <View>
            <View color={Colours.primary} style={styles.header}>
              <Text style={styles.title} color={Colours.primary}>
                Leaderboard
              </Text>
              <View style={styles.userStats}>
                <Text style={styles.position} color={Colours.primary}>
                  {ordinalSuffix(userPosition)}
                </Text>
                <Text style={styles.name} color={Colours.primary}>
                  {username}
                </Text>
                <Text style={styles.points} color={Colors.primary}>
                  {userPoints}pts
                </Text>
              </View>
            </View>
            <View>
              <LeaderBoard
                data={scoreBoardData}
                sortBy="points"
                labelBy="name"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

LeaderBoardScreen.navigationOptions = (navData) => {
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
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 15,
    paddingTop: 35,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
  },
  userStats: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
  },
  position: {
    fontSize: 20,
    flex: 1,
    textAlign: "right",
    marginRight: 40,
  },
  name: {
    fontSize: 20,
    flex: 1,
  },
  points: {
    fontSize: 20,
    flex: 1,
    marginLeft: 40,
  },
  screen: {
    flex: 1,
  },
});

export default LeaderBoardScreen;
