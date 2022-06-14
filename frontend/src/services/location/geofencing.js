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

//geofencing task
const GEOFENCING_TEST = "geofencing test";
TaskManager.defineTask(
  GEOFENCING_TEST,
  ({ data: { eventType, region }, error }) => {
    if (error) {
      // check `error.message` for more details.
      return;
    }
    if (eventType === GeofencingEventType.Enter) {
      // 입장했을 때 작동.
      console.log("You've entered region:", region);
    } else if (eventType === GeofencingEventType.Exit) {
      console.log("You've left region:", region);
    }
  }
);

// 컴포넌트 안에 작성

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
const startGeofencing = async () => {
  await Location.startGeofencingAsync(GEOFENCING_TEST, [
    {
      latitude: 37.578,
      longitude: 127.2219,
      radius: 1000,
    },
  ]);
  //region 배열. polygon 지원은 안하는듯.
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(
    LOCATION_TRACKING
  );
  console.log("geofencing started?", hasStarted);
};

useEffect(() => {
  startLocationTracking();
  startGeofencing();
}, []);
