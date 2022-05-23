import AsyncStorage from "@react-native-async-storage/async-storage";

const UserClass = class {
  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.nickname = null;
  }

  setItemToAsync = (storageName, item) => {
    AsyncStorage.setItem(storageName, item);
  };

  getItemFromAsync = async () => {
    this.accessToken = await AsyncStorage.getItem("accessToken");
    this.refreshToken = await AsyncStorage.getItem("refreshToken");
    this.nickname = await AsyncStorage.getItem("nickname");
    this.read();
  };

  read() {
    console.log(this.accessToken);
    console.log(this.refreshToken);
    console.log(this.nickname);
  }
};
export const user = new UserClass();

// 기존 user.js 파일 내용
//   import * as Application from "expo-application";

// import { Platform } from "react-native";

// const isIOS = Platform.OS === "ios";
// let uniqueId;
// if (isIOS) {
//   let iosId = await Application.getIosIdForVendorAsync();
//   uniqueId = iosId;
// } else {
//   uniqueId = Application.androidId;
// }

// console.log(uniqueId);
