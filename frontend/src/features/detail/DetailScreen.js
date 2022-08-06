import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  Button,
} from "react-native";

import { Text } from "../../components/typography/text.component";

import { SvgXml } from "react-native-svg";
import dropBg from "../../../assets/images/dropPng/drawable-xxxhdpi/pin.png";

import { GNB } from "../../components/GlobalNavigationBar";
import { EditModal } from "./component/EditModal";

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

export const DetailScreen = ({ navigation, route }) => {
  const place = route.params.place;
  const drop = route.params.feedDrop;
  const isPlaceDrop = route.params.isPlaceDrop;
  const [modalVisible, setModalVisible] = useState(false);
  const hideModal = () => setModalVisible(false);
  const showModal = () => setModalVisible(true);

  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  console.log(place.pk, drop.placePk, drop.pk);
  useEffect(async () => {
    await getComments(place.pk, drop.placePk, drop.pk, setComments);
  }, []);

  return (
    <>
      <GNB
        mode={"detailView"}
        navigation={navigation}
        title={isPlaceDrop == "true" ? place.name : drop.Place.name}
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

      <MainContainerView>
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
            {/* 이 부분은 이미지가 있을 때만 필요 */}
            <View style={styles.pictureContainer}>
              <ScrollView horizontal={true}>
                <View style={styles.pictureInput}></View>
                <View style={styles.pictureInput}></View>
                <View style={styles.pictureInput}></View>
                <View style={styles.pictureInput}></View>
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
              {/* 좋아요 누르는 기능 구현 필요, 종아요 눌린 상태 구현 필요 */}
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
            {/* 아래 컴포넌트에 prop으로 댓글들을 넘겨주면 됨. */}
            {comments.map((comment) => (
              <FeedDropComment comment={comment} />
            ))}
          </View>

          <View style={styles.commentInputContainer}>
            <View style={{ flex: 6 }}>
              <TextInput
                placeholder="댓글을 입력해보세요."
                onChangeText={(text) => {
                  setCommentInput(text);
                }}
                value={commentInput}
                style={{ backgroundColor: "transparent", marginLeft: 12 }}
                // onSubmitEditing = {()=>{this.onSubmit(this.state.searchText)}}
              />
            </View>
            <View style={{ marginRight: -12, flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  setCommentInput("");
                  postComment(place.pk, drop.placePk, drop.pk, commentInput);
                  getComments(place.pk, drop.placePk, drop.pk, setComments);
                }}
              >
                <SvgXml xml={btn_send} width={26} height={26}></SvgXml>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </MainContainerView>
    </>
  );
};

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
    flex: 8,
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
    flex: 2,
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
