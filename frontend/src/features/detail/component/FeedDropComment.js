import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import emptyHeart from "../../../../assets/emptyHeart";
import { elapsedTime } from "../../../infrastructure/elapsedTime";
import {
  deleteComment,
  editComment,
} from "../../../services/drops/commentService";

export const FeedDropComment = ({ comment }) => {
  // 댓글 object 필요
  // 좋아요, 답글달기 기능 필요
  const testcontent = "수정 테스트";
  return (
    <>
      <View style={styles.commentContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.user}>유민{comment.creatorPk}</Text>
          <View style={styles.inner}>
            <Text style={styles.commentContent}>{comment.content}</Text>
            <View style={styles.bottom}>
              <Text style={styles.time}>{elapsedTime(comment.createdAt)}</Text>
              <TouchableOpacity
                onPress={() => deleteComment(3, 1, 5, comment.pk)}
              >
                <Text style={styles.like}>좋아요 1개</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => editComment(3, 1, 5, comment.pk, testcontent)}
              >
                <Text style={styles.reply}>답글달기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.emptyHeart}>
          <SvgXml xml={emptyHeart} width={19} height={21}></SvgXml>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    paddingBottom: 12,
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1,
  },
  contentContainer: {
    flexDirection: "row",
  },
  emptyHeart: {},
  inner: {
    flexDirection: "column",
    marginLeft: 8,
  },
  user: {
    width: 60,
    marginLeft: 18,
    fontSize: 13,
    fontWeight: "700",
  },
  bottom: {
    flexDirection: "row",
    marginTop: 5,
  },
  time: {
    width: 30,
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
  },
  commentContent: {
    width: 240,
    fontSize: 13,
    fontWeight: "500",
  },
  reply: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
    marginLeft: 8,
  },
  like: {
    width: 50,
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
    marginLeft: 8,
  },
});
