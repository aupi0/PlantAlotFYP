import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import PlantNavigator from "./PlantNavigator";

//Used to keep users logged in as long as token duration
const NavigationContainer = props => {
  const navRef = useRef();
  //const isAuth = useSelector(state => !!state.auth.token);
  const isAuth = true;

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: "Auth" })
      );
    }
  }, [isAuth]);

  return <PlantNavigator ref={navRef} />;
};

export default NavigationContainer;
