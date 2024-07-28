// INITIAL CODE
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {register, clearErrors} from '../../actions/userAction'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import avatarPrev from '../../assets/images/avatarPreview.png'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(avatarPrev);

    const { loading, error, isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        if(error) {
            dispatch(clearErrors())
        }

        if(isAuthenticated) {
            navigate("/")
        }

    },[dispatch, error, isAuthenticated, navigate])

    

    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          password: '',
        },
        onSubmit: values => {
            let formData = new FormData()

            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("password", values.password);

            // if(values.avatar) {
            //     formData.append("avatar", values.avatar);
            // }

            dispatch(register(formData));

            //formik.resetForm()
        },
      });

      const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        
        if(e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };

            reader.readAsDataURL(e.target.files[0])
        }
      }


    return (
        <div className='loginForm'>
            <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                <div>
                    <div>
                        {previewUrl && (
                            <img 
                                src={previewUrl} 
                                alt="chosen" 
                                style={{ height: '100px', width: '100px' }} 
                            />
                        )}
                    </div>
                    <h2>Register</h2>
                    <div>
                        <label htmlFor="name_field">Name</label>
                        <input
                            type="name"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </div>
                    <div>
                        <label htmlFor="email_field">Emails</label>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    <div>
                        <label 
                            htmlFor="password_field">
                                Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </div>

                    <div>
                        <label 
                            htmlFor="avatar_upload">
                                Choose Avatar
                        </label>
                        <input
                            type="file"
                            name="avatar"
                            accept='image/*'
                            onChange={(e) => {
                                formik.setFieldValue('avatar', e.currentTarget.files[0]);
                                handleFileChange(e)
                            }}
                        />
                    </div>
                    <button
                        type='submit'
                        disabled={ loading ? true : false}
                    >
                        SIGN UP
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register
