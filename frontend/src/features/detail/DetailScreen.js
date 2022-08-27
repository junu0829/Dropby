import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Image,
  Animated,
} from "react-native";

import { Text } from "../../components/typography/text.component";

import { SvgXml } from "react-native-svg";
import dropBg from "../../../assets/images/dropPng/drawable-xxxhdpi/pin.png";
import styled from "styled-components/native";
import { GNB } from "../../components/GlobalNavigationBar";
import { EditModal } from "./component/EditModal";
import { SlideView } from "../../components/animations/slide.animation";

import { FeedDropComment } from "./component/FeedDropComment";
import { MainContainerView } from "../../infrastructure/style/styledComponent";
import { theme } from "../../infrastructure/theme";
import { elapsedTime } from "../../infrastructure/elapsedTime";
import ico_heart from "../../../assets/images/dropPng/ico_heart";
import ico_speech from "../../../assets/images/dropPng/ico_speech";
import ico_photo from "../../../assets/images/dropPng/ico_photo";
import btn_like from "../../../assets/Buttons/btn_like";
import btn_send from "../../../assets/Buttons/btn_send";
import { getComments, postComment } from "../../services/drops/commentService";
import backButton from "../../../assets/Buttons/backButton";
import EditButton from "../../../assets/Buttons/EditButton";

export const DetailScreen = ({ navigation, route }) => {
  const [drop, setDrop] = useState({
    Place: {
      name: "",
    },
    content: "",
    createdAt: "2022-06-03T10:54:33.000Z",
    creatorPk: 2,
    emoji: {
      emoji_version: "0.7",
      icon: "😀",
      name: "중립적 인면",
      pk: 1,
      skinToneSupport: false,
      slug: "neutral_face",
      unicode_version: "0.7",
    },
    emojiPk: 1,
    images: [],
    isPrivate: false,
    pk: 7,
    placePk: 1,
    title: "",
  });

  const place = route.params.place;

  const isPlaceDrop = route.params.isPlaceDrop;
  const [modalVisible, setModalVisible] = useState(false);
  const hideModal = () => setModalVisible(false);
  const showModal = () => setModalVisible(true);

  const [isLiked, setIsLiked] = useState(false);

  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await getComments(
      place.pk,
      drop.placePk,
      drop.pk,
      setComments,
      setCommentsCount
    );
  }, [drop.pk, drop.placePk, place.pk, comments]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await setDrop(route.params.drop);
  }, []);
  //like눌릴 때마다 드롭정보를 통째로 다시 받아오는게 맞는건지..??

  //animation

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  //

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior="position">
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
                showModal();
              }}
            >
              <SvgXml xml={EditButton} width={26} height={26}></SvgXml>
            </TouchableOpacity>
          </GNBButtonPart2>
        </GNBButtonPart>

        <GNB
          mode={"detailView"}
          navigation={navigation}
          title={place.name}
          goBack={navigation.goBack}
          showModal={showModal}
          modalVisible={modalVisible}
          secondButton={"true"}
        ></GNB>
        <EditModal
          visible={modalVisible}
          dismiss={hideModal}
          drop={drop}
          place={place}
          navigation={navigation}
        ></EditModal>
        <MainContainerView style={{ height: "85%", paddingBottom: 60 }}>
          <ScrollView
          // scrollEventThrottle={16}
          // onScroll={Animated.event(
          //   [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          //   { useNativeDriver: false }
          // )}
          >
            <View style={styles.mainContainer}>
              <View style={styles.dropContainer}>
                <View style={styles.titleContainer}>
                  <View style={styles.SymbolContainer}>
                    <ImageBackground source={dropBg} style={styles.dropemoji}>
                      <Text style={styles.emoji}>{drop.emoji.icon}</Text>
                    </ImageBackground>
                  </View>
                  <View style={styles.titleTime}>
                    <Text style={styles.dropTitle}>{drop.title}</Text>
                    <Text style={styles.dropTime}>
                      {elapsedTime(drop.createdAt)}
                    </Text>
                  </View>
                </View>

                <View style={styles.pictureContainer}>
                  <ScrollView horizontal={true}>
                    {drop.images.map((image) => (
                      <View>
                        <Image
                          source={{ uri: image.imageUrl }}
                          style={{
                            aspectRatio: 1 / 1,
                            width: 200,
                            height: 200,
                            marginLeft: 10,
                            marginTop: 10,

                            borderRadius: 5,
                          }}
                        />
                      </View>
                    ))}
                  </ScrollView>
                </View>

                  <Text style={styles.content}>{drop.content}</Text>
                  <View style={styles.restContainer}>
                    <View style={styles.dropLike}>
                      <SvgXml xml={ico_heart} width={16} height={16}></SvgXml>
                      <Text style={styles.dropLikeNum}>12</Text>
                      <SvgXml xml={ico_speech} width={16} height={16}></SvgXml>
                      <Text style={styles.dropLikeNum}>5</Text>
                      <SvgXml xml={ico_photo} width={16} height={16}></SvgXml>
                      <Text style={styles.dropLikeNum}>1</Text>
                    </View>

                    <TouchableOpacity>
                      <SvgXml
                        xml={btn_like}
                        width={85}
                        height={29}
                        style={styles.LikeButton}
                      ></SvgXml>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.commentsContainer}>
                  {comments.map((comment) => (
                    <FeedDropComment comment={comment} />
                  ))}
                </View>
                <View style={styles.commentInputContainer}>
                  <View style={styles.commentInputContainerIn}>
                    <View style={{ flex: 6 }}>
                      <TextInput
                        placeholder="댓글을 입력해보세요."
                        onChangeText={(text) => {
                          setCommentInput(text);
                        }}
                        value={commentInput}
                        style={{
                          backgroundColor: "transparent",
                          marginLeft: 12,
                        }}
                        // onSubmitEditing = {()=>{this.onSubmit(this.state.searchText)}}
                      />
                    </View>
                    <View style={{ marginRight: -12, flex: 1 }}>
                      <TouchableOpacity
                        onPress={async () => {
                          setCommentInput("");
                          await postComment(
                            place.pk,
                            drop.placePk,
                            drop.pk,
                            commentInput
                          );
                          getComments(
                            place.pk,
                            drop.placePk,
                            drop.pk,
                            setComments
                          );
                        }}
                      >
                        <SvgXml xml={btn_send} width={26} height={26}></SvgXml>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </MainContainerView>
        </SlideView>
      </KeyboardAvoidingView>
    </View>
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

  justify-content: flex-end;
`;

export const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dropContainer: {
    alignSelf: "stretch",
    alignItems: "center",
    margin: 12,
  },
  titleContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
  },
  dropTitle: {
    fontSize: theme.fontSizes.h5,
  },

  dropemoji: {
    width: 32,
    height: 44,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  emoji: {
    fontSize: theme.fontSizes.h5,
  },
  SymbolContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  titleTime: {},

  dropTime: {
    fontSize: 11,
    color: "#6b6b6b",
  },

  pictureContainer: {
    flex: 4,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },

  pictureInput: {
    width: 250,
    height: 250,
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "skyblue",
  },

  content: {
    flex: 1,
    minHeight: 200,
    alignSelf: "stretch",
    marginLeft: 12,
    fontSize: theme.fontSizes.title,
    fontWeight: "500",
    color: "black",
  },

  restContainer: {
    flexDirection: "row",
    alignSelf: "stretch",
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropLike: {
    flexDirection: "row",
  },
  dropLikeNum: {
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.regular,
    marginTop: -4,
    color: "#2E2E2E",
    marginLeft: 5,
    marginRight: 20,
  },

  commentsContainer: {
    borderTopWidth: 5,
    borderColor: "#eeeeee",
    width: "100%",
  },

  scrollView: {},

  showReply: {
    color: "#C4C4C4",
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 10,
  },

  commentButton: {
    backgroundColor: "white",
    width: 340,
    margin: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  enterComment: {
    color: "#C4C4C4",
    fontSize: 17,
    fontWeight: "500",
    paddingLeft: 20,
    width: 295,
  },
  commentInputContainer: {
    zIndex: 1000,
    width: "100%",
    height: 61,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e4e4e4",
    alignItems: "center",
    justifyContent: "center",
  },
  commentInputContainerIn: {
    flexDirection: "row",
    width: "90%",
    margin: 10,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e4e4e4",
    borderRadius: 50,
    backgroundColor: "#fff",
  },

  commentBox: {
    fontSize: 14,
    fontFamily: theme.fonts.body,
    width: "90%",
    height: 43,
    backgroundColor: "#ffffff",
    borderRadius: 50,
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: "#e4e4e4",
  },
});
