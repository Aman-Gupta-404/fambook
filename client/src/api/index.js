import axios from 'axios'
// import post from '../redux/postSlice';

// const url = process.env.REACT_APP_IMG_URI;

export const fetchPost = () => axios.get(`/posts/get`);

export const createPost = (post) => axios.post(`/posts/create`, post);