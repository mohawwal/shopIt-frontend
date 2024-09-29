import axiosInstance from '../axios/axios'

import {
	UPLOAD_FILE_REQUEST,
	UPLOAD_FILE_SUCCESS,
	UPLOAD_FILE_FAIL,

    CLEAR_ERRORS
} from "../components/constants/uploadConstants";


//UPLOAD
export const upload = (formData) => async (dispatch) => {
    try {
        dispatch({type: UPLOAD_FILE_REQUEST})


        const { data } = await axiosInstance.post('/api/v1/upload', formData )

        dispatch({
            type: UPLOAD_FILE_SUCCESS,
            payload: data
        })


    } catch(error) {
        const errorMessage = error.response?.data?.message
        dispatch({
            type: UPLOAD_FILE_FAIL,
            payload: errorMessage
        })
    }
}

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
