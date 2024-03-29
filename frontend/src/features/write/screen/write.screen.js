import React from "react";

import {
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Image,
  Video,
  FlatList,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Switch,
} from "react-native";
import { useEffect, useState, useContext } from "react";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { TextInput } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";

import { styles } from "./writescreen.styles";
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
import imageDeleteButton from "../../../../assets/Buttons/imageDeleteButton";
import { SearchBox } from "../../../components/utility/SearchBox";
import emojiss from "../../../services/emojis.json";

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

  const [searchfield, setSearchfield] = useState("");

  const [area, setArea] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isEmojiMode, setIsEmojiMode] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  /////////////////////로컬 이미지 여기에 담김
  const defaultArray = [];
  const [imageUri, setImageUri] = useState(defaultArray);
  const [type, setType] = useState(null);

  useEffect(() => {
    if (route.params.activePolygon) {
      setArea(route.params.activePolygon);
    } else {
      setArea(route.params.place.areaPk);
      setContent(route.params.drop.content);
    }
  }, []);

  useEffect(() => {
    if (route.params.source != undefined) {
      const imageAdded = route.params.source;
      if (imageUri == []) {
        setImageUri([imageAdded]);
      } else {
        setImageUri([...imageUri, imageAdded]);
      }
    }

    setType(route.params.type);
  }, [route.params.source]);

  ////////////////////

  const goBack = () => {
    if (isEmojiMode) {
      setIsEmojiMode(false);
    } else {
      setImageUri([]);
      navigation.goBack();
    }
  };
  const handleTitle = (e) => {
    setTitle(e);
  };
  const handleContent = (e) => {
    setContent(e);
  };

  const removeImage = (e) => {
    var array = [...imageUri];
    var index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      setImageUri(array);
    }
  };

  //////////전송함수
  const PostWrite = async () => {
    //image전송 전처리
    const imageFileName = imageUri[0].split("/").pop();
    const match = /\.(\w+)$/.exec(imageFileName ?? "");
    const imageType = match ? `image/${match[1]}` : "image";

    ////////////formdata 형성
    const frm = new FormData();
    frm.append("image", { uri: imageUri[0], name: imageFileName, imageType });

    /////복수의 image일 경우
    if (imageUri) {
      if (imageUri.length > 1) {
        for (var i = 1; i < imageUri.length; i++) {
          const uri = imageUri[i];
          const imageFileName = uri.split("/").pop();
          const match = /\.(\w+)$/.exec(imageFileName ?? "");
          const imageType = match ? `image/${match[1]}` : "image";

          frm.append("image", {
            name: imageFileName,
            type: imageType,
            uri: uri,
          });
        }
      }
    }
    frm.append("title", title);
    frm.append("content", content);
    frm.append("isPrivate", isPrivate);
    frm.append("emojiSlug", selectedEmoji.slug);
    route.params.drop
      ? await UpdateDrop(area, place.pk, route.params.drop.pk, frm)
      : await postDrop(area.pk, place.pk, frm);
  };

  ///////////// emoji 관련
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    setEmojis(emojiss);
  }, []);

  useEffect(() => {
    const filteredEmojis = emojiss.filter((emoji) => {
      return emoji.name.toString().includes(searchfield);
    });
    setEmojis(filteredEmojis);
    //console.log(searchfield.toString());
  }, [searchfield]);

  ////////////////화면/////////////////////
  return (
    <>
      <GNBButtonPart>
        <TouchableOpacity
          onPress={() => {
            goBack();
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
            <Text style={style.title}>{isEmojiMode ? "완료" : "전송"}</Text>
          </TouchableOpacity>
        </GNBButtonPart2>
      </GNBButtonPart>
      <SlideView duration={2000} startValue={0} endValue={30}>
        <GNB
          navigation={navigation}
          title={place.name}
          goBack={navigation.goBack}
          mode={isEmojiMode ? "selectEmoji" : "placeFeed"}
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
                      <Text style={style.DropEmoji}>{selectedEmoji.emoji}</Text>
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
                      {
                        isEmojiMode && !selectedEmoji
                          ? setSelectedEmoji(
                              emojis[Math.floor(Math.random() * emojis.length)]
                            )
                          : selectedEmoji
                          ? setSelectedEmoji(null)
                          : setIsEmojiMode(true);
                      }
                    }}
                  >
                    <Text style={style.DropEmojiEdit}>
                      {isEmojiMode && !selectedEmoji
                        ? "랜덤 이모지 사용하기"
                        : selectedEmoji
                        ? "클릭해서 삭제"
                        : "아이콘 변경하기"}
                    </Text>
                  </TouchableOpacity>
                  {!isEmojiMode ? (
                    <>
                      <View style={styles.containerMiddle}>
                        <View style={styles.textContainer}>
                          {route.params.drop ? (
                            <TextInput
                              style={styles.enter}
                              placeholder={route.params.drop.title}
                              onChangeText={(title) => handleTitle(title)}
                              value={title}
                              multiline={false}
                            />
                          ) : (
                            <TextInput
                              style={styles.enter}
                              placeholder="제목을 입력하세요"
                              onChangeText={(title) => handleTitle(title)}
                              value={title}
                              multiline={false}
                            />
                          )}

                          {route.params.drop ? (
                            <TextInput
                              style={styles.enter2}
                              placeholder={route.params.drop.content}
                              onChangeText={(content) => handleContent(content)}
                              value={content}
                            />
                          ) : (
                            <TextInput
                              multiline={true}
                              style={styles.enter2}
                              placeholder="내용을 입력하세요"
                              onChangeText={(content) => handleContent(content)}
                              value={content}
                            />
                          )}
                          {imageUri ? (
                            <>
                              {imageUri.length > 0 &&
                              imageUri[0] != undefined ? (
                                <View
                                  style={{
                                    //stylesheet으로 분리시키려 했더니 에러가 생겨서 놔둠
                                    backgroundColor: "#e4e4e4",
                                    width: "100%",
                                    height: "20%",
                                    justifyContent: "flex-start",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    margin: 5,
                                    borderRadius: 5,
                                  }}
                                >
                                  {imageUri.map((image) => (
                                    <View>
                                      <Image
                                        source={{ uri: image }}
                                        style={{
                                          aspectRatio: 1 / 1,
                                          height: "90%",
                                          margin: 5,
                                          borderRadius: 5,
                                        }}
                                      />
                                      <TouchableOpacity
                                        onPress={() => {
                                          removeImage(image);
                                        }}
                                        style={{
                                          position: "absolute",
                                          right: "10%",
                                          top: "10%",
                                        }}
                                      >
                                        <SvgXml
                                          xml={imageDeleteButton}
                                          width={15}
                                          height={15}
                                        ></SvgXml>
                                      </TouchableOpacity>
                                    </View>
                                  ))}

                                  {/*route.params.type === 0 ? (
                        <View>
                          <Video
                            source={{ uri: route.params.source }}
                            shouldPlay={true}
                            isLooping={true}
                            resizeMode="cover"
                            style={{
                              aspectRatio: 1 / 1,
                              backgroundColor: "black",
                            }}
                          />
                        </View>
                      ) : null} */}
                                </View>
                              ) : null}
                            </>
                          ) : null}
                        </View>
                      </View>
                      <View style={styles.containerLow}>
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
                    </>
                  ) : (
                    <>
                      <View style={styles.containerMiddle}>
                        <View style={{ height: 30 }}></View>
                        <SearchBox
                          searchBoxHint={"이모지를 검색해보세요"}
                          setSearchfield={setSearchfield}
                        />

                        <View
                          style={{
                            width: "100%",
                            position: "absolute",
                            top: 100,
                            alignItems: "center",

                            backgroundColor: "#E7E6E6",
                          }}
                        >
                          <View
                            style={{
                              marginTop: 5,
                              height: 500,
                            }}
                          >
                            <FlatList
                              // contentContainerStyle={{
                              //   flexGrow: 1,
                              // }}
                              numColumns={8}
                              data={emojis}
                              renderItem={({ item }) => (
                                <TouchableOpacity
                                  onPress={async () => {
                                    await setSelectedEmoji(item);
                                  }}
                                >
                                  <View style={style.item}>
                                    <Text style={style.emoji}>
                                      {item.emoji}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                              )}
                              keyExtractor={(item) => item.emoji}
                            />
                          </View>
                        </View>
                      </View>
                    </>
                  )}
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
  searchFieldHeader: {
    height: 50,
  },
  lowerButtons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 320,
    marginTop: 50,
  },
  lowerButtons2: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  item: {
    width: 42,
    height: 45,
  },
  emoji: {
    fontSize: 35,
  },
});
