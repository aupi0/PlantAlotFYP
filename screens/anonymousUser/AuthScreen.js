import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Button,
  Text,
  ActivityIndicator,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colours";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

//ADD VALIDATION TO ENSURE PASSWORDS MATCH
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
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    inputValidities: {
      name: false,
      email: false,
      password: false,
      confirmPassword: false
    },
    formIsValid: false
  });

  /*useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);*/

  const authHandler = async () => {
    //props.navigation.navigate("LeaderBoard");
    setError(null);
    let action;
    console.log(error);
    console.log(formState);
    if (isRegister) {
      if (!formState.inputValidities.name) {
        setError("Please Enter a Valid Name");
      } else if (!formState.inputValidities.email) {
        setError("Please Enter a Valid Email");
      } else if (!formState.inputValidities.password) {
        setError("Please Enter a Valid Password");
      } else if (
        formState.inputValues.password != formState.inputValues.confirmPassword
      ) {
        setError("Passwords do not Match");
      } else {
        action = authActions.register(
          formState.inputValues.name,
          formState.inputValues.email,
          formState.inputValues.password,
          formState.inputValues.confirmPassword
        );
      }
    } else {
      if (!formState.inputValidities.email) {
        setError("Please Enter a Valid Email");
      } else if (!formState.inputValidities.password) {
        setError("Please Enter a Valid Password");
      } else {
        action = authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
        );
      }
    }
    if (!error) {
      setIsLoading(true);
      try {
        await dispatch(action);
        if (isRegister) {
          setIsRegister(false);
        } else {
          props.navigation.navigate("LeaderBoard");
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

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
                {error != null ? (<Text style={styles.error}>error</Text>) : (<Text></Text>)}
                <Input
                  id="name"
                  label="Name"
                  keyboardType="default"
                  required
                  autoCapitalize="words"
                  minLength={1}
                  errorText="Please enter a valid Name."
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
              </View>
            )}
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" />
              ) : (
                <Button
                  title={isRegister ? "Register" : "Login"}
                  color="green"
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  setIsRegister(isRegister ? false : true);
                }}
              >
                <View style={styles.secondButtonContainer}>
                  <Text style={styles.secondButton}>
                    Switch to {isRegister ? "Login" : "Registration"}
                  </Text>
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
  error: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold"
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
