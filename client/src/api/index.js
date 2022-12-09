import axios from 'axios'
// import post from '../redux/postSlice';

const url = "http://localhost:5000";

export const fetchPost = () => axios.get(`${url}/posts/get`);

export const createPost = (post) => axios.post(`${url}/posts/create`, post);