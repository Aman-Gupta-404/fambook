import React from 'react'
import "./post.css"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

function Post({postdata}) {
  // console.log(postdata)
  const imageuri = "/Images/" + postdata.selectedFile;
  // console.log(imageuri)
  return (
    <div className='postcard'>
      <div className="postcard__image--container">
        <div className="postcard__image__options">
          <h1 className="postcard__creator--text">{postdata.creator}</h1> 
          <MoreHorizIcon className='postcard__menu' />
        </div>
        <img className='postcard__image' src={imageuri} alt="" />
      </div>
      <div className="postcard__content">
        <p className="postcard__message">
          {postdata.message}
        </p>
        {/* <div className="postcard__action">
          <ThumbUpOffAltIcon className='postcard_action_like'/>
          {postdata.likeCount === 0 ? "" : <span>{postdata.likeCount}</span>}
        </div> */}
      </div>
    </div>
  )
}

export default Post