import { Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { Audio } from "expo-av";
import { theme } from "../../../infrastructure/theme";
import { StatusBar } from "expo-status-bar";
import { Camera } from "expo-camera";

import * as MediaLibrary from "expo-media-library";
import * as VideoThumbnails from "expo-video-thumbnails";
import React, { useEffect, useRef, useState } from "react";
import { SvgXml } from "react-native-svg";
import backButton from "../../../../assets/Buttons/backButton";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { utils } from "./writescreen.styles";
import backButtonPurple from "../../../../assets/Buttons/backButtonPurple";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);

export const CameraScreen = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isFlash, setIsFlash] = useState(false);

  const [type, setType] = useState(0);
  const [showGallery, setShowGallery] = useState(true);
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryScrollRef, setGalleryScrollRef] = useState(null);
  const [galleryPickedImage, setGalleryPickedImage] = useState(null);
  const cameraRef = useRef();
  const isFocused = useIsFocused();

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////함수정의//////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    (async () => {
      const cameraPermissions = await Camera.requestCameraPermissionsAsync();
      const galleryPermissions = await MediaLibrary.requestPermissionsAsync();
      const audioPermissions = await Audio.requestPermissionsAsync();

      if (
        cameraPermissions.status === "granted" &&
        audioPermissions.status === "granted" &&
        galleryPermissions.status === "granted"
      ) {
        const getPhotos = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["photo", "video"],
        });
        getPhotos.assets.unshift({
          creationTime: 1000000000000,
          duration: 0,
          filename: "CamButton",
          height: 2532,
          id: "001",
          mediaSubtypes: ["screenshot"],
          mediaType: "photo",
          modificationTime: 1000000000000,
          uri: "../../../../assets/Buttons/btn_gallery.png",
          width: 1170,
        });
        setGalleryItems(getPhotos);
        setGalleryPickedImage(getPhotos.assets[1]);
        setHasPermission(true);
      }
    })();
  }, []);
  const onCameraReady = () => {
    setIsCameraReady(true);
  };
  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;

      navigation.navigate({
        name: "WriteScreen",
        params: { source, imageSource: null, type: 1 },
        merge: true,
      });
    }
  };

  const generateThumbnail = async (source) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(source, {
        time: 5000,
      });
      return uri;
    } catch (e) {
      console.warn(e);
    }
  };

  const switchCamera = () => {
    if (isPreview) {
      return;
    }
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };
  const handleGoToSaveOnGalleryPick = async () => {
    let type = galleryPickedImage.mediaType == "video" ? 0 : 1;

    const loadedAsset = await MediaLibrary.getAssetInfoAsync(
      galleryPickedImage
    );
    let imageSource = null;
    if (type == 0) {
      imageSource = await generateThumbnail(galleryPickedImage.uri);
    }

    navigation.navigate({
      name: "WriteScreen",
      params: {
        source: loadedAsset.localUri,
        type,
        imageSource,
      },
      merge: true,
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////사진촬영하는 버튼부분//////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text style={styles.text}>No access to camera</Text>;
  }

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////아래에 갤러리 보이는 화면//////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  if (showGallery) {
    return (
      // <ScrollView ref={(ref) => setGalleryScrollRef(ref)}>

      <FlatList
        ListHeaderComponent={
          <>
            <View style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}>
              {/* 이미지 잘리는 문제 있음 */}

              <Image
                source={{ uri: galleryPickedImage.uri }}
                style={[{ aspectRatio: 1 / 1, height: WINDOW_WIDTH }]}
                ratio={"1:1"}
              />
            </View>
            <View style={styles.middleBar}>
              <View style={styles.middleBar1}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <SvgXml xml={backButton} width={26} height={26}></SvgXml>
                </TouchableOpacity>
              </View>
              <View style={styles.middleBar2}>
                <TouchableOpacity
                  style={styles.setPictureButton}
                  onPress={() => {
                    handleGoToSaveOnGalleryPick();
                  }}
                >
                  <Text style={styles.setPictureButtonTxt}>선택</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
        numColumns={3}
        horizontal={false}
        data={galleryItems.assets}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.containerImage}
            onPress={() => {
              index == 0 ? setShowGallery(false) : setGalleryPickedImage(item);
            }}
          >
            {index == 0 ? (
              <ImageBackground style={styles.camBtn} source={{ uri: item.uri }}>
                <Feather name={"camera"} size={50} color="#c8c8c8" />
              </ImageBackground>
            ) : (
              <Image style={styles.image} source={{ uri: item.uri }} />
            )}
          </TouchableOpacity>
        )}
      />
    );
  }

  ///////////////////////////////////////////////////////////////////////////////////
  //////////////////////////미리보기 화면//////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  return (
    <SafeAreaView
      style={{ flex: 1, flexDirection: "column", backgroundColor: "white" }}
    >
      <StatusBar style="dark" />
      <View style={{ height: "20%" }}>
        <View style={styles.GoBack}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <SvgXml xml={backButtonPurple} width={26} height={26}></SvgXml>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[{ aspectRatio: 1 / 1, width: "100%" }]}>
        {isFocused ? (
          <Camera
            ref={cameraRef}
            type={cameraType}
            flashMode={
              isFlash
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }
            style={[{ aspectRatio: 1 / 1, height: "100%", zIndex: 10 }]}
            ratio={"1:1"}
            onCameraReady={onCameraReady}
          ></Camera>
        ) : null}
      </View>

      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            width: "100%",
            height: "30%",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "white",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              disabled={!isCameraReady}
              onPress={() => setIsFlash(!isFlash)}
            >
              <Feather
                style={utils.margin15}
                name={"zap"}
                size={25}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
              <Feather
                style={utils.margin15}
                name="rotate-cw"
                size={25}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!isCameraReady}
              onPress={takePicture}
              style={styles.capturePicture}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",

              alignItems: "center",
              width: "30%",
            }}
          >
            <TouchableOpacity
              style={styles.containerImage2}
              onPress={() => setShowGallery(true)}
            >
              <Image
                style={styles.image}
                source={{ uri: galleryItems.assets[1].uri }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  middleBar: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#996afc",
    flex: 1,
  },
  middleBar1: {
    flex: 1,
    justifyContent: "flex-start",
    paddingStart: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  middleBar2: {
    flex: 6,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  GoBack: { position: "absolute", zIndex: 999, margin: 30, top: 30 },
  setPictureButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#AA83FC",

    marginVertical: 10,
    marginRight: 20,
    borderRadius: 50,
    width: 60,
    height: 30,
    borderColor: "#ffffff",
    borderWidth: 1,
  },
  setPictureButtonTxt: {
    fontFamily: theme.fonts.bold,
    fontSize: 13,
    color: "#ffffff",
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  media: {
    ...StyleSheet.absoluteFillObject,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
  control: {
    position: "absolute",
    flexDirection: "row",
    bottom: 38,
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  recordIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 0,
    opacity: 0.7,
  },
  recordTitle: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
  recordDot: {
    borderRadius: 3,
    height: 6,
    width: 6,
    backgroundColor: "#ff0000",
    marginHorizontal: 5,
  },
  text: {
    color: "#000000",
  },

  capture: {
    backgroundColor: "red",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    // eslint-disable-next-line no-dupe-keys
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  capturePicture: {
    borderWidth: 6,
    borderColor: "#996afc",
    backgroundColor: "white",
    borderRadius: 5,
    height: captureSize,
    width: captureSize,
    // eslint-disable-next-line no-dupe-keys
    borderRadius: Math.floor(captureSize / 2),
    marginHorizontal: 31,
  },
  containerImage: {
    flex: 1 / 3,
  },
  containerImage2: {
    width: 60,
    height: 60,
  },
  image: {
    aspectRatio: 1 / 1,
    borderRadius: 15,
  },
  camBtn: {
    aspectRatio: 1 / 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camSvg: {},
});
