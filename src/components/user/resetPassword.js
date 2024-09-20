import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/userAction";
import AlertContext from "../alert/AlertContext";
import * as Yup from "yup";
import { useFormik, FormikProvider, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const ResetPassword = () => {
	const dispatch = useDispatch();
	const Navigate = useNavigate();
	const { token } = useParams();

	const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const { loading, error, success } = useSelector(
		(state) => state.forgotPassword,
	);

	useEffect(() => {
		if (error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}

		if (success) {
			showAlert("Password updated successfully", "success");
			Navigate("/login");
		}
	}, [Navigate, dispatch, error, success]);

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
		<div className="forgetPassword">
			<FormikProvider
				value={formik}
				className="profile"
			>
				<form
					onSubmit={formik.handleSubmit}
					encType="application/json"
				>
					<div className="space emailSpace">
						<h3 style={{margin: "30px 0"}}>Reset password</h3>
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
							className="fpButton"
							type="submit"
							disabled={loading ? true : false}
						>
							{loading ? (
								<ClipLoader
									color={"white"}
									loading={true}
									size={20}
								/>
							) : (
								"Enter"
							)}
						</button>
					</div>
				</form>
			</FormikProvider>
		</div>
	);
};

export default ResetPassword;
