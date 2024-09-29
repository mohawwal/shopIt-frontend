import {
	UPLOAD_FILE_REQUEST,
	UPLOAD_FILE_SUCCESS,
	UPLOAD_FILE_FAIL,
	CLEAR_ERRORS,
} from "../constants/uploadConstants";

export const uploadReducer = (
	state = { file: {}, category: "" },
	action,
) => {
	switch (action.type) {
		case UPLOAD_FILE_REQUEST:
			return {
				loading: true,
                file: null
			};

		case UPLOAD_FILE_SUCCESS:
			return {
				loading: false,
                file: action.payload
			};

		case UPLOAD_FILE_FAIL:
			return {
				loading: false,
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
