import axios from "axios";

interface IPost {
  userId: string;
  title: string;
  content: string;
}

interface IUpdate {
  title: string;
  content: string;
}

interface IUser {
  userId: string;
}
const BASE_URL = `http://43.201.107.181/api`;

export const fetchBoard = async () => {
  // 데이터 얻는법
  // axios.get(url).then(res => console.log(res.data))
  return await axios.get(`${BASE_URL}`).then((res) => res.data);
};

export const fetchPosts = async (bno: number) => {
  // axios.get(url).then(res => console.log(res.data))
  return await axios
    .get(`${BASE_URL}/board?category=${bno}`)
    .then((res) => res.data);
};

export const fetchPost = async (bno: number, pno: number) => {
  return await axios
    .get(`${BASE_URL}/post?category=${bno}&pno=${pno}`)
    .then((res) => res.data);
};

export const createPost = async (postData: IPost, bno: number) => {
  return await axios
    .post(`${BASE_URL}/post/write?category=${bno}`, postData)
    .then((res) => res.data);
};

export const updatePost = async (
  postData: IUpdate,
  bno: number,
  pno: number
) => {
  return await axios
    .patch(`${BASE_URL}/post/edit?category=${bno}&pno=${pno}`, postData)
    .then((res) => res.data);
};

export const deletePost = async (bno: number, pno: number) => {
  return await axios
    .delete(`${BASE_URL}/post?category=${bno}&pno=${pno}`)
    .then((res) => res.data);
};

export const likePost = async (userId: IUser, bno: number, pno: number) => {
  return await axios
    .post(`${BASE_URL}/post/like?category=${bno}&pno=${pno}`, userId)
    .then((res) => res.data);
};
