import React, { useEffect } from 'react'
import "./posts.css"
import Post from './post/Post'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getPost } from "../../redux/postSlice"

function Posts() {

  const post  = useSelector((state) => state.post)
  const dispatch = useDispatch()
  // console.log(post)


  return (
    <>
          <div>All Your Memories</div>
        {post.postArray.length === 0 ?
        <>length is zero</>:
        (<div>
          {post.postArray.map((item, id) => {
            // console.log(item)
            return <Post key={id} postdata={item}/>
          })}
        </div>)}
        {/*<Post />
        <Post /> */}
    </>
  )
}

export default Posts