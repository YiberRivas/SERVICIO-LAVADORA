import axios from 'axios';

const API_URL = 'http://localhost:4000/api/lavadoras';

export const getLavadoras = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createLavadora = async (lavadora) => {
  const res = await axios.post(API_URL, lavadora);
  return res.data;
};
