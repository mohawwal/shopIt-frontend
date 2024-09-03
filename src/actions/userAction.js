import axios from 'axios'

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

        const { data } = await axios.post('/api/v1/login', {email, password}, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch(error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
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

        const {data} = await axios.post('/api/v1/register', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })


    } catch(error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Load user
export const loadUser = () => async(dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/v1/me')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })


    } catch(error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
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

        const { data } = await axios.put('/api/v1/me/update', userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })


    }catch(error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
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

        const { data } = await axios.put('/api/v1/password/update', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    }catch(error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
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

        const { data } = await axios.post('/api/v1/password/forgot', email, config);

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        });
    } catch (error) {
        let errorMessage = 'An error occurred';
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
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

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch(error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}


//LogOut user
export const logOut = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout')
        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch(error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}



//admin all users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({type: ALL_USERS_REQUEST})

        const { data } = await axios.get(`/api/v1/admin/users`)

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })

    } catch(error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: USERS_DETAILS_REQUEST })

		const { data } = await axios.get(`/api/v1/admin/user/${id}`); 

		dispatch({
			type: USERS_DETAILS_SUCCESS,
			payload: data.user,
		});


	} catch (error) {
		dispatch({
			type: USERS_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
	
};


// delete USER ADMIN
export const deleteUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_USERS_REQUEST })

		const { data } = await axios.delete(`/api/v1/admin/user/${id}`); 

		dispatch({
			type: DELETE_USERS_SUCCESS,
			payload: data.success,
		});


	} catch (error) {
		dispatch({
			type: DELETE_USERS_FAIL,
			payload: error.response.data.message,
		});
	}
};


// Update user - ADMIN
export const UpdateUser = (id, userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_USERS_REQUEST })

		const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData); 

		dispatch({
			type: UPDATE_USERS_SUCCESS,
			payload: data.success,
		});


	} catch (error) {
		dispatch({
			type: UPDATE_USERS_FAIL,
			payload: error.response.data.message,
		});
	}
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}