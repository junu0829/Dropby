import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Image,
} from "react-native";
import { theme } from "../../../infrastructure/theme";
import LoadIcon from "../../../../assets/images/LoadIcon";
import { SvgXml } from "react-native-svg";
import Checkbox from "expo-checkbox";
import googleLogin from "../../../../assets/Buttons/googleLogin";
import kakaoLogin from "../../../../assets/Buttons/kakaoLogin";
import whiteBackButton from "../../../../assets/whiteBackButton";
import { TextInput } from "react-native-gesture-handler";
import SignInButton from "../../../../assets/Buttons/SignInButton";
import AreYouStartingButton from "../../../../assets/Buttons/AreYouStartingButton";
import FindingPWButton from "../../../../assets/Buttons/FindingPWButton";
import axios from "axios";
import MovingCloud from "../../../../assets/MovingCloud.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../../../services/fetch";

import LOCAL_HOST from "../../local.js";

export const SignInScreen = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePassword = (e) => {
    setPassword(e);
  };

  const handleEmail = (e) => {
    setEmail(e);
  };

  const signIn = async () => {
    const response = await axios(`http://${LOCAL_HOST}:3000/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        const accessToken = res.data.data.tokens.access;
        const refreshToken = res.data.data.tokens.refresh;
        const nickname = res.data.data.userData.nickname;
        AsyncStorage.setItem("accessToken", accessToken);
        AsyncStorage.setItem("refreshToken", refreshToken);
        AsyncStorage.setItem("nickname", nickname);
        console.log("tokens saved in asyncstorage");
      })
      .catch((error) => {
        console.log(error.message);
      });

    return response;
  };
  return (
    <>
      <LinearGradient
        style={styles.container}
        colors={[
          theme.colors.bg.a,
          theme.colors.bg.b,
          theme.colors.bg.c,
          theme.colors.bg.d,
        ]}
        start={{ x: 0.99, y: 0.01 }}
        end={{ x: 0.01, y: 0.99 }}
        locations={[0.0, 0.5, 0.8, 1.0]}
      >
        <View style={styles.container2}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("WalkThrough_01_01");
            }}
            style={{ alignSelf: "flex-start", marginBottom: 180 }}
          >
            <SvgXml xml={whiteBackButton} width={50}></SvgXml>
          </TouchableOpacity>
          <SvgXml xml={LoadIcon} width={72} height={123} />
        </View>
        <View style={styles.container3}>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#02B5AA"
              placeholder="이메일"
              onChangeText={(email) => handleEmail(email)}
              value={null}
            ></TextInput>
          </View>
          <View style={styles.inputBox2}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#02B5AA"
              placeholder="비밀번호"
              onChangeText={(password) => handlePassword(password)}
              value={null}
            ></TextInput>
          </View>

          <View
            style={{
              top: 5,
              width: 100,
              height: 30,
              flexDirection: "row",
              marginLeft: 185,
            }}
          >
            <TouchableOpacity>
              <Text
                style={{
                  color: theme.colors.bg.white,
                  fontSize: 12,

                  fontWeight: "700",
                  marginTop: 8,
                }}
              >
                비밀번호가 뭐였지?
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container4}>
          <TouchableOpacity
            style={{ zIndex: 999, position: "absolute", top: 40 }}
            onPress={() => {
              signIn();
              navigation.navigate("SignUp");
            }}
          >

            <SvgXml xml={SignInButton} width={280} height={43} />

          </TouchableOpacity>
          <View
            style={{
              zIndex: 1,
              position: "absolute",
            }}
          >
            <Image
              style={{
                width: 223,
                height: 100,
                zIndex: 2,
              }}
              source={MovingCloud}
            ></Image>
            <Image
              style={{
                top: -50,
                left: 90,
                opacity: 0.5,
                width: 446,
                height: 200,
                zIndex: 5,
              }}
              source={MovingCloud}
            ></Image>
          </View>
          <TouchableOpacity style={{ marginTop: 5 }}>
            <SvgXml xml={googleLogin} width={45} height={45} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 9,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container3: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container4: {
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  checkbox: {
    alignSelf: "center",
    margin: 8,
    width: 17,
    height: 17,
    borderColor: "white",
    borderRadius: 5,
  },
  inputBox: {
    backgroundColor: theme.colors.bg.white,
    width: 280,
    height: 38,
    opacity: 0.9,
    marginTop: 10,
    borderColor: theme.colors.bg.a,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
  },
  inputBox2: {
    backgroundColor: theme.colors.bg.white,
    width: 280,
    height: 38,
    opacity: 0.9,
    borderColor: theme.colors.bg.a,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
  },
  input: {
    fontSize: 14,
    left: 50,

    fontFamily: theme.fonts.body,
  },
});
