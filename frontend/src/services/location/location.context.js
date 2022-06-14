import React, { useState, useEffect } from "react";

import * as Location from "expo-location";

import * as TaskManager from "expo-task-manager";

import { GeofencingEventType } from "expo-location";

import * as Location from "expo-location";

import * as TaskManager from "expo-task-manager";
import { pointInPolygon } from "./src/infrastructure/pointInPolygon";

// 현재 위치 추적하는 Task
const LOCATION_TRACKING = "background-location-task";
TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log("LOCATION_TRACKING task ERROR:", error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;

    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
  }
});

const startLocationTracking = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 5000,
    distanceInterval: 0,
  });
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TRACKING
  );
  console.log("tracking started?", hasStarted);
};

// pointInPolygon 사용
useEffect(() => {
  startLocationTracking();
}, []);
var polygon = [
  [37.586328, 127.028815],
  [37.583628, 127.028933],
  [37.583628, 127.029451],
  [37.586328, 127.029361],
  [37.586328, 127.028815],
];
console.log("pointInPolygon");
console.log(pointInPolygon([37.5852385, 127.0289776], polygon));

// //geofencing task
// const GEOFENCING_TEST = "geofencing test";
// TaskManager.defineTask(
//   GEOFENCING_TEST,
//   ({ data: { eventType, region }, error }) => {
//     if (error) {
//       // check `error.message` for more details.
//       return;
//     }
//     if (eventType === GeofencingEventType.Enter) {
//       // 입장했을 때 작동.
//       console.log("You've entered region:", region);
//     } else if (eventType === GeofencingEventType.Exit) {
//       console.log("You've left region:", region);
//     }
//   }
// );

// 기존 location context 시작
export const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState(
    [0, 0]
    // 37.58646601781994,127.02913699768948
  );
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

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
