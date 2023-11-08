import axios from 'axios';
import { API_BASE_URL, AUTH_TOKEN } from '../config';

export const api = {
  getAllUsers: (start, limit, searchQuery, successCallback, errorCallback) => {
    return axios.get(`${API_BASE_URL}/users?start=${start}&limit=${limit}&search=${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        const data = response.data;
        successCallback(data.data);
      })
      .catch(error => {
        errorCallback(error);
      });
  },
  login: (username, password, successCallback, errorCallback) => {
    axios
      .post(`${API_BASE_URL}/login`, {
        email: username,
        password: password,
      })
      .then(response => {
        const data = response.data;
        if (data.errorCode === 0) {
          alert(data.message);
          successCallback(data.token);
          window.location.href = './dashboard';
        } else if (data.errorCode === 1) {
          alert(data.errorMessage);
        } else {
          alert("Unable to login, Unknown error");
        }
      })
      .catch(error => {
        errorCallback(error);
      });
  },
  signup: (firstName, lastName, email, password) => {
    return axios
      .post(`${API_BASE_URL}/signup`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },)
      .then(response => {
        const data = response.data;
        if (data.errorCode === 0) {
          alert(data.message);
          // window.location.href = '../';
        } else if (data.errorCode === 1) {
          alert(data.errorMessage);
        } else {
          alert("Unable to signup, Unknown error");
        }
      })
      .catch(error => {
        console.error(error);
        alert(error)
      });
  },
  getUserDetails: (successCallback, errorCallback) => {
    axios.get(`${API_BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        const data = response.data;
        // console.log(data)
        successCallback(data);
      })
      .catch(error => {
        errorCallback(error);
      });
  },

  updateUserDetails: (userData, successCallback, errorCallback) => {
    axios.put(`${API_BASE_URL}/user`, userData, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        const data = response.data;
        successCallback(data);
      })
      .catch(error => {
        errorCallback(error);
      });
  },


};
