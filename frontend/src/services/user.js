import AsyncStorage from "@react-native-async-storage/async-storage";

const UserClass = class {
  constructor() {
    this.accessToken = null;
    this.refreshToken = null;
    this.nickname = null;
  }

  setItemToAsync = async (storageName, item) => {
    try {
      await AsyncStorage.setItem(storageName, item);
    } catch (e) {}
  };

  getItemFromAsync = async () => {
    this.accessToken = await AsyncStorage.getItem("accessToken");
    this.refreshToken = await AsyncStorage.getItem("refreshToken");
    this.nickname = await AsyncStorage.getItem("nickname");
  };

  read() {
    console.log(this.accessToken);
    console.log(this.refreshToken);
    console.log(this.nickname);
  }
  getAccessToken = () => {
    return this.accessToken;
  };
  getRefreshToken = () => {
    return this.refreshToken;
  };
  getNickname = () => {
    return this.nickname;
  };

  clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    console.log("AsyncStorage Cleared.");
  };
};
export const user = new UserClass();
