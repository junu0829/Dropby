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
import { getPlaceDrops } from "../../../services/drops/GetDrops";
import { FeedDropComponent } from "../component/FeedDropComponent";

export const PlaceFeedScreen = ({ navigation, route }) => {
  const place = route.params;
  const [drops, setDrops] = useState([
    {
      areaPk: 0,
      latitude: 1,
      longitude: 1,
      name: "",
      pk: 0,
    },
  ]);

  useEffect(async () => {
    await getPlaceDrops(place.areaPk, place.pk, setDrops);
    // Place 정보 받아서 해당 장소의 drop들 호출하기
    // placeData에 받아와져 있음.
    // setDrops => getPlaceDrops 이용,
  }, []);

  return (
    <>
      <View style={styles.container1}>
        <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
          <SvgXml xml={backButton2} width={60} height={60} />
        </TouchableOpacity>
      </View>
      {/* 장소 정보 container */}
      <View style={styles.container2}>
        <Text style={styles.placeTitle}>{place.name}</Text>
        <Text style={styles.placeInfo}>
          서울특별시 성북구 안암로 145, South Korea
        </Text>
      </View>
      {/* 공지사항 container */}
      <View style={styles.container3}>
        <Text style={styles.placeTitle}>공지사항</Text>
        <Text style={styles.placeInfo}>
          시설예약은 9:00 ~ 15:00 까지 아래 링크에서 가능합니다.
        </Text>
      </View>
      {/* drops */}
      <View style={styles.container4}>
        <ScrollView style={styles.dropsContainer}>
          {drops.map((feedDrop) => (
            <FeedDropComponent navigation={navigation} feedDrop={feedDrop} />
          ))}
        </ScrollView>
      </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.2)",
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
