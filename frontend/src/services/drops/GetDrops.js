import LOCAL_HOST from "../local.js";
import axios from "axios";
import { user } from "../user.js";

export const getPlaceDrops = async (areaPk, placePk, setDrops) => {
  accessToken = user.getAccessToken();
  console.log("getPlaceDrops acceessToken:", accessToken);
  await axios(
    `http://${LOCAL_HOST}:3000/areas/${areaPk}/places/${placePk}/drops`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
    .then((res) => {
      setDrops(res.data.data.publicDrops);
    })
    .catch((e) => console.log(e));
};

// area에서 드롭 가져오는 api 테스트 성공 하면 바꿔주자., placePk 부분 지워주면 됨.
export const getAreaDrops = async (areaPk, setDrops, setDropCount) => {
  console.log("getAreaDrops");
  await axios(`http://${LOCAL_HOST}:3000/areas/${areaPk}/drops`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY2MjExNjM3MiwiZXhwIjoxNjYzMzI1OTcyfQ.k847dvNKSz9g_JGVLqNwvPMl4y8DK6OaWpF7TRK-2B0",
    },
  })
    .then((res) => {
      console.log(res.data);
      setDrops(res.data.data.publicDrops);
      setDropCount(res.data.dropsCount);
    })
    .catch((e) => console.log(e));
};

export const getPlacePreview = async (areaPk, placePk, setDATA) => {
  await axios(
    `http://${LOCAL_HOST}:3000/areas/${areaPk}/places/${placePk}/drops`,
    {
      method: "GET",
    }
  )
    .then((res) => {})
    .catch((e) => console.log(e));
};

export const getSpecificDrop = async (areaPk, placePk, dropPk, setDrop) => {
  await axios(
    `http://${LOCAL_HOST}:3000/areas/${aredPk}/places/${placePk}/drops/${dropPk}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY2MjExNjM3MiwiZXhwIjoxNjYzMzI1OTcyfQ.k847dvNKSz9g_JGVLqNwvPMl4y8DK6OaWpF7TRK-2B0",
      },
    }
  )
    .then((res) => {
      setDrop(res.data.data.publicDrops);
    })
    .catch((e) => console.log(e));
};

export const getMapDrops = [
  {
    emoji: "😀",
    content: "좌참살",
    createdAt: "2022-01-29T04:55:47.000Z",
    latitude: 37.585069,
    longitude: 127.029191,
    pk: 22,
    updatedAt: "2022-01-29T04:55:47.472Z",
  },
  {
    emoji: "😀",
    content: "우참살",
    createdAt: "2022-01-29T04:55:47.000Z",
    latitude: 37.585069,
    longitude: 127.029691,
    pk: 33,
    updatedAt: "2022-01-29T04:55:47.472Z",
  },
];

export const changedDrops = [
  [
    {
      emoji: "😀",
      content: "좌밑참살",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.584069,
      longitude: 127.029191,
      pk: 23,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
    {
      emoji: "😀",
      content: "좌윗참살",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.586069,
      longitude: 127.029191,
      pk: 24,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
    {
      emoji: "😀",
      content: "좌참",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.585069,
      longitude: 127.029691,
      pk: 25,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
  ],
  [
    {
      emoji: "😀",
      content: "우밑참살",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.584069,
      longitude: 127.029691,
      pk: 34,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
    {
      emoji: "😀",
      content: "우윗참살",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.586069,
      longitude: 127.029691,
      pk: 35,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
    {
      emoji: "😀",
      content: "우참살",
      createdAt: "2022-01-29T04:55:47.000Z",
      latitude: 37.585069,
      longitude: 127.029691,
      pk: 36,
      updatedAt: "2022-01-29T04:55:47.472Z",
    },
  ],
];
