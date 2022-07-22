import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import backButton2 from "../../../../assets/Buttons/backButton2";
import { theme } from "../../../infrastructure/theme";
import { getAreaDrops } from "../../../services/drops/GetDrops";
import { FeedDropComponent } from "../component/FeedDropComponent";
import { GNB } from "../../../components/GlobalNavigationBar";
import { MainContainerView } from "../../../infrastructure/style/styledComponent";
import { SlideView } from "../../../components/animations/slide.animation";

import styled from "styled-components/native";
import backButton from "../../../../assets/Buttons/backButton";

export const AreaFeedScreen = ({ navigation, route }) => {
  const area = route.params;
  const [dropCount, setDropCount] = useState(0);
  const [drops, setDrops] = useState([
    {
      Place: {
        name: "맛닭꼬 안암고대점",
      },
      content: "test content",
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
      title: "test title",
    },
  ]);

  // Place 정보 받아서 해당 장소의 drop들 호출하기
  useEffect(async () => {
    await getAreaDrops(area.pk, setDrops, setDropCount);
  }, []);

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
      </GNBButtonPart>
      <SlideView duration={2000} startValue={0} endValue={30}>
        <GNB
          navigation={navigation}
          title={area.name}
          goBack={navigation.goBack}
          mode={"areaFeed"}
          dropCount={dropCount}
        ></GNB>

        <MainContainerView>
          {/* drops */}
          <View style={styles.container4}>
            <View style={{ height: 20 }}></View>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 300 }}
              style={styles.dropsContainer}
            >
              {drops.map((feedDrop) => (
                <FeedDropComponent
                  navigation={navigation}
                  feedDrop={feedDrop}
                  place={area}
                />
                //여기서는 place에 area를 넣어서 드롭을 눌렀을 때 "구역" 이름이 뜨게 된다. "장소" 이름이 뜨도록 수정해야할듯
              ))}
            </ScrollView>
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

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    marginTop: 20,
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 12,
  },
  container3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.6)",
  },
  container4: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  dropsContainer: {
    width: "100%",
  },

  placeTitle: {
    color: "black",
    fontFamily: theme.fonts.bold,
    fontWeight: "700",
    fontSize: 12,
    justifyContent: "center",
  },

  placeInfo: {
    color: "black",
    fontSize: 10,
  },
});
