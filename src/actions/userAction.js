import axiosInstance from '../axios/axios'

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,

    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,

    USERS_DETAILS_REQUEST,
    USERS_DETAILS_SUCCESS,
    USERS_DETAILS_FAIL,

    DELETE_USERS_REQUEST,
    DELETE_USERS_SUCCESS,
    DELETE_USERS_FAIL,

    UPDATE_USERS_REQUEST,
    UPDATE_USERS_SUCCESS,
    UPDATE_USERS_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,


    CLEAR_ERRORS

} from '../components/constants/userConstants'


//LOGIN
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axiosInstance.post('/api/v1/login', {email, password}, config)

        localStorage.setItem('token', data.token)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })


    } catch(error) {
        const errorMessage = error.response?.data?.message
        dispatch({
            type: LOGIN_FAIL,
            payload: errorMessage
        })
    }
}

//REGISTER
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({type: REGISTER_USER_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const {data} = await axiosInstance.post('/api/v1/register', userData, config)
        localStorage.setItem('token', data.token)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })


    } catch(error) {
        const errorMessage = error.response?.data?.message || error.message;
 
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: errorMessage
        })
    }
}

//Load user
export const loadUser = () => async(dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axiosInstance.get('/api/v1/me')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })


    } catch(error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({
            type: LOAD_USER_FAIL,
            payload: errorMessage
        })
    }
}

//Update Profile 
export const updateProfile = (userData) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axiosInstance.put('/api/v1/me/update', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })


    }catch(error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: errorMessage
        })
    }
}

//Update password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({type: UPDATE_PASSWORD_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axiosInstance.put('/api/v1/password/update', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    }catch(error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: errorMessage
        })
    }

}

//Forget password
export const forgetPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axiosInstance.post('/api/v1/password/forgot', email, config);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: errorMessage,
        });
    }
};

//reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({type: NEW_PASSWORD_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axiosInstance.put(`/api/v1/password/reset/${token}`, passwords, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: errorMessage
        })
    }
}

//LogOut user
export const logOut = () => async (dispatch) => {
    try {
        await axiosInstance.get('/api/v1/logout')
        localStorage.removeItem('token');
        
        dispatch({
            type: LOGOUT_SUCCESS,
        })
        

    } catch(error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({
            type: LOGOUT_FAIL,
            payload: errorMessage
        })
    }
}

//admin all users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({type: ALL_USERS_REQUEST})

        const { data } = await axiosInstance.get(`/api/v1/admin/users`)

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })

    } catch(error) {
        const errorMessage = error.response?.data?.message || error.message;
        dispatch({
            type: ALL_USERS_FAIL,
            payload: errorMessage
        })
    }
}

export const getUserDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: USERS_DETAILS_REQUEST })

		const { data } = await axiosInstance.get(`/api/v1/admin/user/${id}`); 

		dispatch({
			type: USERS_DETAILS_SUCCESS,
			payload: data.user,
		});


	} catch (error) {
		const errorMessage = error.response?.data?.message || error.message;
		dispatch({
			type: USERS_DETAILS_FAIL,
			payload: errorMessage,
		});
	}
	
};

// delete USER ADMIN
export const deleteUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_USERS_REQUEST })

		const { data } = await axiosInstance.delete(`/api/v1/admin/user/${id}`); 

		dispatch({
			type: DELETE_USERS_SUCCESS,
			payload: data.success,
		});


	} catch (error) {
		const errorMessage = error.response?.data?.message || error.message;
		dispatch({
			type: DELETE_USERS_FAIL,
			payload: errorMessage,
		});
	}
};

// Update user - ADMIN
export const UpdateUser = (id, userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_USERS_REQUEST })

		const { data } = await axiosInstance.put(`/api/v1/admin/user/${id}`, userData); 

		dispatch({
			type: UPDATE_USERS_SUCCESS,
			payload: data.success,
		});


	} catch (error) {
		const errorMessage = error.response?.data?.message || error.message;
		dispatch({
			type: UPDATE_USERS_FAIL,
			payload: errorMessage,
		});
	}
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
