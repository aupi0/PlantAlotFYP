import { AsyncStorage } from "react-native";

export const REGISTER = "REGISTER";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = () => {
  return async dispatch => {
    const userData = await AsyncStorage.getItem("userData");
    const jsonUserData = JSON.parse(userData);
    const response = await fetch("http://api.sherlock.uk:5000/protected", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jsonUserData.token
      }
    });

    if (!response.ok) {
      let message = "Something went wrong!";
      if (response.status == 500) {
        const errorResData = await response.text();
        console.log(errorResData);
        message = "Internal Server Error";
      } else {
        const errorResData = await response.json();
        console.log(errorResData);
        message = errorResData.msg;
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({ type: AUTHENTICATE, name: resData.name });
    saveNameToStorage(resData.name);
  };
  /*return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };*/
};

export const register = (name, email, password, confirmPassword) => {
  //Is this not done else where?
  if (password != confirmPassword) {
    message = "Passwords do not Match!";
    throw new Error(message);
  } else {
    return async dispatch => {
      const response = await fetch("http://api.sherlock.uk:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          name: name,
          emailAddress: email,
          password: password
        }
      });

      if (!response.ok) {
        let message = "Something went wrong!";
        if (response.status == 500) {
          const errorResData = await response.text();
          console.log(errorResData);
          message = "Internal Server Error";
        } else {
          const errorResData = await response.json();
          console.log(errorResData);
          const errorId = errorResData.msg;
          if (errorId === "User already registered") {
            message = "This email exists already";
          }
        }
        throw new Error(message);
      }

      const resData = await response.json();
      console.log(resData);
    };
  }
};

export const login = (email, password) => {
  console.log(email);
  console.log(password);
  return async dispatch => {
    const response = await fetch("http://api.sherlock.uk:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        emailAddress: email,
        password: password
      }
    });

    if (!response.ok) {
      let message = "Something went wrong!";
      if (response.status == 500) {
        const errorResData = await response.text();
        console.log(errorResData);
        message = "Internal Server Error";
      } else {
        const errorResData = await response.json();
        console.log(errorResData);
        const errorId = errorResData.msg;
        if (errorId === "Incorrect user name or password") {
          message = "Incorrect user name or password";
        }
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
    saveTokenToStorage(resData.accessToken);
    /*dispatch(
      authenticate(
        resData.localId,
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000
    );
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);*/
  };
};

export const logout = () => {
  clearLogoutTimer();
  //make this dispatch instead?
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveNameToStorage = name => {
  AsyncStorage.setItem(
    "usersName",
    JSON.stringify({
      name: name
    })
  );
};

const saveTokenToStorage = token => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token
    })
  );
};
