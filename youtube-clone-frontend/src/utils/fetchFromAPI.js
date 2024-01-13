import axios from 'axios';
import { Youtube_API_Key } from './config';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
  url: BASE_URL,
  params: {
    maxResults: '50'
  },
  headers: {
    'X-RapidAPI-Key': Youtube_API_Key,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  }
};

export const fetchFromAPI = async (url) => {
    const {data} = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
}

export const fetchFromserver = async (url) => {
  const {data} = await axios.get(`http://localhost:8800/api/${url}`, {
    withCredentials: true,
  });
  return data;
}

export const postToServer = async(url, args) => {
  return await axios.post(`http://localhost:8800/api/${url}`, args, {
    withCredentials: true, 
  });
}

export const putToServer = async(url, args) => {
  try {
    return await axios.put(`http://localhost:8800/api/${url}`,  args, {
    withCredentials: true, 
  });
  } catch (error) {
    console.log(`from fetchFromAPI: ${error}`)
  }
  
}