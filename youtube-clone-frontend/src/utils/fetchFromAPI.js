import axios from 'axios';

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