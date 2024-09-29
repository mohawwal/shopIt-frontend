import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { upload } from '../actions/uploadAction'

const Add = () => {
    const dispatch = useDispatch()

    const [uploadFile, setUploadFile] = useState();
    const { file, loading, error } = useSelector((state) => state.upload)

    const uploadFileFunc = () => {
        const formData = new FormData()
        formData.append("file", uploadFile);
        console.log(formData);

        dispatch(upload(formData))

    }

    if(error) {
        return (
            <b>{error}</b>
        )
    }
  
  return (
    <div style={{padding: '20%'}}>
        <h1>JUST PRACTICING</h1>
        <br />
        <img src={file} alt="file" />
        <input type="file" onChange={(e) => {setUploadFile(e.target.files[0])}} />
      Add a file

      <button onClick={() => uploadFileFunc()}>{loading ? <>loading...</> : <>upload file</>}</button>
    </div>
  )
}

export default Add
