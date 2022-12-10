import React, { useState, useEffect } from 'react'
import "./Home.css"
import { useSelector, useDispatch } from 'react-redux'
import { getPost } from '../redux/postSlice'
import { Container, Typography, Grid, Grow } from '@mui/material'
import axios from 'axios'
import memories from "../image/memories.png"
import Form from "../components/Forms/Forms"
import Posts from "../components/Posts/Posts"
import Post from '../components/Posts/post/Post'

function Home() {

      // function to dispatch the reux reducers
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState([])

  useEffect(() => {
    setLoading(false)
    getPostFunction();
  }, [])
  
  

    const getPostFunction = async () => {
      setLoading(true);
      await axios.get(`/api/posts/get`).then((result) => {
        setLoading(false);
        // console.log(result.data);
        setPostData(result.data.posts)
        // dispatch(getPost(result.data))
      })
    }


    const cardDisplay = () => {
      if(loading) {
        return <h1>Loading the data...</h1>
      } else {
        return (
          <div className='home_grid'>
            {postData.map((item, index) => {
              let data = {
                creator: item.creator,
                message: item.message,
                selectedFile: item.selectedFile,
                likeCount: item.likeCount
              }
              return (
                <Post postdata={data} key={index}/>
              )
            })}
          </div>
        )
      }
    }

  return (
    <div className='home'>
      <div className="home__cards">
        {cardDisplay()}
      </div>
    </div>
  )
}

export default Home