import React, {
  useEffect,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import { useIsFocused } from "@react-navigation/native";

import {
  Dimensions,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  TextInput,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";

//Services
import { LocationContext } from "../../../services/location/location.context";
import { LoadedDrop } from "../../../services/drops/LoadedDrop.service";
import axios from "axios";

//API
import { APIKey, PlAPIKey } from "../../../../APIkeys";

//Components
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { Loading } from "../../../components/Loading";
import { Marker } from "react-native-maps";
import { Text } from "../../../components/typography/text.component";
import { DropPreview } from "./component/dropPreview";
import {
  SearchContainer,
  Container,
  PlaceContainer,
  ContainerEnd,
  TextContainer,
  styles,
  PlaceNameContainer,
  PlaceContainer2,
  PlaceContainer3,
  SelectButtonContainer,
  BackButtonContainer,
  WriteButton,
  CurrentLocationButton,
  PlaceNameContainer2,
  ContainerEnd2,
} from "./map.screen.styles";
import { ClusteredMap } from "./component/ClusteredMap";
import { Cloud } from "./component/cloud";
import { SlideView } from "../../../components/animations/slide.animation";
import LOCAL_HOST from "../../../services/local";

//assets
import Drops from "../../../../assets/images/Drops";
import write from "../../../../assets/Buttons/write";
import PurpleDrop from "../../../../assets/images/PurpleDrop.png";
import currentLocation from "../../../../assets/Buttons/currentLocation";
import selectButton from "../../../../assets/Buttons/selectButton";
import backButton2 from "../../../../assets/Buttons/backButton2";
import PlacePlusIcon from "../../../../assets/Buttons/PlacePlusIcon";
import PlaceAddIcon from "../../../../assets/Buttons/PlaceAddIcon";
import axiosInstance from "../../../services/fetch";

export const MapScreen = ({ navigation, route }) => {
  //////////////////////////지도 및 화면비율 정의///////////////////////////////////
  const map = useRef(null);
  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.008; //Very high zoom level
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  ////////////////////////////초기 state들//////////////////////////////////////

  /////1. 모드들
  const [isAddressLoading, SetIsAddressLoading] = useState(true);
  const [dropViewMode, setDropViewMode] = useState(false);
  const showModal = () => {
    setDropViewMode(true);
  };
  const [writeMode, setWriteMode] = useState(false);
  const [isDetail, setIsDetail] = useState(false);

  /////2. 초기 데이터셋팅
  //------------현위치
  const { location, isLoading } = useContext(LocationContext);
  //------------현재 영역
  const [currentRegion, updateRegion] = useState({
    latitude: location[0],
    longitude: location[1],
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [rectNW, setRectNW] = useState("1,1");
  const [rectSE, setRectSE] = useState("0,0");
  useEffect(() => {
    const NWLat = currentRegion.latitude + currentRegion.latitudeDelta;
    const NWLng = currentRegion.longitude + currentRegion.longitudeDelta;
    const SELat = currentRegion.latitude - currentRegion.latitudeDelta;
    const SELng = currentRegion.longitude - currentRegion.longitudeDelta;
    setRectNW(`${NWLng},${NWLat}`);
    setRectSE(`${SELng},${SELat}`);
  }, [currentRegion, writeMode]);
  //---------------장소선택
  const [pressedLocation, setPressedLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [Markers, setMarkers] = useState([
    {
      latitude: Number(location[0]),
      longitude: Number(location[1]),
    },
  ]);
  /////드롭다운로드
  const [drop, setDrop] = useState(null);
  const [dropTime, setDropTime] = useState(null);
  const [dropContent, setDropContent] = useState(null);
  const [drops, setDrops] = useState([
    {
      emoji: "😀",
      content: "드롭바이짱",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.398811798656766,
      longitude: 126.6377265751362,
      pk: 22,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
  ]);

  const [pressedAddressID, setPressedAddressID] = useState("");
  const [pressedAddress, setPressedAddress] = useState("");
  const [pressedAddressName, setPressedAddressName] = useState("새로운 장소");

  ////////////////////////////여기서부터 useEffect 정의하기 시작//////////////////////////////////////////////////////

  //////희한하게 얘를 useEffect바깥에 놓으면 어떨땐 되고 어떨땐 안되는데... 조금 더 테스트를 해볼 필요가 있겠다. 만약에 드롭이 하나밖에 안뜨면 reload 하거나, useEffect안에 넣고 해볼 것.

  // const LoadDrop = () => {
  //   console.log("드롭 불러오는중...");

  //   axiosInstance
  //     .get(`http://${LOCAL_HOST}:3000/drops`)
  //     .then((res) => {
  //       console.log("드롭 불러옴");
  //       setDrops(res.data.data);
  //     })
  //     .catch((error) => {
  //       console.log("error message: ", error.message);
  //     });
  // };

  const isFocused = useIsFocused();
  /// 처음 시작시 useEffect가 세번 되풀이 되는데 막을 방법이 없을까? 찾아볼것.
  useEffect(() => {}, [currentRegion, isFocused]);

  const dropsList = (drops) => {
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
          isAddressLoading={isAddressLoading}
          Markers={Markers}
          allCoords={allCoords}
          region={currentRegion}
          updateRegion={updateRegion}
        >
          {drops.map((drop, i) => {
            console.log(drop.pk);
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
  //////새로운  장소정보 가져오는 함수
  useEffect(() => {
    const getAddress = () => {
      fetch(
        "https://maps.googleapis.com/maps/api/geocode/json?address=" +
          pressedLocation.latitude +
          "," +
          pressedLocation.longitude +
          `&key=${APIKey}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          const responseResultsNumber = 0;

          setPressedAddressID(
            responseJson.results[responseResultsNumber].place_id
          );
        });
    };

    const getPlaceDetail = () => {
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${pressedAddressID}&key=${PlAPIKey}`
      )
        .then((response) => response.json())
        .then(async (responseJson) => {
          await setPressedAddress(responseJson.result.formatted_address);
          await setPressedAddressName(`새로운 장소`);
          console.log("a");
        });
    };

    getAddress();
    getPlaceDetail();

    console.log("longclicked");
  }, [pressedAddressID, pressedLocation]);

  useEffect(() => {
    setWriteMode(false);
  }, [route.params]);

  //////////정해진 장소정보 가져오는 함수

  useEffect(() => {
    setMarkers([
      {
        latitude: pressedLocation.latitude,
        longitude: pressedLocation.longitude,
      },
    ]);
  }, [pressedLocation]);

  const allCoords = drops.map((i) => ({
    geometry: {
      coordinates: [i.latitude, i.longitude],
    },
  }));

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////맵그리는 것 여기서부터 시작//////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles3.container}
        >
          <View>
            <ExpoStatusBar style="auto" />
            <SearchContainer>
              {!isDetail ? (
                <LinearGradient
                  colors={[
                    "rgba(166, 110, 159, 0.9)",
                    "rgba(166, 110, 159, 0.65)",
                    "rgba(166, 110, 159, 0.15)",
                    "rgba(166, 110, 159, 0.0)",
                  ]}
                  style={styles.background}
                  locations={[0.1, 0.45, 0.77, 1.0]}
                >
                  {/* writeMode이지 않을 경우에 cloud */}
                  {!writeMode ? (
                    <TouchableOpacity
                      onPress={() => {
                        LoadedDrop(setDrops);
                      }}
                    >
                      <Cloud navigation={navigation} region={currentRegion} />
                    </TouchableOpacity>
                  ) : null}
                </LinearGradient>
              ) : null}

              {writeMode && (
                <TextContainer>
                  <Text variant="hint">드롭을 남길 장소를 눌러주세요</Text>
                </TextContainer>
              )}
            </SearchContainer>

            <View
              onStartShouldSetResponder={() => {
                setDropViewMode(false);
              }}
            >
              {dropsList(drops)}
            </View>

            {!writeMode && !dropViewMode ? (
              <>
                <Container>
                  <WriteButton
                    style={{ opacity: 0.95 }}
                    onPress={() => {
                      setWriteMode(true);
                      setPressedLocation({
                        latitude: location[0],
                        longitude: location[1],
                      });
                      SetIsAddressLoading(false);
                    }}
                  >
                    <SvgXml xml={write} width={56} height={65} />
                  </WriteButton>

                  <ContainerEnd>
                    <CurrentLocationButton
                      style={{ opacity: 0.95 }}
                      onPress={() => {
                        map.current.animateToRegion({
                          // 현재위치 버튼
                          latitude: location[0],
                          longitude: location[1],
                          latitudeDelta: LATITUDE_DELTA,
                          longitudeDelta: LONGITUDE_DELTA,
                        });
                        setPressedLocation({
                          latitude: location[0],
                          longitude: location[1],
                        });
                      }}
                    >
                      <SvgXml xml={currentLocation} width={50} height={50} />
                    </CurrentLocationButton>
                  </ContainerEnd>
                </Container>
              </>
            ) : writeMode ? (
              <>
                <PlaceContainer>
                  <View
                    style={{
                      bottom: 70,
                      width: 50,
                      height: 50,
                      marginLeft: 5,
                      Index: 5,
                    }}
                  >
                    {!newPlaceSelectionMode ? (
                      <TouchableOpacity
                        onPress={() => {
                          setNewPlaceSelectioMode(true);
                        }}
                      >
                        <SvgXml xml={PlacePlusIcon} width={40} height={40} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setNewPlaceSelectioMode(false);
                        }}
                      >
                        <SvgXml xml={PlaceAddIcon} width={40} height={40} />
                      </TouchableOpacity>
                    )}
                  </View>
                  <PlaceContainer2>
                    <BackButtonContainer
                      onPress={() => {
                        setWriteMode(false);
                      }}
                    >
                      <SvgXml xml={backButton2} width={50} height={50} />
                    </BackButtonContainer>
                    <PlaceNameContainer>
                      {!newPlaceSelectionMode ? (
                        <PlaceNameContainer2>
                          <Text style={styles.placename}>
                            {pressedAddressName}
                          </Text>
                        </PlaceNameContainer2>
                      ) : (
                        <PlaceNameContainer2>
                          <View style={styles3.TextBack}>
                            <TextInput
                              style={styles3.enter}
                              placeholder="새로운 장소"
                              onChangeText={(content) =>
                                setPressedAddressName(content)
                              }
                            ></TextInput>
                          </View>
                        </PlaceNameContainer2>
                      )}

                      <Text style={styles.placeaddress}>{pressedAddress}</Text>
                    </PlaceNameContainer>

                    <ContainerEnd2>
                      <TouchableOpacity style={styles.Drops}>
                        <SvgXml xml={Drops} width={22} height={30} />
                      </TouchableOpacity>
                      <Text style={styles.drop}>0개 </Text>
                    </ContainerEnd2>
                  </PlaceContainer2>

                  <PlaceContainer3>
                    <SelectButtonContainer
                      onPress={() => {
                        navigation.navigate("WriteScreen", [
                          { pressedAddress },
                          { pressedAddressName },
                          { pressedLocation },
                        ]);
                      }}
                    >
                      <SvgXml xml={selectButton} width={170} height={32} />
                    </SelectButtonContainer>
                  </PlaceContainer3>
                </PlaceContainer>
              </>
            ) : dropViewMode ? (
              <>
                <TouchableWithoutFeedback onPress={() => {}}>
                  <SlideView isDetail={isDetail}>
                    <DropPreview
                      pressedAddress={pressedAddress}
                      pressedAddressName={pressedAddressName}
                      dropContent={dropContent}
                      pressedLocation={pressedLocation}
                      navigation={navigation}
                      drop={drop}
                      dropTime={dropTime}
                      isDetail={isDetail}
                      setIsDetail={setIsDetail}
                    />
                  </SlideView>
                </TouchableWithoutFeedback>
              </>
            ) : null}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
};

const styles3 = StyleSheet.create({
  container: {
    flex: 1,
  },
  enter: {
    fontSize: 17,
    fontWeight: "500",
    color: "#9A9A9A",
    marginLeft: 5,
    textAlign: "center",
  },
  TextBack: {
    width: 200,
    left: -8,
    top: 3,
    height: 25,
    padding: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#F4F4F4",
  },
});
