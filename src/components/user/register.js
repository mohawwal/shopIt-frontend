import React, { useEffect, useState, Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import * as Yup from "yup";
import { Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import avatarPrev from "../../assets/images/avatarPreview.png";
import AlertContext from "../alert/AlertContext";
import "./user.css";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [, setAlert] = useContext(AlertContext);

	const { loading, isAuthenticated, error } = useSelector((state) => state.auth);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type
		});
	};

	useEffect(() => {
		if (error) {
			dispatch(clearErrors());
			showAlert(error, 'error');
		}

		if (isAuthenticated) {
			navigate("/");
			showAlert("User Registration Successful", 'success');
		}
	}, [dispatch, error, isAuthenticated, navigate]);

	const [selectedAvatar, setSelectedAvatar] = useState(null);
	const [previewImage, setPreviewImage] = useState(avatarPrev);

	// Formik Initial Values
	const initialValue = {
		name: "",
		email: "",
		password: "",
	};

	// Form Validation Schema with Yup
	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(3, "Name must be at least 3 characters long")
			.max(20, "Name cannot exceed 20 characters")
			.required("Name is required"),
		email: Yup.string()
			.email("Invalid email format")
			.required("Email is required"),
		password: Yup.string()
			.min(8, "Password must be at least 8 characters long")
			.matches(/(?=.*\d)/, "Password must contain at least one digit")
			.matches(/(?=.*[a-z])/i, "Password must contain at least one lowercase letter")
			.matches(/(?=.*[A-Z])/i, "Password must contain at least one uppercase letter")
			.matches(/(?=.*[@$!%*?&.])/i, "Password must contain one special character")
			.required("Password is required"),
	});

	// Formik Setup
	const formik = useFormik({
		initialValues: initialValue,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const formData = new FormData();

			formData.append("name", values.name);
			formData.append("email", values.email);
			formData.append("password", values.password);

			if (selectedAvatar) {
				formData.append("avatar", selectedAvatar);
			}

			dispatch(register(formData));
		},
	});

	// Handle Avatar Change and Preview
	const handleAvatarChange = (e) => {
		const file = e.currentTarget.files[0];
		if (file) {
			setSelectedAvatar(file);
			setPreviewImage(URL.createObjectURL(file)); // Preview the selected image
			formik.setFieldValue("avatar", file); // Set the file in Formik's form data
		}
	};

	return (
		<Fragment>
			<div className="login">
				<div className="loginForm">
					<div className="logText">
						<div className="avatarReg">
							<div className="ari">
								<img
									src={previewImage}
									alt="Avatar Preview"
									style={{ height: "150px", width: "150px" }}
								/>
							</div>
						</div>
						<div className="head">Register</div>
						<div className="toe">
							Enter your credentials to access your account.
						</div>
					</div>

					<div className="orLine">
						<div className="line"></div>
						<div className="or">or</div>
						<div className="line"></div>
					</div>

					<FormikProvider value={formik}>
						<form
							onSubmit={formik.handleSubmit}
							encType="multipart/form-data"
						>
							{/* Name Field */}
							<div className="space emailSpace">
								<div className="nameAs">
									<label htmlFor="name_field">Name</label>
									<div className="as">*</div>
								</div>
								<div className="inputField">
									<Field
										type="text"
										name="name"
										placeholder="Your Name"
										className="field"
										value={formik.values.name}
										onChange={formik.handleChange}
									/>
									<ErrorMessage
										name="name"
										component="div"
										className="errorMsg"
									/>
								</div>
							</div>

							{/* Email Field */}
							<div className="space emailSpace">
								<div className="nameAs">
									<label htmlFor="email_field">Email</label>
									<div className="as">*</div>
								</div>
								<div className="inputField">
									<Field
										type="email"
										name="email"
										placeholder="name@company.com"
										className="field"
										value={formik.values.email}
										onChange={formik.handleChange}
									/>
									<ErrorMessage
										name="email"
										component="div"
										className="errorMsg"
									/>
								</div>
							</div>

							{/* Password Field */}
							<div className="space emailSpace">
								<div className="nameAs">
									<label htmlFor="password_field">Password</label>
									<div className="as">*</div>
								</div>
								<div className="inputField">
									<Field
										type="password"
										name="password"
										placeholder="Password123!"
										className="field"
										value={formik.values.password}
										onChange={formik.handleChange}
									/>
									<ErrorMessage
										name="password"
										component="div"
										className="errorMsg"
									/>
								</div>
							</div>

							{/* Avatar Upload */}
							<div className="avatarRegPick">
								<label htmlFor="avatar_upload" className="cln">Choose Avatar</label>
								<input
									type="file"
									name="avatar"
									accept="image/*"
									onChange={handleAvatarChange}
								/>
							</div>

							{/* Submit Button */}
							<div className="btnPss">
								<button
									disabled={loading}
									type="submit"
								>
									{loading ? <ClipLoader color={"white"} size={20} /> : <div>SIGN UP</div>}
								</button>
							</div>
						</form>
					</FormikProvider>
				</div>
				<div className="showCover">
					<img
						src="https://res.cloudinary.com/dqhbcpiul/image/upload/v1727398514/bg6_q9cck0.jpg"
						alt="Background"
					/>
				</div>
			</div>
		</Fragment>
	);
};

export default Register;
