import axios from "axios";

const BASE_URL = `http://43.201.107.181/api`;

export const fetchBoard = async () => {
  // 데이터 얻는법
  // axios.get(url).then(res => console.log(res.data))
  return await axios.get(`${BASE_URL}`).then((res) => res.data);
};

export const fetchPosts = async (bno: number) => {
  // axios.get(url).then(res => console.log(res.data))
  return await axios
    .get(`${BASE_URL}/board/category/${bno}`)
    .then((res) => res.data);
};
