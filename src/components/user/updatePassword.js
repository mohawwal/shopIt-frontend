import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PASSWORD_RESET } from "../constants/userConstants";

import { updatePassword, clearErrors } from "../../actions/userAction";
import { useFormik, Field, FormikProvider, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import ViewHide from "../../assets/svg/viewHide";
import ViewShow from "../../assets/svg/viewShow";
import ArrowLeft from "../../assets/svg/arrowLeft"
import AlertContext from "../alert/AlertContext";

const UpdatePassword = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [, setAlert] = useContext(AlertContext)

	const showAlert = (message, type) => {
		setAlert({
			message,
			type
		})
	}

	const { error, isUpdated, loading } = useSelector((state) => state.user);

	useEffect(() => {
		if (error) {
			showAlert(error, 'error')
			dispatch(clearErrors());
		}

		if (isUpdated) {
			showAlert("Password Changed Successfully", 'success')
			navigate("/me");
		}

		dispatch({
			type: UPDATE_PASSWORD_RESET,
		});
	}, [navigate, dispatch, error, isUpdated]);

	const validationSchema = Yup.object().shape({
		oldPassword: Yup.string().required("Old password is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters long")
			.matches(/(?=.*\d)/, "Password must contain one numeric digit")
			.matches(/(?=.*[a-z])/i, "Password must contain one lowercase letter")
			.matches(/(?=.*[A-Z])/i, "Password must contain one uppercase letter")
			.matches(
				/(?=.*[@$!%*?&.])/i,
				"Password must contain one special character",
			)
			.required("Password is required"),
	});

	const formik = useFormik({
		initialValues: {
			oldPassword: "",
			showOldPassword: false,
			password: "",
			showNewPassword: false,
		},

		validationSchema: validationSchema,

		onSubmit: (values) => {
			const formData = new FormData();
			formData.append("oldPassword", values.oldPassword);
			formData.append("password", values.password);

			dispatch(updatePassword(formData));
		},
	});

	return (
		<FormikProvider value={formik}>
			<div className="upPassword">
				<form
					onSubmit={formik.handleSubmit}
					encType="multipart/form-data"
				>
					<div className="pass">
						<div
									className="profileStart editPStart"
									onClick={() => navigate(-1)}
								>
									<div>
										<ArrowLeft className="icons aLI" />
									</div>
									<div className="head">Change Password</div>
								</div>
						{/* Old Password Input */}
						<div className="passFolder">
							<label htmlFor="oldPassword">Old Password</label>
							<div className="passFieldFolder">
								<div className="passField">
									<Field
										id="oldPassword"
										name="oldPassword"
										type={formik.values.showOldPassword ? "text" : "password"}
										onChange={formik.handleChange}
										value={formik.values.oldPassword}
									/>
									<button
										type="button"
										onClick={() =>
											formik.setFieldValue(
												"showOldPassword",
												!formik.values.showOldPassword,
											)
										}
									>
										{formik.values.showOldPassword ? <ViewHide className='icons'/> : <ViewShow className='icons' />}
									</button>
								</div>
							</div>
							<ErrorMessage
								name="oldPassword"
								component="div"
								className="errorMsg"
							/>
						</div>

						{/* New Password Input */}
						<div className="passFolder">
							<label htmlFor="newPassword">New Password</label>
							<div className="passFieldFolder">
								<div className="passField">
									<Field
										id="newPassword"
										name="password"
										type={formik.values.showNewPassword ? "text" : "password"}
										onChange={formik.handleChange}
										value={formik.values.password}
									/>
									<button
										type="button"
										onClick={() =>
											formik.setFieldValue(
												"showNewPassword",
												!formik.values.showNewPassword,
											)
										}
									>
										{formik.values.showNewPassword ? <ViewHide className='icons'/> : <ViewShow className='icons' />}
									</button>
								</div>
							</div>
							<ErrorMessage
								name="password"
								component="div"
								className="errorMsg"
							/>
						</div>

						<div className="btnPss">
							<button
								type="submit"
								disabled={loading ? true : false}
							>
								Reset Password
							</button>
						</div>
					</div>
				</form>
			</div>
		</FormikProvider>
	);
};

export default UpdatePassword;
