import React from "react";
import { Marker } from "react-native-maps";
import { ClusteredMap } from "./ClusteredMap";
import { ImageBackground, Text, Keyboard } from "react-native";
import PurpleDrop from "../../../../../assets/images/PurpleDrop.png";

export const dropsList = (
  drops,
  setPressedLocation,
  setMarkers,
  setPressedAddress,
  setPressedAddressName,
  location,
  map,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
  writeMode,
  Markers,
  allCoords,
  currentRegion,
  updateRegion,
  showModal,
  setWriteMode,
  setDropContent,
  setDrop,
  setDropTime
) => {
  return (
    <>
      <ClusteredMap
        onPress={Keyboard.dismiss}
        onLongPress={(event) => {
          setPressedLocation(event.nativeEvent.coordinate);
          setMarkers([]);
        }}
        ref={map}
        setMarkers={setMarkers}
        setPressedAddress={setPressedAddress}
        setPressedAddressName={setPressedAddressName}
        location={location}
        LATITUDE_DELTA={LATITUDE_DELTA}
        LONGITUDE_DELTA={LONGITUDE_DELTA}
        writeMode={writeMode}
        Markers={Markers}
        allCoords={allCoords}
        region={currentRegion}
        updateRegion={updateRegion}
      >
        {drops.map((drop, i) => {
          return (
            <Marker
              style={{ opacity: 0.85 }}
              key={drop.pk}
              coordinate={{
                latitude: drop && Number(drop.latitude),
                longitude: drop && Number(drop.longitude),
              }}
              onPress={() => {
                showModal();
                setWriteMode(false);
                setPressedLocation({
                  latitude: drop.latitude,
                  longitude: drop.longitude,
                });
                setDropContent(drop.content);
                setDrop(drop.pk);
                setDropTime(drop.createdAt);
              }}
            >
              <ImageBackground
                source={PurpleDrop}
                style={{
                  width: 34,
                  height: 44,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    left: 1,
                    top: 1,
                  }}
                ></Text>
              </ImageBackground>
            </Marker>
          );
        })}
      </ClusteredMap>
    </>
  );
};
