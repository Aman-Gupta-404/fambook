import React, { useEffect, useState} from 'react'
import "./MyPost.css"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import Post from '../../components/Posts/post/Post';


function MyPost() {
    let userState = useSelector((state) => state.user);
    const [user, setUser] = useState(userState.user)
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        setLoading(false)
        getPostFunction();
    }, [])

    const getPostFunction = async () => {
        setLoading(true);
        const URI = `/api/posts/mypost/${user._id}`

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`,
            'Access-Control-Allow-Origin': '*',
        }

        await axios.get(URI,
            // { testData: "data"},
            {
                headers: headers,
                withCredentials: true
            }).
            then((result) => {
                setLoading(false);
                console.log(result.data);
                setPostData(result.data.postData)
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
    <div className='mypost'>
        <div className="displayCards">
            {cardDisplay()}
        </div>
    </div>
  )
}

export default MyPost