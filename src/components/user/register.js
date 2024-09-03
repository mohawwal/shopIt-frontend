import React, { useEffect, useState, Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import * as Yup from "yup";
import { Field, ErrorMessage, useFormik, FormikProvider } from "formik";
import avatarPrev from "../../assets/images/avatarPreview.png";
import googleIcon from "../../assets/images/google_icon.png";
import AlertContext from "../alert/AlertContext";
import "./user.css";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	//const alert = useAlert();

	const [, setAlert] = useContext(AlertContext)

	const showAlert = (message, type) => {
		setAlert({
			message,
			type
		})
	}

	const { loading, isAuthenticated, error } = useSelector(
		(state) => state.auth,
	);

	useEffect(() => {
		if (error) {
			dispatch(clearErrors());
			showAlert(error, 'error')
		}

		if (isAuthenticated) {
			navigate("/");
			showAlert("User Registration Successful", 'success')
		}
	}, [dispatch, error, isAuthenticated, navigate]);

	const [selectedAvatar, setSelectedAvatar] = useState(null);
	const [previewImage, setPreviewImage] = useState(avatarPrev);

	const initialValue = {
		name: "",
		email: "",
		password: "",
	};

	const [user, setUser] = useState(initialValue);

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
		initialValues: initialValue,
		validationSchema: validationSchema,
		validateOnBlur: true,
		onSubmit: (values) => {
			let formData = new FormData();

			formData.append("name", values.name);
			formData.append("email", values.email);
			formData.append("password", values.password);

			if (selectedAvatar) {
				formData.append("avatar", selectedAvatar);
			}

			dispatch(register(formData));
		},
	});

	const handleFileChange = (e) => {
		if (e.target.name === "avatar") {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setPreviewImage(reader.result);
					setSelectedAvatar(reader.result);
				}
			};

			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: [e.target.value] });
		}
	};

	return (
		<Fragment>
			<div className="login">
				<div className="loginForm">
					<div className="logText">
						<div className="avatarReg">
							{
								<div className="ari">
									<img
										src={previewImage}
										alt="chosen"
										style={{ height: "150px", width: "150px" }}
									/>
								</div>
							}
						</div>
						<div className="head">Register</div>
						<div className="toe">
							Enter your credentials to access your account.
						</div>
					</div>
					{/* <div className="google">
						<img
							src={googleIcon}
							alt="gg"
						/>
						<div>Log in with Google</div>
					</div> */}
					<div className="orLine">
						<div className="line"></div>
						<div className="or">or</div>
						<div className="line"></div>
					</div>
					<FormikProvider
						value={formik}
						className="formLog"
					>
						<form
							onSubmit={formik.handleSubmit}
							encType="multipart/form-data"
						>
							<div className="space emailSpace">
								<div className="nameAs">
									<label htmlFor="name_field">Name</label>
									<div className="as">*</div>
								</div>
								<div className="inputField">
									<Field
										type="name"
										name="name"
										placeholder="name"
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

							<div className="space emailSpace">
								<div className="nameAs">
									<label htmlFor="name_field">Email</label>
									<div className="as">*</div>
								</div>
								<div className="inputField">
									<Field
										type="email"
										placeholder="name@company.com"
										name="email"
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

							<div className="space emailSpace">
								<div className="nameAs">
									<label htmlFor="name_field">Password</label>
									<div className="as">*</div>
								</div>
								<div className="inputField">
									<Field
										type="password"
										placeholder="Name123."
										name="password"
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

							<div className="avatarRegPick">
								<label htmlFor="avatar_upload" className="cln">Choose Avatar</label>
								<input
									type="file"
									name="avatar"
									accept="image/*"
									onChange={(e) => {
										setSelectedAvatar(e.currentTarget.files[0]);
										formik.setFieldValue("avatar", e.currentTarget.files[0]);
										handleFileChange(e);
									}}
								/>
							</div>

							<div className="btnPss">
								<button
									disabled={loading ? true : false}
									type="submit"
								>
									{loading ? <ClipLoader
										color={"white"}
										loading={true}
										size={20}
									/> : <div>SIGN UP</div>}
								</button>
							</div>
						</form>
					</FormikProvider>
				</div>
				<div className="showCover">
					<div>IMAGE</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Register;
