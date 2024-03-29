import React, { useEffect, useContext, useState, useRef } from "react";

import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
//Services
import { LocationContext } from "../../../services/location/location.context";

//Components

import { Loading } from "../../../components/Loading";

import { PlaceSearchBox } from "./component/PlaceSearchBox";
//assets
import { PlaceDropBox } from "./component/PlaceDropBox";
import { PlaceBlankBox } from "./component/PlaceBlankBox";

import { changedDrops, getMapDrops } from "../../../services/drops/GetDrops";
import { GNB } from "../../../components/GlobalNavigationBar";
import { MainContainerView } from "../../../infrastructure/style/styledComponent";
import { WhiteSheet } from "../../../components/utility/whiteSheet";
import { ClusteredMap } from "./component/ClusteredMap";

export const MapScreen = ({ navigation, route }) => {
  //////////////////////////지도 및 화면비율 정의///////////////////////////////////
  const map = useRef(null);

  ////////////////////////////초기 state들//////////////////////////////////////

  /////1. 모드들

  const [writeMode, setWriteMode] = useState(false);
  const [isDetail, setIsDetail] = useState(false);

  //선택된 polygon
  const [activePolygon, setActivePolygon] = useState(null);
  //선택한 구역의 장소리스트 API에서 받아와 넣는 곳
  const [placeList, setPlaceList] = useState([]);
  //선택된 place
  const [selectedPlace, setSelectedPlace] = useState(null);

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

  /////드롭다운로드
  //개별 드롭
  const [drop, setDrop] = useState(null);
  const [dropTime, setDropTime] = useState(null);
  const [dropContent, setDropContent] = useState(null);

  //다운로드 받아진 드롭리스트
  //getMapDrops 수정해야 함. 서버와 통신 없이 데이터만 들어가 있는 상태.
  const [drops, setDrops] = useState(getMapDrops);

  // 선택한 장소의 이름/주소/좌표들어가는 것
  const [pressedAddressID, setPressedAddressID] = useState("");
  const [pressedAddress, setPressedAddress] = useState("");
  const [pressedAddressName, setPressedAddressName] = useState("새로운 장소");

  ////////////////여기서부터 useEffect 정의하기 시작/////////////////////////

  // activePolygon 바뀌면 해당 구역의 드롭 받아오기.
  // 다른 구역 클릭하면 장소 클릭 x 상태로 돌아가기.
  useEffect(() => {
    if (activePolygon == null) {
      setDrops(getMapDrops);
    } else {
      setDrops(changedDrops[activePolygon.pk - 1]);
    }

    setSelectedPlace(null);
  }, [activePolygon]);

  /////----writePage에서 다시 되돌아올 때 초기화면으로
  useEffect(() => {
    setWriteMode(false);
  }, [route.params]);

  //////////정해진 장소정보 가져오는 함수

  /////////맵그리는 것 여기서부터 시작///////

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {selectedPlace == null && activePolygon == null ? (
        <>
          <GNB
            navigation={navigation}
            subTitle={"현재 인촌기념관 구역에 있습니다."}
            goBack={null}
            secondButton={null}
          ></GNB>
        </>
      ) : selectedPlace == null && activePolygon != null ? (
        <>
          <GNB
            navigation={navigation}
            title={activePolygon.name + " 구역을 검색해보세요"}
            goBack={setActivePolygon}
            activePolygon={activePolygon}
            selectedPlace={selectedPlace}
            secondButton={null}
          ></GNB>
        </>
      ) : activePolygon && selectedPlace ? (
        <>
          <GNB
            navigation={navigation}
            title={selectedPlace.name}
            goBack={setSelectedPlace}
            activePolygon={activePolygon}
            selectedPlace={selectedPlace}
            secondButton={null}
          ></GNB>
        </>
      ) : null}

      <MainContainerView style={{ height: "90%" }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="position">
            <View>
              {/*----------------------- 지도 컴포넌트--------------------------- */}
              <View onPress={Keyboard.dismiss}>
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
                  region={currentRegion}
                  updateRegion={updateRegion}
                  activePolygon={activePolygon}
                  setActivePolygon={setActivePolygon}
                ></ClusteredMap>
              </View>
            </View>
            {/*----------------------- 맨 하단 컴포넌트--------------------------- */}
            {selectedPlace == null && activePolygon == null ? (
              <>
                {PlaceBlankBox(
                  setWriteMode,
                  setPressedLocation,
                  location,
                  map,
                  LATITUDE_DELTA,
                  LONGITUDE_DELTA
                )}
              </>
            ) : selectedPlace == null && activePolygon != null ? (
              <>
                {/* 여기에 구역(polygon) 클릭 후 나타나는 컴포넌트 배치. */}
                <PlaceSearchBox
                  placeList={placeList}
                  setPlaceList={setPlaceList}
                  setSelectedPlace={setSelectedPlace}
                  activePolygon={activePolygon}
                  navigation={navigation}
                ></PlaceSearchBox>
              </>
            ) : activePolygon && selectedPlace ? (
              <>
                {/* 여기에 장소(place) 클릭 후 나타나는 컴포넌트 배치. */}
                <PlaceDropBox
                  selectedPlace={selectedPlace}
                  activePolygon={activePolygon}
                  navigation={navigation}
                />
              </>
            ) : null}

            {/* <WhiteSheet /> */}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </MainContainerView>
    </>
  );
};
