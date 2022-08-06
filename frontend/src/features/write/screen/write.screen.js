import React from "react";

import {
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image,
  Video,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Switch,
} from "react-native";
import { useEffect, useState, useContext } from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

import Constants from "expo-constants";

import addIcon from "../../../../assets/Buttons/addIcon";
import backButton2 from "../../../../assets/Buttons/backButton2";
import sendingButton from "../../../../assets/Buttons/sendingButton";
//
import addPicture from "../../../../assets/Buttons/addPicture";
import LockButtonUnlocked from "../../../../assets/Buttons/LockButton(Unlocked)";

import { styles } from "./writescreen.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postDrop } from "../../../services/drops/postDrop";
import { UpdateDrop } from "../../../services/drops/UpdateDrop";
import { GNB } from "../../../components/GlobalNavigationBar";
import { SlideView } from "../../../components/animations/slide.animation";
import styled from "styled-components/native";
import backButton from "../../../../assets/Buttons/backButton";
import { MainContainerView } from "../../../infrastructure/style/styledComponent";
import DropBackground from "../../../../assets/images/writeDropPng/drawable-xxxhdpi/pin_edit.png";
import ico_non from "../../../../assets/images/ico_non";
import btn_photoadd from "../../../../assets/Buttons/btn_photoadd";

export const WriteScreen = ({ navigation, route }) => {
  const place = route.params.selectedPlace
    ? route.params.selectedPlace
    : route.params.place;

  // const getToken = async () => AsyncStorage.getItem("accessToken");
  //accessToken 아래에 붙여넣기
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjUyNTI2NTUxLCJleHAiOjE2NTUxMTg1NTF9.eCGutzk0Zl7eJLCRvqY5yO6xcctIe9O7_Jvv5BxNuVA";

  const [placeAddress, setPlaceAddress] = useState("새로운 장소-주소");

  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [name, setName] = useState("test");
  const [area, setArea] = useState(null);
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  /////////////////////로컬 이미지 여기에 담김
  const [image, setImage] = useState(null);

  const frm = new FormData();
  frm.append("image", "false");
  frm.append("title", name);
  frm.append("content", content);
  frm.append("isPrivate", isPrivate);
  frm.append("emojiSlug", "neutral_face");

  /////////////

  useEffect(() => {
    if (route.params.activePolygon) {
      setArea(route.params.activePolygon);
    } else {
      setArea(route.params.place.areaPk);
      setContent(route.params.drop.content);
    }
  }, []);

  useEffect(() => {
    setImage(route.params.source);
  }, [route, image]);

  ////////////////////

  const handleContent = (e) => {
    setContent(e);
  };

  const PostWrite = async () => {
    route.params.drop
      ? await UpdateDrop(area, place.pk, route.params.drop.pk, frm)
      : await postDrop(area.pk, place.pk, frm);
  };

  return (
    <>
      <GNBButtonPart>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <SvgXml xml={backButton} width={26} height={26}></SvgXml>
        </TouchableOpacity>
        <GNBButtonPart2>
          <TouchableOpacity
            style={{ marginRight: 30, marginTop: 8 }}
            onPress={() => {
              PostWrite();
              navigation.navigate("MapScreen");
            }}
          >
            <Text style={style.title}>전송</Text>
          </TouchableOpacity>
        </GNBButtonPart2>
      </GNBButtonPart>
      <SlideView duration={2000} startValue={0} endValue={30}>
        <GNB
          navigation={navigation}
          title={place.name}
          goBack={navigation.goBack}
          mode={"placeFeed"}
        ></GNB>
        <MainContainerView style={{ marginTop: 13 }}>
          <View style={style.container1}>
            <View style={{ height: 20 }}></View>
            <View style={style.container2}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerTop}>
                  <ImageBackground
                    source={DropBackground}
                    style={{
                      width: 73,
                      height: 100,

                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selectedEmoji != null ? (
                      <Text style={style.DropEmoji}>{selectedEmoji}</Text>
                    ) : (
                      <SvgXml
                        xml={ico_non}
                        style={style.DropEmojiNull}
                        width={40}
                        height={40}
                      ></SvgXml>
                    )}
                  </ImageBackground>

                  <TouchableOpacity
                    style={style.dropEditButton}
                    onPress={() => {
                      navigation.navigate("Emoji");
                    }}
                  >
                    <Text style={style.DropEmojiEdit}>아이콘 변경하기</Text>
                  </TouchableOpacity>

                  <View style={styles.textContainer}>
                    {route.params.drop ? (
                      <TextInput
                        style={styles.enter}
                        placeholder={route.params.drop.content}
                        onChangeText={(content) => handleContent(content)}
                        value={content}
                      />
                    ) : (
                      <TextInput
                        multiline={true}
                        style={styles.enter}
                        placeholder="텍스트를 입력하세요"
                        onChangeText={(content) => handleContent(content)}
                        value={content}
                      />
                    )}
                  </View>

                  <View style={style.lowerButtons}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("CameraScreen", route);
                      }}
                    >
                      <SvgXml
                        xml={btn_photoadd}
                        width={50}
                        height={50}
                      ></SvgXml>
                    </TouchableOpacity>
                    <View style={style.lowerButtons2}>
                      <TouchableOpacity
                        style={{ alignItems: "center" }}
                        onPress={() => {}}
                      >
                        <Switch
                          trackColor={{
                            false: "#9596B",
                            true: "#996afc",
                          }}
                          thumbColor="#f4f3f4"
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleSwitch}
                          value={isEnabled}
                        />
                        <Text style={style.title2}>
                          {isEnabled ? "퍼블릭" : "비공개"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </MainContainerView>
      </SlideView>
    </>
  );
};

const GNBButtonPart = styled.View`
  width: 100%;
  flex-direction: row;
  left: 25;
  top: 50;
  z-index: 999;
  padding: 10px;
  position: absolute;
`;

const GNBButtonPart2 = styled.View`
  flex: 1;
  flex-direction: row;
  top: -5;
  right: 10;
  justify-content: flex-end;
`;

const style = StyleSheet.create({
  title: {
    fontSize: 18,
    color: "white",
  },
  title2: {
    fontSize: 12,
    color: "#6b6b6b",
    marginTop: 4,
  },
  container1: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  container2: {
    alignItems: "center",
    height: 1000,
    //개선방안고민
  },
  DropEmoji: {
    height: 70,
    fontSize: 50,
    marginLeft: 2,
    marginTop: 20,
  },
  DropEmojiNull: {
    marginLeft: 1,
    marginTop: 10,
  },
  DropEmojiEdit: {
    fontSize: 12,
    color: "#996afc",
  },
  dropEditButton: {
    width: 120,
    height: 30,
    backgroundColor: "#ffffff",
    borderColor: "#996afc",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 5,
    borderWidth: 1,
    zIndex: 999,
  },
  lowerButtons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 320,
    marginTop: 30,
  },
  lowerButtons2: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
});
