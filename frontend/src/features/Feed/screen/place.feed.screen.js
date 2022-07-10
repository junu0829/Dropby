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

export const PlaceFeedScreen = ({ navigation, route }) => {
  const place = route.params;
  const [drops, setDrops] = useState([
    {
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
      <GNB
        navigation={navigation}
        title={place.name}
        place={place}
        mode={"placeFeed"}
        goBack={navigation.goBack}
      ></GNB>
      <MainContainerView>
        {/* drops */}
        <View style={styles.container4}>
          <ScrollView style={styles.dropsContainer}>
            {drops.map((feedDrop) => (
              <FeedDropComponent
                navigation={navigation}
                feedDrop={feedDrop}
                place={place}
              />
            ))}
          </ScrollView>
        </View>
      </MainContainerView>
    </>
  );
};

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
