import LOCAL_HOST from "../local.js";
import axios from "axios";

export const postComment = async (areaPk, placePk, dropPk, comment) => {
  await axios(
    `http://${LOCAL_HOST}:3000/areas/${areaPk}/places/${placePk}/drops/${dropPk}/comments`,
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY1NzI5MzUyMiwiZXhwIjoxNjU5ODg1NTIyfQ.4La58jIAmjDM-EBw7dNH8lX2RbRy-VFY6uYZ-7vpXgM",
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

export const getComments = async (areaPk, placePk, dropPk, setComments) => {
  await axios(
    `http://${LOCAL_HOST}:3000/areas/${areaPk}/places/${placePk}/drops/${dropPk}/comments`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY1NzI5MzUyMiwiZXhwIjoxNjU5ODg1NTIyfQ.4La58jIAmjDM-EBw7dNH8lX2RbRy-VFY6uYZ-7vpXgM",
      },
    }
  )
    .then((res) => {
      setComments(res.data.data);
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY1NzI5MzUyMiwiZXhwIjoxNjU5ODg1NTIyfQ.4La58jIAmjDM-EBw7dNH8lX2RbRy-VFY6uYZ-7vpXgM",
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
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6MSwiZW1haWwiOiJ0ZXN0MkB0ZXN0LmNvbSIsImlhdCI6MTY1NzI5MzUyMiwiZXhwIjoxNjU5ODg1NTIyfQ.4La58jIAmjDM-EBw7dNH8lX2RbRy-VFY6uYZ-7vpXgM",
      },
    }
  )
    .then((res) => {
      console.log(res.data.msg);
    })
    .catch((e) => console.log(e));
};
