import { AsyncStorage } from 'react-native'

export const REGISTER = "REGISTER";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

export const register = (name, email, password, confirmPassword) => {
  if (password != confirmPassword) {
    message = "Passwords do not Match!";
    throw new Error(message);
  } else {
    return async dispatch => {
      const response = await fetch("http://api.sherlock.uk:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "name": name,
          "emailAddress": email,
          "password": password
        }
      });
  
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = "Something went wrong!";
        if (errorId === "User already registered") {
          message = "This email exists already!";
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
        "emailAddress": email,
        "password": password
      }
    });
    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      const errorId = errorResData.msg//error.message;
      let message = "Something went wrong!";
      if (errorId === "Incorrect user name or password") {
        message = "Incorrect user name or password";
      }
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);
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

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};
