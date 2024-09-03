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

	UPDATE_PASSWORD_REQUEST,
	UPDATE_PASSWORD_SUCCESS,
	UPDATE_PASSWORD_RESET,
	UPDATE_PASSWORD_FAIL,

	UPDATE_PROFILE_REQUEST,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_RESET,
	UPDATE_PROFILE_FAIL,

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
	DELETE_USERS_RESET,
	DELETE_USERS_FAIL,

	UPDATE_USERS_REQUEST,
	UPDATE_USERS_SUCCESS,
	UPDATE_USERS_RESET,
	UPDATE_USERS_FAIL,

	LOGOUT_SUCCESS,
	LOGOUT_FAIL,

	CLEAR_ERRORS,
} from "../constants/userConstants";


export const authReducer = (
	state = { user: {}, loading: false, isAuthenticated: false },
	action,
) => {
	switch (action.type) {
		case LOGIN_REQUEST:
		case REGISTER_USER_REQUEST:
		case LOAD_USER_REQUEST:
			return {
				loading: true,
				isAuthenticated: false,
			};

		case LOGIN_SUCCESS:
		case REGISTER_USER_SUCCESS:
		case LOAD_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: action.payload,
			};

		case LOGOUT_SUCCESS:
			return {
				loading: false,
				isAuthenticated: false,
				user: null,
			};

		case LOGIN_FAIL:
		case REGISTER_USER_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};

		case LOGOUT_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case LOAD_USER_FAIL:
			return {
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};


export const userReducer = (state = {}, action) => {
	switch (action.type) {

		case UPDATE_PROFILE_REQUEST:
		case UPDATE_PASSWORD_REQUEST:
			return {
				...state,
				loading: true
			}
		
		case UPDATE_PROFILE_SUCCESS:
		case UPDATE_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload
			}

		case UPDATE_PROFILE_RESET:
		case UPDATE_PASSWORD_RESET:
			return {
				...state,
				isUpdated: false
			}
		
		case UPDATE_PROFILE_FAIL:
		case UPDATE_PASSWORD_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
}

export const forgotPasswordReducer = (state = {}, action) => {
	switch (action.type) {
		case FORGOT_PASSWORD_REQUEST:
		case NEW_PASSWORD_REQUEST:
			return {
				...state,
				loading: true,
				error: null
			}
		
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				loading: false,
				message: action.payload
			}
		
		case NEW_PASSWORD_SUCCESS:
			return {
				...state,
				success: action.payload
			}

		case FORGOT_PASSWORD_FAIL:
		case NEW_PASSWORD_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};	

			default:
				return state;
	}
}


//all users admin
export const allUserReducer = (state = {users: []}, action) => {
	switch (action.type) {
		case ALL_USERS_REQUEST:
			return {
				loading: true,
			}
		
		case ALL_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload.users
			}

		case ALL_USERS_FAIL:
			return {
				loading: false,
                error: action.payload
			}

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};	

			default:
				return state;
	}
}

//get order details
export const getUsersDetailsReducer = (state = {user: {}}, action) => {
    switch(action.type) {
        case USERS_DETAILS_REQUEST:
            return {
                loading: true,
            }
        
        case USERS_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload
            }

        case USERS_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }

}


export const UpdateUserReducer = (state = {}, action) => {
    switch(action.type) {

        case DELETE_USERS_REQUEST:
		case UPDATE_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: true
            }

		case UPDATE_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true
            }

        case DELETE_USERS_FAIL:
		case UPDATE_USERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case DELETE_USERS_RESET:
            return {
                ...state,
                isDeleted: false
            }

		case UPDATE_USERS_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}