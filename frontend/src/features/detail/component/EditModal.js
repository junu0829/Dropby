import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { DeleteDrop } from "../../../services/drops/DeleteDrop";

export const EditModal = ({
  visible = {},
  dismiss,
  drop,
  place,
  navigation,
}) => {
  useEffect(() => {
    console.log(areapk, placePk, dropPk);
  });

  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNjUyNTI2NTUxLCJleHAiOjE2NTUxMTg1NTF9.eCGutzk0Zl7eJLCRvqY5yO6xcctIe9O7_Jvv5BxNuVA";

  const [modalVisible, setModalVisible] = useState(false);

  const areapk = place.areaPk;
  const placePk = drop.placePk;
  const dropPk = drop.pk;
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={dismiss}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            dismiss();
            console.log("Modal Dismissed");
          }}
        >
          <View style={styles.modalOverlay}></View>
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 30,

                padding: 2,
                borderBottomWidth: 2,
                borderBottomColor: "rgba(0,0,0,0.2)",
                borderStyle: "solid",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                navigation.navigate("WriteScreen", { place, drop });
                dismiss();
              }}
            >
              <Text>드롭 수정하기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 100,
                height: 30,

                padding: 2,

                borderBottomColor: "rgba(0,0,0,0.2)",
                borderStyle: "solid",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text>드롭 삭제하기</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(!modalVisible);
              console.log("Modal Dismissed");
            }}
          >
            <View style={styles.modalOverlay}></View>
          </TouchableWithoutFeedback>

          <View style={styles.centeredView}>
            <View style={styles.modalView2}>
              <Text style={styles.modalText}>정말로 삭제하시겠어요?</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  DeleteDrop(areapk, placePk, dropPk, accessToken);
                  setModalVisible(!modalVisible);
                  navigation.goBack();
                }}
              >
                <Text style={styles.textStyle}>네</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>취소하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    zIndex: 998,
  },

  modalView2: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 999,
  },
  modalContent: {
    width: 100,
    height: 70,
    alignSelf: "flex-end",
    marginRight: 40,
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 998,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 97,
  },

  modalView: {
    margin: 20,
    width: 100,
    height: 70,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
