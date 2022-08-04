import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
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

export const DetailScreen = ({ navigation, route }) => {
  const place = route.params.place;
  const drop = route.params.feedDrop;
  const isPlaceDrop = route.params.isPlaceDrop;
  console.log("drop:", drop);
  const [modalVisible, setModalVisible] = useState(false);
  const hideModal = () => setModalVisible(false);
  const showModal = () => setModalVisible(true);
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
            <ScrollView style={styles.scrollView}>
              {/* 아래 컴포넌트에 prop으로 댓글들을 넘겨주면 됨. */}
              <FeedDropComment />
              <FeedDropComment />
              <FeedDropComment />
              <FeedDropComment />
              <FeedDropComment />
              <FeedDropComment />
              <FeedDropComment />
              <FeedDropComment />
              <FeedDropComment />
            </ScrollView>
            <View style={styles.commentInputContainer}>
              <Text>댓글 입력창</Text>
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
    height: "55%",
    alignItems: "center",
    marginLeft: 12,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
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
    height: "90%",
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
    height: "35%",
    borderTopWidth: 5,
    borderColor: "#eeeeee",
    width: "100%",
  },
  commentInputContainer: {
    height: 100,
  },
  scrollView: {},

  replyContainer: {
    flexDirection: "row",
    marginTop: 2,
  },
  replyBar: {
    width: 35,
    height: 2,
    backgroundColor: "#C4C4C4",
    alignSelf: "center",
  },
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
});
