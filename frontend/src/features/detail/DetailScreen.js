import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

import { Text } from "../../components/typography/text.component";

import { SvgXml } from "react-native-svg";

import pictureIcon from "../../../assets/pictureIcon";
import CommentIcon from "../../../assets/CommentIcon";
import HeartIcon from "../../../assets/HeartIcon";
import emptyHeart from "../../../assets/emptyHeart";
import LikeButton from "../../../assets/LikeButton";
import sendingAirplane from "../../../assets/sendingAirplane";
import { GNB } from "../../components/GlobalNavigationBar";
import { EditModal } from "./component/EditModal";

import {
  styles,
  DetailView,
  DetailView0,
  DetailViewStyle,
} from "./DetailSceen.styles";
import { AreaFeedScreen } from "../Feed/screen/area.feed.screen";

export const DetailScreen = ({ navigation, route }) => {
  const place = route.params.place;
  const drop = route.params.feedDrop;

  const [modalVisible, setModalVisible] = useState(false);
  const hideModal = () => setModalVisible(false);
  const showModal = () => setModalVisible(true);
  console.log(drop);
  return (
    <>
      <GNB
        mode={"detailView"}
        navigation={navigation}
        title={drop.Place.name}
        goBack={navigation.goBack}
        showModal={showModal}
        modalVisible={modalVisible}
        secondButton={"true"}
      ></GNB>
      {/* <EditModal
        visible={modalVisible}
        dismiss={hideModal}
        drop={drop}
        place={place}
        navigation={navigation}
      ></EditModal> */}

      <DetailView0 style={{ marginTop: 30 }}>
        <DetailView contentContainerStyle={DetailViewStyle.center}>
          <Text>{drop.title}</Text>
          <View style={styles.dropContainer}>
            <ScrollView horizontal={true} style={styles.imageContainer}>
              <View style={styles.pictureInput}></View>
              <View style={styles.pictureInput}></View>
              <View style={styles.pictureInput}></View>
              <View style={styles.pictureInput}></View>
            </ScrollView>
            <Text>{drop.content}</Text>
            <View style={styles.restContainer}>
              <View style={styles.iconContainer}>
                <SvgXml
                  xml={pictureIcon}
                  width={19}
                  height={21}
                  style={styles.pictureIcon}
                ></SvgXml>
                <Text style={styles.pictureNumber}>5</Text>
                <SvgXml
                  xml={CommentIcon}
                  width={19}
                  height={21}
                  style={styles.CommentIcon}
                ></SvgXml>
                <Text style={styles.commentNumber}>3</Text>
                <SvgXml
                  xml={HeartIcon}
                  width={19}
                  height={21}
                  style={styles.HeartIcon}
                ></SvgXml>
                <Text style={styles.heartNumber}>2</Text>
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

          <View style={styles.commentContainer}>
            <View style={styles.comment1Container}>
              <Text style={styles.user1}>드로퍼1</Text>

              <View style={styles.inner1}>
                <Text style={styles.commet1}>
                  오늘 저도 인촌기념관 갔는데...!
                </Text>
                <View style={styles.bottom1}>
                  <Text style={styles.time1}>57분</Text>
                  <TouchableOpacity>
                    <Text style={styles.reply}>답글달기</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity>
                <SvgXml
                  xml={emptyHeart}
                  width={19}
                  height={21}
                  style={styles.emptyHeart}
                ></SvgXml>
              </TouchableOpacity>
            </View>

            <View style={styles.comment2Container}>
              <Text style={styles.user2}>드로퍼2</Text>

              <View style={styles.inner2}>
                <Text style={styles.commet2}>
                  요즘 진짜 캠퍼스 투어하기 딱인 날씨ㄹㅇ...
                </Text>
                <View style={styles.bottom2}>
                  <Text style={styles.time2}>30분</Text>
                  <Text style={styles.like2}>좋아요 1개</Text>
                  <TouchableOpacity>
                    <Text style={styles.reply}>답글달기</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity>
                <SvgXml
                  xml={emptyHeart}
                  width={19}
                  height={21}
                  style={styles.emptyHeart}
                ></SvgXml>
              </TouchableOpacity>
            </View>

            <View style={styles.comment3Container}>
              <Text style={styles.user3}>드로퍼3</Text>

              <View style={styles.inner3}>
                <Text style={styles.commet3}>인촌기념관은 야경이 죽이죠,,</Text>
                <View style={styles.bottom3}>
                  <Text style={styles.time3}>16분</Text>
                  <TouchableOpacity>
                    <Text style={styles.reply}>답글달기</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.replyContainer}>
                  <View style={styles.replyBar}></View>
                  <TouchableOpacity>
                    <Text style={styles.showReply}>답글 1개 보기</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity>
                <SvgXml
                  xml={emptyHeart}
                  width={19}
                  height={21}
                  style={styles.emptyHeart}
                ></SvgXml>
              </TouchableOpacity>
            </View>

            <View style={styles.commentButton}>
              <TouchableOpacity>
                <Text style={styles.enterComment}>댓글 입력하기...</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <SvgXml
                  xml={sendingAirplane}
                  width={35}
                  height={35}
                  style={styles.sendingAirplane}
                ></SvgXml>
              </TouchableOpacity>
            </View>
          </View>
        </DetailView>
      </DetailView0>
    </>
  );
};
