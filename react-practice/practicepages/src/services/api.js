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
    return fetch(`https://192.168.1.19:7000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data)
        if (data.errorCode === 0) {
          alert(data.message)
          successCallback(data.token);
          window.location.href = './dashboard';
        } else if (data.errorCode === 1) {
          alert(data.errorMessage)
        } else {
          alert("Unable to login, Unknown error")
        }
      })
      .catch(error => {
        errorCallback(error);
      });
  },
  signup: (firstName, lastName, email, password) => {
    return axios.post(`https://192.168.1.19:7000/signup`, {
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

};
