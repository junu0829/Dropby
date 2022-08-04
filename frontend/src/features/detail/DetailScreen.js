import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";

import { Text } from "../../components/typography/text.component";

import { SvgXml } from "react-native-svg";
import dropBg from "../../../assets/images/dropPng/drawable-xxxhdpi/pin.png";

import pictureIcon from "../../../assets/pictureIcon";
import CommentIcon from "../../../assets/CommentIcon";
import HeartIcon from "../../../assets/HeartIcon";
import emptyHeart from "../../../assets/emptyHeart";
import LikeButton from "../../../assets/LikeButton";
import sendingAirplane from "../../../assets/sendingAirplane";
import { GNB } from "../../components/GlobalNavigationBar";
import { EditModal } from "./component/EditModal";

import { AreaFeedScreen } from "../Feed/screen/area.feed.screen";
import { FeedDropComment } from "./component/FeedDropComment";
import { MainContainerView } from "../../infrastructure/style/styledComponent";
import { theme } from "../../infrastructure/theme";
import { elapsedTime } from "../../infrastructure/elapsedTime";

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
              <View>
                <Text style={styles.dropTitle}>{drop.title}</Text>
                <Text style={styles.dropTime}>
                  {elapsedTime(drop.createdAt)}
                </Text>
              </View>
            </View>
            <View style={styles.pictureContainer}>
              <ScrollView horizontal={true}>
                <View style={styles.pictureInput}></View>
                <View style={styles.pictureInput}></View>
                <View style={styles.pictureInput}></View>
                <View style={styles.pictureInput}></View>
              </ScrollView>
            </View>
            <Text>{drop.content}</Text>
            <View style={styles.restContainer}>
              <View style={styles.iconContainer}>
                <SvgXml
                  xml={HeartIcon}
                  width={19}
                  height={21}
                  style={styles.HeartIcon}
                ></SvgXml>
                <Text style={styles.heartNumber}>2</Text>
                <SvgXml
                  xml={CommentIcon}
                  width={19}
                  height={21}
                  style={styles.CommentIcon}
                ></SvgXml>
                <Text style={styles.commentNumber}>3</Text>
                <SvgXml
                  xml={pictureIcon}
                  width={19}
                  height={21}
                  style={styles.pictureIcon}
                ></SvgXml>
                <Text style={styles.pictureNumber}>5</Text>
              </View>
              <TouchableOpacity>
                <SvgXml
                  xml={LikeButton}
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
    marginLeft: 10,
    marginRight: 10,
  },
  dropContainer: {
    height: "60%",
    backgroundColor: "#EDEDED",
    alignItems: "center",
  },
  titleContainer: {
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
  dropTime: {
    fontSize: 11,
    color: "#6b6b6b",
  },
  commentsContainer: {
    backgroundColor: "pink",
    height: "35%",
  },
  commentInputContainer: {
    height: 100,
  },
  scrollView: {},

  pictureContainer: {
    height: "60%",
  },

  pictureInput: {
    width: 200,
    height: "90%",
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "skyblue",
  },

  textContainer: {
    flexDirection: "column",
    width: 330,
  },
  editContainer: {
    marginTop: 10,
  },
  place: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginLeft: 25,
  },
  address: {
    fontSize: 11,
    fontWeight: "500",
    color: "#B4B1B1",
    marginLeft: 25,
  },

  contentContainer: {
    flexDirection: "row",
  },
  dropIcon: {
    marginLeft: 20,
    marginTop: 10,
  },

  writingContainer: {
    flexDirection: "column",
    width: 260,
  },

  content: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: "500",
    marginTop: 5,
    marginLeft: 20,
    color: "black",
  },
  hashtag: {
    fontSize: 14,
    fontWeight: "500",
    color: "#817B7B",
    marginLeft: 20,
  },

  restContainer: {
    flexDirection: "column",
    marginTop: 25,
    alignItems: "flex-start",
  },

  iconContainer: {
    flexDirection: "row",
    marginTop: 3,
  },
  pictureIcon: {
    marginLeft: 15,
  },
  pictureNumber: {
    marginRight: 12,
    color: "#9C4A97",
  },

  heartNumber: {
    color: "#FB1919",
  },
  LikeButton: {
    margin: 10,
  },

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
