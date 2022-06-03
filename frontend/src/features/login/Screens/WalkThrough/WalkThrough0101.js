import React, { useState } from "react";

import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { theme } from "../../../../infrastructure/theme";

import { SvgXml } from "react-native-svg";

import { SlideView } from "../../../../components/animations/slide.animation";
import { LoginBg } from "../../Component/LoginBg";

import logo from "../../../../../assets/Global/logo";
import { CloudBg } from "../../Component/CloudBg";
import { FadeInView } from "../../../../components/animations/fade.animation";
import { InputBox } from "../../Component/InputBox";
import { LoginButton } from "../../Component/LoginButton";
import { Platform } from "react-native";
import { signIn } from "../../../../services/login/login";
import arrow_btn from "../../../../../assets/Buttons/arrow_btn";

export const WalkThrough0101 = ({ navigation }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isLogIn, setIsLogIn] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handlePassword = (e) => {
    setPassword(e);
  };

  const handleEmail = (e) => {
    setEmail(e);
  };

  const nextButton = async () => {
    // 인증 코드 입력받음
    // 코드 확인하고, signUp0202로 넘어감
    signIn(email, password);
    navigation.navigate("MapScreen");
  };
  return (
    <>
      <LoginBg>
        <CloudBg>
          {/* ----------------------상단 로고와 소개문구 컨테이너 부분(is Login 눌렸을 시 애니메이션으로 전환되도록 하였음)----------------------- */}
          <View style={styles.IconContainer}>
            <FadeInView duration={2000}>
              <SlideView
                isLogIn={isLogIn}
                duration={2000}
                startValue={-50}
                endValue={0}
              >
                <SvgXml xml={logo} width={124.7} height={133.1} />
              </SlideView>
            </FadeInView>
            <FadeInView isLogIn={isLogIn} duration={!isLogIn ? 4000 : 2000}>
              <Text
                style={{
                  width: 130,

                  marginTop: 25,

                  color: "#ffffff",
                  fontFamily: theme.fonts.body,
                  fontSize: 14,
                }}
              >
                지금 서있는 그곳에서
              </Text>

              <Text
                style={{
                  width: 130,

                  marginTop: 11,

                  color: "#ffffff",
                  fontFamily: theme.fonts.body,
                  fontSize: 14,
                }}
              >
                읽고 느끼고 새기세요
              </Text>
            </FadeInView>
          </View>

          {/* ----------------------isLogIn 시 뜨는 흰색 정보 입력 박스----------------------- */}
          <View style={styles.MiddelSpace}>
            {isLogIn ? (
              <View style={styles.LogInContainer}>
                {/* 이메일 비밀번호 입력란 */}
                <InputBox
                  placeholderText={"이메일을 입력하세요"}
                  handleWhat={handleEmail}
                ></InputBox>
                <InputBox
                  placeholderText={"비밀번호를 입력하세요"}
                  handleWhat={handlePassword}
                ></InputBox>
                {/* 비밀번호 찾기 버튼  */}
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SignIn0201");
                  }}
                  style={{
                    width: 120,
                    height: 20,
                    zIndex: 950,
                    flexDirection: "row",
                    marginTop: 10,
                    marginLeft: 150,
                  }}
                >
                  <Text
                    style={{
                      color: "#6b6b6b",
                      fontSize: 12,

                      fontFamily: theme.fonts.body,
                    }}
                  >
                    비밀번호가 뭐였지?
                  </Text>
                  <SvgXml
                    style={{
                      flexDirection: "row",
                      marginTop: 3,
                    }}
                    xml={arrow_btn}
                    width={14}
                    height={5}
                  ></SvgXml>
                </TouchableOpacity>
                {/* 로그인 버튼 */}
                <LoginButton
                  style={{
                    marginTop: 18,
                    backgroundColor: "#996afc",
                    zIndex: 999,
                  }}
                  value="이메일로 로그인"
                  onPress={nextButton}
                  width={260}
                  height={40}
                ></LoginButton>
              </View>
            ) : null}
          </View>

          {/* ----------------------처음에 뜨는 웰컴 메시지, 렛츠드롭, 로그인 회원가입 있는 바닥부분----------------------- */}

          <View style={styles.BottomContainer}>
            {isStarted && !isLogIn ? (
              <View
                style={{
                  position: "absolute",
                  top: -50,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  zIndex: 990,
                }}
              >
                <TouchableOpacity
                  style={styles.LogInButton}
                  onPress={() => {
                    setIsLogIn(true);
                  }}
                >
                  <Text
                    style={{
                      color: "#996afc",
                      fontSize: 14,
                      fontFamily: theme.fonts.bold,
                    }}
                  >
                    로그인
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.SignUpButton}
                  onPress={() => {
                    navigation.navigate("SignUp0101");
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 14,
                      fontFamily: theme.fonts.bold,
                    }}
                  >
                    회원가입
                  </Text>
                </TouchableOpacity>
              </View>
            ) : !isStarted ? (
              <FadeInView
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
                duration={4000}
              >
                <View
                  style={{
                    position: "absolute",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    zIndex: 999,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 14,
                      fontFamily: theme.fonts.body,
                    }}
                  >
                    Min님,오늘은 또 어떤 얘기가 있나요?
                  </Text>
                  <TouchableOpacity
                    style={styles.LetsDropButton}
                    onPress={() => {
                      setIsStarted(true);
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 14,
                        fontFamily: theme.fonts.bold,
                      }}
                    >
                      렛츠 드롭!
                    </Text>
                  </TouchableOpacity>
                </View>
              </FadeInView>
            ) : (
              <FadeInView
                style={{
                  zIndex: 880,
                  position: "absolute",
                  top: 80,
                  alignItems: "center",
                }}
                duration={2000}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 13,

                      fontFamily: theme.fonts.body,
                    }}
                  >
                    계정이 없으신가요?
                  </Text>
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "#ffffff",
                    }}
                    onPress={() => {
                      navigation.navigate("SignUp0101");
                    }}
                  >
                    <Text
                      style={{
                        color: "#ffffff",
                        fontSize: 13,
                        marginLeft: 3,
                        fontFamily: theme.fonts.bold,
                      }}
                    >
                      회원가입
                    </Text>
                  </TouchableOpacity>
                </View>
              </FadeInView>
            )}
          </View>
          {/* ----------------------맨 밑에 깔린 구름 애니메이션----------------------- */}
        </CloudBg>
        {/* ----------------------그라데이션 백그라운드----------------------- */}
      </LoginBg>
    </>
  );
};

const styles = StyleSheet.create({
  IconContainer: {
    flex: 8.5,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 800,
  },
  MiddelSpace: {
    flex: 6,
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 800,
  },
  BottomContainer: {
    flex: 3,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-start",
    zIndex: 800,
  },
  // ---------------------------------------------------------처음에 뜨는 버튼들------------------------------------------------------------
  LetsDropButton: {
    width: 160,
    height: 40,
    backgroundColor: "rgba(250,250,250,0.25)",
    borderColor: "#ffffff",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 17,
    borderWidth: 1,
    zIndex: 999,
  },
  LogInButton: {
    width: 240,
    height: 40,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 17,
    borderWidth: 1,
    zIndex: 999,
  },
  SignUpButton: {
    width: 240,
    height: 40,
    backgroundColor: "rgba(250,250,250,0.25)",
    borderColor: "#ffffff",

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 17,
    borderWidth: 1,
    zIndex: 999,
  },
  // ---------------------------------------------------------로그인하는 화면 디자인 프롭------------------------------------------------------------
  LogInContainer: {
    zIndex: 880,
    position: "absolute",
    bottom: 100,
    width: 320,
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 50,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(50, 50, 50,0.5)",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
