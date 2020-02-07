import React, { useState, useReducer, useCallback } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Button,
  Text
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRegister, setIsRegister] = useState(false);
  //const dispatch = useDispatch();

  const loginHandler = () => {
    /*dispatch(
      authActions.login(
        formState.inputValues.username,
        formState.inputValues.password
      )
    );*/
    props.navigation.navigate("LeaderBoard");
  };

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: "",
      password: ""
    },
    inputValidities: {
      username: false,
      password: false
    },
    formIsValid: false
  });

  const inputChanceHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  //TODO: ADD TABBING BETWEEN TEXT INPUTS
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={30}
      style={styles.screen}
    >
      <LinearGradient
        colors={["#D2F8F2", "#7CFC00", "#228B22"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            {isRegister ? (
              <View>
                <Input
                  id="username"
                  label="Username"
                  keyboardType="default"
                  required
                  autoCapitalize="none"
                  errorText="Please enter a valid Username."
                  onInputChange={inputChanceHandler}
                  initialValue=""
                />
                <Input
                  id="email"
                  label="E-mail"
                  keyboardType="email-address"
                  required
                  email
                  autoCapitalize="none"
                  errorText="Please enter a valid Email Address."
                  onInputChange={inputChanceHandler}
                  initialValue=""
                />
                <Input
                  id="password"
                  label="Password"
                  keyboardType="default"
                  secureTextEntry
                  required
                  minLength={5}
                  autoCapitalize="none"
                  errorText="Please enter a valid Password."
                  onInputChange={inputChanceHandler}
                  initialValue=""
                />
                <Input
                  id="confirmpassword"
                  label="Confirm Password"
                  keyboardType="default"
                  secureTextEntry
                  required
                  minLength={5}
                  autoCapitalize="none"
                  errorText="Please enter a valid Confirmation Password."
                  onInputChange={inputChanceHandler}
                  initialValue=""
                />
              </View>
            ) : (
              <View>
                <Input
                  id="username"
                  label="Username"
                  keyboardType="default"
                  required
                  autoCapitalize="none"
                  errorText="Please enter a valid Username."
                  onInputChange={inputChanceHandler}
                  initialValue=""
                />
                <Input
                  id="password"
                  label="Password"
                  keyboardType="default"
                  secureTextEntry
                  required
                  minLength={5}
                  autoCapitalize="none"
                  errorText="Please enter a valid Password."
                  onInputChange={inputChanceHandler}
                  initialValue=""
                />
              </View>
            )}
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Button title={isRegister ? 'Register' : 'Login'} color="green" onPress={loginHandler} />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => {
                  setIsRegister(isRegister ? false : true);
              }}>
                <View style={styles.secondButtonContainer}>
                  <Text style={styles.secondButton}>Switch to {isRegister ? 'Login' : 'Registration'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

//This needs changing to allow for registration at some point, likely using redux states
AuthScreen.navigationOptions = {
  headerTitle: "PlantAlot"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "80%",
    maxWidth: 500,
    maxHeight: 500,
    padding: 25
  },
  buttonContainer: {
    marginTop: 10
  },
  secondButtonContainer: {
    margin: 1,
    backgroundColor: "white",
    borderRadius: 5
  },
  secondButton: {
    margin: 4,
    paddingHorizontal: 6,
    textAlign: "center",
    backgroundColor: "white",
    color: Colors.primary,
    fontSize: 14
  }
});

export default AuthScreen;
