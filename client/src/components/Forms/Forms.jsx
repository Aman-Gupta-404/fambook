import axios from 'axios';
import React, { useState } from 'react';
import FileBase64 from 'react-file-base64';
import { useSelector } from 'react-redux';
import * as api from "../../api";
import "./Form.css";

function Forms() {
  let userState = useSelector((state) => state.user.user);
  const [user, setUser] = useState({ ...userState })
  const [postData, setPostData] = useState({
     creator: "",
     title: "",
     message: "",
     tags: "",
     selectedFile: "",
     _id: ""
  })
  const [error, setError] = useState({
    error: true,
    message: "",
  })

  const selectImage = (e) => {
    console.log(e.target.files[0])
    setPostData({...postData, selectedFile: e.target.files[0]})
  }

  // Form submit button
  const onSumitClick = async (e) => {
    e.preventDefault("title", postData.title);
    try {
      console.log(postData.selectedFile, postData.selectedFile.name)
      const formData = new FormData()
      formData.append("selectedFile", postData.selectedFile, postData.selectedFile.name)
      formData.append("title", postData.title)
      formData.append("creator", postData.creator)
      formData.append("tags", postData.tags)
      formData.append("message", postData.message)
      formData.append("user_id", user._id)
      let tempPostData = {
        ...postData,
        tags: postData.tags.split(','),
        creator: user.firstName,
        _id: user._id,
        name: user.firstName,
        user_id: user._id
      }
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${user.accessToken}`
      }

      // TODO: undo them
      const sendData = await axios.post(`http://localhost:5000/api/posts/create/${user._id}`, tempPostData, {
        headers: headers
      });
      console.log(sendData)
      if(sendData.error) {
        setError({
          error: true,
          message: "some error occured"
        })
      }
    } catch (error) {
      console.error(error)
      setError({
        error: true,
        message: "some error occured"
      })
    }
    // clear the form
    // setPostData({
    //   ...postData,
    //   creator: "",
    //   title: "",
    //   message: "",
    //   tags: "",
    //   selectedFile: ""
    // })
  }

  // form clear button
  const clearForm = (e) => {
    e.preventDefault();
    setPostData({
      ...postData,
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: ""
    })
  }

  const handelOnChange = (e) => {
    e.preventDefault();
    setPostData({
      ...postData,
      [e.target.placeholder]: e.target.value,
    })
  }

  const showError = () => {
    if(error.error) {
      return (
        <p className="text_red">There was an error</p>
      )
    } else {
      return null
    }
  }

  return (
    <div className='form'>
      <h1 className='form__heading'>Post Form</h1>
      <form action="" className='form__container'>
        <input type="text" onChange={handelOnChange} value={postData.title} className='form__input' label="title" placeholder="title"/>
        <input type="text" onChange={handelOnChange} value={postData.message} className='form__input' label="message" placeholder="message"/>
        <input type="text" onChange={handelOnChange} value={postData.tags} className='form__input' label="tags" placeholder="tags"/>
        {/* <FileBase64 onDone={({base64}) => setPostData({...postData, selectedFile: base64})} type="file" className='form__input' label="creator" placeholder="post File"/> */}
        <input type="file" className='form__input' label="creator" placeholder="post File" onChange={selectImage}/>
          {showError()}
        <button onClick={onSumitClick} className="form_btn--submit btn">Submit</button>
        <button onClick={clearForm} className="form_btn--clear btn">Clear</button>
      </form>
    </div>
  )
}

export default Forms