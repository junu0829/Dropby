import LOCAL_HOST from "../local.js";
import axios from "axios";

export const postComment = async (areaPk, placePk, dropPk, comment) => {
  await axios(
    `http://${LOCAL_HOST}:3000/areas/${areaPk}/places/${placePk}/drops/${dropPk}/comments`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY2MDIzNTI1MiwiZXhwIjoxNjYyODI3MjUyfQ.grypUueNcNkbFevK6UcU8I-y5xyJLuww1d1oZ9yBMy4",
      },
      data: {
        content: comment,
      },
    }
  )
    .then((res) => {
      console.log(res.data.msg);
    })
    .catch((e) => console.log(e));
};

export const getComments = async (
  areaPk,
  placePk,
  dropPk,
  setComments,
  setCommentsCount
) => {
  await axios(
    `http://${LOCAL_HOST}:3000/areas/${areaPk}/places/${placePk}/drops/${dropPk}/comments`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY2MDIzNTI1MiwiZXhwIjoxNjYyODI3MjUyfQ.grypUueNcNkbFevK6UcU8I-y5xyJLuww1d1oZ9yBMy4",
      },
    }
  )
    .then((res) => {
      setComments(res.data.data);
      setCommentsCount(res.data.commentsCount);
    })
    .catch((e) => console.log(e));
};

export const editComment = async (
  areaPk,
  placePk,
  dropPk,
  commentPk,
  comment
) => {
  await axios(
    `http://${LOCAL_HOST}:3000/areas/${areaPk}/places/${placePk}/drops/${dropPk}/comments/${commentPk}`,
    {
      method: "PUT",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY2MDIzNTI1MiwiZXhwIjoxNjYyODI3MjUyfQ.grypUueNcNkbFevK6UcU8I-y5xyJLuww1d1oZ9yBMy4",
      },
      data: {
        content: comment,
      },
    }
  )
    .then((res) => {
      console.log(res.data.msg);
    })
    .catch((e) => console.log(e));
};

export const deleteComment = async (areaPk, placePk, dropPk, commentPk) => {
  await axios(
    `http://${LOCAL_HOST}:3000/areas/${areaPk}/places/${placePk}/drops/${dropPk}/comments/${commentPk}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY2MDIzNTI1MiwiZXhwIjoxNjYyODI3MjUyfQ.grypUueNcNkbFevK6UcU8I-y5xyJLuww1d1oZ9yBMy4",
      },
    }
  )
    .then((res) => {
      console.log(res.data.msg);
    })
    .catch((e) => console.log(e));
};
