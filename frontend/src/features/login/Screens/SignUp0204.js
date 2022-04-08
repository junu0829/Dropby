import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { theme } from "../../../infrastructure/theme";
import { SvgXml } from "react-native-svg";
import { TextInput } from "react-native-gesture-handler";
import backButtonWhite from "../../../../assets/Buttons/backButtonWhite";
import { LoginBg } from "../Component/LoginBg";
import { LoginButton } from "../Component/LoginButton";

export const SignUp0204 = ({ navigation, route }) => {
  const { userInfo, setUserInfo } = route.params;

  const [isCheck, setIsCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState("");

  const handlePassword = (e) => {
    if (isCheck) {
      setPwCheck(e);
    } else {
      setUserInfo((state) => {
        return { ...state, password: e };
      });
    }
  };

  const nextButton = () => {
    // 비밀번호 확인창으로 넘어가기
    // 비밀번호 일치하면 SignUp0205로 넘어가기
    // 비밀번호 틀리면 다시 입력받기
    if (!isCheck) {
      setIsCheck(true);
    } else {
      if (pwCheck == userInfo.password) {
        navigation.navigate("SignUp0205");
      } else {
        Alert.alert("비밀번호가 틀렸습니다! 다시 입력해주세요");
        setPwCheck("");
      }
    }
  };

  return (
    <>
      <LoginBg>
        {/* 뒤로가기 버튼 */}
        <View style={styles.container1}>
          <TouchableOpacity
            style={{ right: 140, bottom: 40 }}
            onPress={() => navigation.goBack()}
          >
            <SvgXml xml={backButtonWhite} width={20} height={20} />
          </TouchableOpacity>
        </View>

        {/* Main 안내 문구 */}
        <View style={styles.container2}>
          {isCheck ? (
            <Text style={styles.mainText}>비밀번호 확인!</Text>
          ) : (
            <Text style={styles.mainText}>비밀번호를 입력해주세요</Text>
          )}
        </View>

        {/* 유저 입력창 */}
        <View style={styles.container3}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#02B5AA"
              placeholder=""
              onChangeText={(password) => handlePassword(password)}
              value={isCheck ? pwCheck : userInfo.password}
            ></TextInput>
          </View>
          <LoginButton
            style={{ marginTop: 100 }}
            value="다 음"
            onPress={nextButton}
            width={300}
            height={43}
          />
        </View>
      </LoginBg>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container3: {
    flex: 4,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  mainText: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",

    color: "white",
    fontFamily: theme.fonts.bold,
    fontWeight: "700",
    fontSize: 20,
  },

  input: {
    width: 200,

    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    color: "white",
    fontFamily: theme.fonts.body,
  },
});
