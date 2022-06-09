import axios from "axios";

const baseUrl = "http://localhost:5000";

export const addNewToken = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(`${baseUrl}/entry`, {
        data,
      });
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

export const getTokenByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${baseUrl}/name=${name}`);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

export const getAllToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${baseUrl}/allToken`);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};
