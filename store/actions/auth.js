import { AsyncStorage } from "react-native";

export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export const authenticate = () => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const jsonUserData = JSON.parse(userData);
    const response = await fetch(
      "http://api.sherlock.uk:5000/get_user_details",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jsonUserData.token,
        },
      }
    );

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

    dispatch({
      type: AUTHENTICATE,
      name: resData.name,
      userId: resData.userId,
    });
  };
};

export const register = (name, email, password, confirmPassword) => {
  if (password != confirmPassword) {
    message = "Passwords do not Match!";
    throw new Error(message);
  } else {
    return async () => {
      const response = await fetch("http://api.sherlock.uk:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          name: name,
          emailAddress: email,
          password: password,
        },
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
  return async () => {
    const response = await fetch("http://api.sherlock.uk:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        emailAddress: email,
        password: password,
      },
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
    authenticate();
  };
};

export const deleteUser = () => {
  return async (dispatch) => {
    const userData = await AsyncStorage.getItem("userData");
    const jsonUserData = JSON.parse(userData);
    try {
      const response = await fetch("http://api.sherlock.uk:5000/delete_user", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + jsonUserData.token,
        },
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

      logout();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const logout = () => {
  AsyncStorage.removeItem("userData");
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};

const saveTokenToStorage = (token) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
    })
  );
};
