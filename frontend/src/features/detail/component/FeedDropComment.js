import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import emptyHeart from "../../../../assets/emptyHeart";

export const FeedDropComment = ({ comment }) => {
  // 댓글 object 필요

  // 좋아요, 답글달기 기능 필요
  const onPress = () => {};

  return (
    <>
      <View style={styles.commentContainer}>
        <Text style={styles.user}>유민</Text>
        <View style={styles.inner}>
          <Text style={styles.commet}>오늘 저도 인촌기념관 갔는데...!</Text>
          <View style={styles.bottom}>
            <Text style={styles.time}>57분</Text>
            <TouchableOpacity>
              <Text style={styles.like}>좋아요 1개</Text>
            </TouchableOpacity>
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
    </>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  emptyHeart: {
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  inner: {
    flexDirection: "column",
    marginLeft: 20,
    width: 240,
  },
  user: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 20,
  },
  bottom: {
    flexDirection: "row",
    marginTop: 5,
  },
  time: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
  },
  commet: {
    fontSize: 15,
    fontWeight: "500",
  },
  reply: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
    marginLeft: 20,
  },
  like: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
    marginLeft: 20,
  },
});
