import axios from 'axios';

const BuildClient = ({ req }: any) => {
  if (typeof window === 'undefined') {
   // console.log(process.env.NEXT_PUBLIC_API_URL);
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      withCredentials: true,
    });
  }
};

export default BuildClient;
