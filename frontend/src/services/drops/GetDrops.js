import LOCAL_HOST from "../local.js";
import axios from "axios";

export const getPlaceDrops = {
  msg: "드롭 조회 완료",
  data: [
    {
      pk: 1,
      content: "드롭1 안녕하세요, 날씨가 추워요",
      createdAt: "2022-05-14T11:35:11.000Z",
      creatorPk: 1,
      placePk: 13,
    },
    {
      pk: 4,
      content: "드롭2 학원 고민중!",
      createdAt: "2022-05-14T11:36:58.000Z",
      creatorPk: 1,
      placePk: 13,
    },
    {
      pk: 4,
      content: "드롭2 학원 고민중!",
      createdAt: "2022-05-14T11:36:58.000Z",
      creatorPk: 1,
      placePk: 13,
    },
    {
      pk: 4,
      content: "드롭2 학원 고민중!",
      createdAt: "2022-05-14T11:36:58.000Z",
      creatorPk: 1,
      placePk: 13,
    },
    {
      pk: 4,
      content: "드롭2 학원 고민중!",
      createdAt: "2022-05-14T11:36:58.000Z",
      creatorPk: 1,
      placePk: 13,
    },
    {
      pk: 4,
      content: "드롭2 학원 고민중!",
      createdAt: "2022-05-14T11:36:58.000Z",
      creatorPk: 1,
      placePk: 13,
    },
    {
      pk: 4,
      content: "드롭2 학원 고민중!",
      createdAt: "2022-05-14T11:36:58.000Z",
      creatorPk: 1,
      placePk: 13,
    },
    {
      pk: 4,
      content: "드롭2 학원 고민중!",
      createdAt: "2022-05-14T11:36:58.000Z",
      creatorPk: 1,
      placePk: 13,
    },
    {
      pk: 4,
      content: "드롭2 학원 고민중!",
      createdAt: "2022-05-14T11:36:58.000Z",
      creatorPk: 1,
      placePk: 13,
    },
  ],
};

// export const getPlaceDrops = async (setDrops, areaPk, placePk) => {
//   await axios(`http://${LOCAL_HOST}:3000/`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => {
//       const polygonNum = res.data.data.length;
//       for (i = 0; i < polygonNum; i++) {
//         const polygonCoord = [];
//         res.data.data[i].polygon.coordinates[0].map((coord) => {
//           polygonCoord.push({ latitude: coord[0], longitude: coord[1] });
//         });
//         res.data.data[i].polygon.coordinates = polygonCoord;
//       }
//       setAreaData(res.data);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };
