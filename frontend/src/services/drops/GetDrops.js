import LOCAL_HOST from "../local.js";
import axios from "axios";

export const getPlaceDrops = async (areaPk, placePk, setDrops) => {
  await axios(`http://${LOCAL_HOST}:3000/${areaPk}/${placePk}/drops`, {
    method: "GET",
  })
    .then((res) => {
      setDrops(res.data.data);
    })
    .catch((e) => console.log(e));
};

// area에서 드롭 가져오는 api 테스트 성공 하면 바꿔주자., placePk 부분 지워주면 됨.
export const getAreaDrops = async (areaPk, placePk, setDrops) => {
  await axios(`http://${LOCAL_HOST}:3000/${areaPk}/${placePk}/drops`, {
    method: "GET",
  })
    .then((res) => {
      setDrops(res.data.data);
    })
    .catch((e) => console.log(e));
};
