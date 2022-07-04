import React, { useState, useEffect } from "react";

import * as Location from "expo-location";

export const LocationContext = React.createContext();

import * as TaskManager from "expo-task-manager";
import { pointInPolygon } from "../../infrastructure/pointInPolygon";

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState(
    [0, 0]
    // 37.58646601781994,127.02913699768948
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  // // 현재 위치 추적하는 Task
  // const LOCATION_TRACKING = "background-location-task";
  // TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  //   if (error) {
  //     console.log("LOCATION_TRACKING task ERROR:", error);
  //     return;
  //   }
  //   if (data) {
  //     const { locations } = data;
  //     let lat = locations[0].coords.latitude;
  //     let long = locations[0].coords.longitude;

  //     console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
  //   }
  // });
  // const startLocationTracking = async () => {
  //   await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
  //     accuracy: Location.Accuracy.Highest,
  //     timeInterval: 5000,
  //     distanceInterval: 0,
  //   });
  //   const hasStarted = await Location.hasStartedLocationUpdatesAsync(
  //     LOCATION_TRACKING
  //   );
  //   console.log("tracking started?", hasStarted);
  // };

  // // pointInPolygon 사용
  // useEffect(() => {
  //   startLocationTracking();
  // }, []);
  // var polygon = [
  //   [37.586328, 127.028815],
  //   [37.583628, 127.028933],
  //   [37.583628, 127.029451],
  //   [37.586328, 127.029361],
  //   [37.586328, 127.028815],
  // ];
  // console.log("pointInPolygon");
  // console.log(pointInPolygon([37.5852385, 127.0289776], polygon));

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location2 = await Location.getCurrentPositionAsync();

      await setLocation([
        location2.coords.latitude,
        location2.coords.longitude,
      ]);
      await setIsLoading(false);
    })();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        errorMsg,
        isLoading,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
