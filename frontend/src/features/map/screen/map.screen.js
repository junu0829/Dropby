import React, { useEffect, useContext, useState, useRef } from "react";

import {
  Dimensions,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";

//Services
import { LocationContext } from "../../../services/location/location.context";
import { getAddress, getPlaceDetail } from "../../../services/maps/address";

//API
import { APIKey, PlAPIKey } from "../../../../APIkeys";

//Components
import { dropsList } from "./component/DropsList";
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
import { Cloud } from "./component/cloud";
import { SlideView } from "../../../components/animations/slide.animation";
import LOCAL_HOST from "../../../services/local";

//assets
import Drops from "../../../../assets/images/Drops";
import write from "../../../../assets/Buttons/write";
import currentLocation from "../../../../assets/Buttons/currentLocation";
import selectButton from "../../../../assets/Buttons/selectButton";
import backButton2 from "../../../../assets/Buttons/backButton2";
import PlacePlusIcon from "../../../../assets/Buttons/PlacePlusIcon";
import PlaceAddIcon from "../../../../assets/Buttons/PlaceAddIcon";
import axiosInstance from "../../../services/fetch";
import { PlaceBox } from "./component/placeBox";

export const MapScreen = ({ navigation, route }) => {
  //////////////////////////지도 및 화면비율 정의///////////////////////////////////
  const map = useRef(null);

  ////////////////////////////초기 state들//////////////////////////////////////

  /////1. 모드들

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
  //화면비
  let { width, height } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.008; //Very high zoom level
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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

  useEffect(() => {
    setMarkers([
      {
        latitude: pressedLocation.latitude,
        longitude: pressedLocation.longitude,
      },
    ]);
  }, [pressedLocation]);
  console.log(Markers);

  /////드롭다운로드
  //개별 드롭
  const [drop, setDrop] = useState(null);
  const [dropTime, setDropTime] = useState(null);
  const [dropContent, setDropContent] = useState(null);
  //다운로드 받아진 드롭리스트
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
  // 선택한 장소의 이름/주소/좌표들어가는 것
  const [pressedAddressID, setPressedAddressID] = useState("");
  const [pressedAddress, setPressedAddress] = useState("");
  const [pressedAddressName, setPressedAddressName] = useState("새로운 장소");

  ////////////////////////////여기서부터 useEffect 정의하기 시작//////////////////////////////////////////////////////

  //////새로운  장소정보 가져오는 함수
  useEffect(() => {
    getAddress(pressedLocation, setPressedAddressID, APIKey);
    getPlaceDetail(
      setPressedAddress,
      setPressedAddressName,
      pressedAddressID,
      PlAPIKey
    );

    console.log("longclicked");
  }, [pressedAddressID, pressedLocation]);

  /////----writePage에서 다시 되돌아올 때 초기화면으로
  useEffect(() => {
    setWriteMode(false);
  }, [route.params]);

  //////////정해진 장소정보 가져오는 함수

  const allCoords = drops.map((i) => ({
    geometry: {
      coordinates: [i.latitude, i.longitude],
    },
  }));

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////맵그리는 것 여기서부터 시작//////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  //----------return안에 if를 넣자
  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <View>
        <ExpoStatusBar style="auto" />

        {/*----------------------- 맨 상단 컴포넌트--------------------------- */}
        <SearchContainer>
          {!isDetail ? (
            //Component빼기
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
                <TouchableOpacity onPress={() => {}}>
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

        {/*----------------------- 지도 컴포넌트--------------------------- */}
        <View>
          {dropsList(
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
          )}
        </View>
        {/*----------------------- 맨 하단 컴포넌트--------------------------- */}
        {!writeMode && !dropViewMode ? (
          <>
            <Container>
              {/* 빼놓자 */}
              <WriteButton
                style={{ opacity: 0.95 }}
                onPress={() => {
                  setWriteMode(true);
                  setPressedLocation({
                    latitude: location[0],
                    longitude: location[1],
                  });
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
            {PlaceBox(
              setWriteMode,
              pressedAddressName,
              pressedAddress,
              navigation,
              pressedLocation
            )}
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
