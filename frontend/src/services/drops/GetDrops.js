import LOCAL_HOST from "../local.js";
import axios from "axios";

export const getPlaceDrops = async (areaPk, placePk, setDrops) => {
  await axios(`http://${LOCAL_HOST}:3000/${areaPk}/${placePk}/drops`, {
    method: "GET",
    headers: {},
  })
    .then((res) => {
      setDrops(res.data.data);
    })
    .catch((e) => console.log(e));
};
