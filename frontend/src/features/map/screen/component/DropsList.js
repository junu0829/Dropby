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
  setDropTime,
  activePolygon,
  setActivePolygon,
  activePolygonName,
  setActivePolygonName
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
        activePolygon={activePolygon}
        setActivePolygon={setActivePolygon}
        activePolygonName={activePolygonName}
        setActivePolygonName={setActivePolygonName}
      >
        {drops.map((drop) => {
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
              ></ImageBackground>
              <Text
                style={{
                  fontSize: 10,
                }}
              >
                {drop.content}
              </Text>
            </Marker>
          );
        })}
      </ClusteredMap>
    </>
  );
};
