import React, { useEffect, useRef } from "react";
import { NavigationActions } from "react-navigation";

import PlantNavigator from "./PlantNavigator";

const NavigationContainer = (props) => {
  const navRef = useRef();
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
