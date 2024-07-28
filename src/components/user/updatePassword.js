import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants";
import { useAlert } from "react-alert";
import { updatePassword, clearErrors } from "../../actions/userAction";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password Changed Successfully");
            navigate("/me");
        }

        dispatch({
            type: UPDATE_PASSWORD_RESET,
        });
    }, [navigate, alert, dispatch, error, isUpdated]);

    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            showOldPassword: false,
            password: "", 
            showNewPassword: false,
        },

        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("oldPassword", values.oldPassword);
            formData.append("password", values.password); 

            dispatch(updatePassword(formData));
        }
    });

    return (
        <div className="profile">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                {/* Old Password Input */}
                <div className="space emailSpace">
                    <label htmlFor="oldPassword">Old Password</label>
					<div className="inputField">
                    <input
                        id="oldPassword"
                        name="oldPassword"
                        type={formik.values.showOldPassword ? "text" : "password"}
                        onChange={formik.handleChange}
                        value={formik.values.oldPassword}
                    />
					</div>
                    <button type="button" onClick={() => formik.setFieldValue("showOldPassword", !formik.values.showOldPassword)}>
                        {formik.values.showOldPassword ? "Hide" : "Show"}
                    </button>
                </div>

                {/* New Password Input */}
                <div className="space emailSpace">
                    <label htmlFor="newPassword">New Password</label>
					<div className="inputField">
                    <input
                        id="newPassword"
                        name="password"
                        type={formik.values.showNewPassword ? "text" : "password"}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
					</div>
                    <button type="button" onClick={() => formik.setFieldValue("showNewPassword", !formik.values.showNewPassword)}>
                        {formik.values.showNewPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <div className="btnPss">
                    <button type="submit" disabled={loading ? true : false}>
                        Reset Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdatePassword;
