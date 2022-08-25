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
