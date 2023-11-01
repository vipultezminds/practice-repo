import axios from 'axios';

const API_BASE_URL = 'https://api.tezminds.com';
// const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE0NDQ0Nzg0MDAsInVzZXJuYW1lIjoiS2F1c2hhbCJ9.SMrgYrhFb_eJS-rdjIywDGf9VQFmm2uAUWPSeP-1FQc'; 
const AUTH_TOKEN = localStorage.getItem('authtoken'); 

export const getAllUsers = async (start,limit) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users?start=${start}&limit=${limit}`, {
      headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
    });
    const data = response.data;
    // console.log(data)
    // if (data.errorCode !== 0) {
    //   alert(data.errorMessage)
    //   throw new Error(data.errorMessage);
    // }
    // console.log(data.data)
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (username, password) => {
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
        throw new Error(data.errorMessage);
      }
      const data = await response.json();
      alert(data.responseMessage)
      return data.token; // Assuming the server responds with a token on successful login.
    } catch (error) {
      throw error;
    }
  };
  