import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import * as Yup from "yup";
import { useFormik, FormikProvider, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const Navigate = useNavigate();
	const { token } = useParams();

	const { loading, error, success } = useSelector(
		(state) => state.forgotPassword,
	);

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			alert.success("Password updated successfully");
			Navigate("/login");
		}
	}, [Navigate, alert, dispatch, error, success]);

	const validationSchema = Yup.object().shape({
		confirmPassword: Yup.string()
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
			password: "",
			confirmPassword: "",
		},
		validateOnBlur: true,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const formData = new FormData();
			formData.append("password", values.password);
			formData.append("confirmPassword", values.confirmPassword);

			dispatch(resetPassword(`${token}`, formData));
		},
	});

	return (
		<div>
			<FormikProvider
				value={formik}
				className="profile"
			>
				<form
					onSubmit={formik.handleSubmit}
					encType="application/json"
				>
					<div className="space emailSpace">
						<div>reset password</div>
						<div>
							<div className="nameAs">
								<label htmlFor="name_field">Password</label>
								<div className="as">*</div>
							</div>
							<div className="inputField">
								<Field
									type="password"
									name="password"
									placeholder="Enter Password"
									className="field"
									value={formik.values.password}
									onChange={formik.handleChange}
								/>
							</div>
						</div>
						<div>
							<div className="nameAs">
								<label htmlFor="name_field">Confirm Password</label>
								<div className="as">*</div>
							</div>
							<div className="inputField">
								<Field
									type="password"
									name="confirmPassword"
									placeholder="Confirm Password"
									className="field"
									value={formik.values.confirmPassword}
									onChange={formik.handleChange}
								/>
								<ErrorMessage
										name="confirmPassword"
										component="div"
										className="errorMsg"
									/>
							</div>
						</div>
						<button
							type="submit"
							disabled={loading ? true : false}
						>
							Enter
						</button>
					</div>
				</form>
			</FormikProvider>
		</div>
	);
};

export default ResetPassword;
