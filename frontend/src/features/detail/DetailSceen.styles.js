import { StyleSheet } from "react-native";

import styled from "styled-components/native";

export const styles = StyleSheet.create({
  containerTop: {
    marginTop: 50,
    flexDirection: "row",
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

  dropContainer: {
    margin: 10,
    borderRadius: 10,
    width: 340,
    height: 300,
    backgroundColor: "#EDEDED",
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
  timeContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  time: {
    fontSize: 12,
    color: "#817B7B",
    fontWeight: "500",
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

  pictureInput: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginTop: 12,
    borderRadius: 5,
    backgroundColor: "skyblue",
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
  commentNumber: {
    marginRight: 12,
    color: "#9C4A97",
  },
  heartNumber: {
    color: "#FB1919",
  },
  LikeButton: {
    margin: 10,
  },
  commentContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  comment1Container: {
    flexDirection: "row",
  },
  comment2Container: {
    flexDirection: "row",
    marginTop: 20,
  },
  comment3Container: {
    flexDirection: "row",
    marginTop: 20,
  },
  inner1: {
    flexDirection: "column",
    marginLeft: 20,
    width: 240,
  },
  inner2: {
    flexDirection: "column",
    marginLeft: 20,
    width: 240,
  },
  inner3: {
    flexDirection: "column",
    marginLeft: 20,
    width: 240,
  },
  bottom1: {
    flexDirection: "row",
    marginTop: 5,
  },
  bottom2: {
    flexDirection: "row",
    marginTop: 10,
  },
  bottom3: {
    flexDirection: "row",
    marginTop: 10,
  },
  user1: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 20,
  },
  commet1: {
    fontSize: 15,
    fontWeight: "500",
  },
  time1: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
  },
  reply: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
    marginLeft: 20,
  },
  emptyHeart: {
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  user2: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 20,
  },
  commet2: {
    fontSize: 15,
    fontWeight: "500",
  },
  time2: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
  },

  like2: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
    marginLeft: 20,
  },
  user3: {
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 20,
  },
  commet3: {
    fontSize: 15,
    fontWeight: "500",
  },
  time3: {
    fontSize: 10,
    fontWeight: "400",
    color: "#C4C4C4",
  },

  emptyHeart: {
    justifyContent: "flex-end",
    paddingRight: 10,
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

export const DetailView0 = styled.View`
  width: 100%;
  border-top-right-radius: 36px;
  border-top-left-radius: 36px;
  z-index: 999;
  position: absolute;
  height: 85%;
  top: 15%;
  background-color: white;
`;

export const DetailView = styled.ScrollView`
  width: 100%;
`;

export const DetailViewStyle = StyleSheet.create({
  center: {
    alignItems: "center",
  },
});
