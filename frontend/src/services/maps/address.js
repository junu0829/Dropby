import { APIKey, PlAPIKey } from "../../../APIkeys";

export const getAddress = (pressedLocation, setPressedAddressID) => {
  fetch(
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      pressedLocation.latitude +
      "," +
      pressedLocation.longitude +
      `&key=${APIKey}`
  )
    .then((response) => response.json())
    .then((responseJson) => {
      ///가장 가까운 place 정보는 리스트의 첫번째 원소이다
      setPressedAddressID(responseJson.results[0].place_id);
    });
};
/////////----------------Service로 넘기기----------------------
export const getPlaceDetail = (
  setPressedAddress,
  setPressedAddressName,
  pressedAddressID
) => {
  fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${pressedAddressID}&key=${PlAPIKey}`
  )
    .then((response) => response.json())
    .then(async (responseJson) => {
      await setPressedAddress(responseJson.result.formatted_address);
      await setPressedAddressName(`새로운 장소`);
    });
};
