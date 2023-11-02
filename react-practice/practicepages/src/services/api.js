// import axios from 'axios';
// import {
//   API_BASE_URL,
//   AUTH_TOKEN
// } from '../config/config';


// export const api = {
//   getAllUsers: async (start, limit) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/users?start=${start}&limit=${limit}`, {
//         headers: {
//           Authorization: `Bearer ${AUTH_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       });
//       const data = response.data;

//       return data.data;
//     } catch (error) {
//       throw error;
//     }
//   },

//   login: async (username, password) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: username,
//           password: password,
//         }),
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.errorMessage);
//       }
//       const data = await response.json();
//       alert(data.responseMessage);
//       return data.token; // Assuming the server responds with a token on successful login.
//     } catch (error) {
//       throw error;
//     }
//   },
// };

import axios from 'axios';
import { API_BASE_URL, AUTH_TOKEN } from '../config/config';

export const api = {
  getAllUsers: async (start, limit, successCallback, errorCallback) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users?start=${start}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      successCallback(data.data);
    } catch (error) {
      errorCallback(error);
    }
  },

  login: async (username, password, successCallback, errorCallback) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        errorCallback(new Error(data.errorMessage));
      } else {
        const data = await response.json();
        alert(data.responseMessage);
        successCallback(data.token);
      }
    } catch (error) {
      errorCallback(error);
    }
  },
};
