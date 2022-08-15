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
import { GNB } from "../../../components/GlobalNavigationBar";
import { MainContainerView } from "../../../infrastructure/style/styledComponent";
import { theme } from "../../../infrastructure/theme";
import { getPlaceDrops } from "../../../services/drops/GetDrops";
import { FeedDropComponent } from "../component/FeedDropComponent";

import { SlideView } from "../../../components/animations/slide.animation";
import styled from "styled-components/native";
import backButton from "../../../../assets/Buttons/backButton";

export const PlaceFeedScreen = ({ navigation, route }) => {
  const place = route.params;
  console.log(place);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    await getPlaceDrops(place.areaPk, place.pk, setDrops);
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
          title={place.name}
          place={place}
          mode={"placeFeed"}
          goBack={navigation.goBack}
        ></GNB>
        <MainContainerView style={{ height: "85%" }}>
          {/* drops */}
          <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            style={styles.dropsContainer}
          >
            {drops.map((feedDrop) => (
              <FeedDropComponent
                mode={"placeFeed"}
                navigation={navigation}
                feedDrop={feedDrop}
                place={place}
              />
            ))}
          </ScrollView>
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
