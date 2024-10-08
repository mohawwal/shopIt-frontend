import React, { useEffect, useState, useContext } from "react";
import "./user.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { login, clearErrors } from "../../actions/userAction";
// import googleIcon from "../../assets/images/google_icon.png";
import AlertContext from "../alert/AlertContext";
//import bgImg from '../../assets/images/bg/bg6.jpg'

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formSubmitted, setFormSubmitted] = useState(false)

	const submitHandler = (e) => {
		e.preventDefault();
		setFormSubmitted(true)
		dispatch(login(email, password));
	};

	const { loading, error, isAuthenticated } = useSelector(
		(state) => state.auth,
	);


	useEffect(() => {
		if (formSubmitted && isAuthenticated) {
			navigate("/");
			showAlert("LogIn successful", "success");
		}

		if (formSubmitted && error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}
	}, [dispatch, error, navigate, isAuthenticated]);


	return (
		<div className="login">
			<div className="loginForm">
				<div className="logText">
					<div className="head">Log in</div>
					<div className="toe">
						Enter your credentials to access your account.
					</div>
					{/* <div className="errorMsg">{error}</div> */}
				</div>
				{/*  <div className="google">
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
				<div className="formLog">
					<form
						onSubmit={submitHandler}
						encType="multipart/form-data"
					>
						<div className="space emailSpace">
							<div className="nameAs">
								<label htmlFor="name_field">Email</label>
								<div className="as">*</div>
							</div>
							<div className="inputField">
								<input
									className="emailLogin"
									type="email"
									placeholder="name@company.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						<div className="space emailSpace">
							<div className="nas">
								<div className="nameAs">
									<label htmlFor="name_field">Password</label>
									<div className="as">*</div>
								</div>
								<div>
									<Link
										className="forgotPass"
										to="/password/forgot"
									>
										Forgot Password ?
									</Link>
								</div>
							</div>
							<div className="inputField">
								<input
									className="passwordLogin"
									type="password"
									placeholder="name1234."
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div className="remember">
							<input
								type="checkbox"
								name="Remember"
							/>
							<div>Remember information</div>
						</div>

						<div className="btnPss">
							<button
								type="submit"
								disabled={loading && formSubmitted ? true : false}
							>
								{loading && formSubmitted ? (
									<ClipLoader
										color={"white"}
										loading={true}
										size={20}
									/>
								) : (
									<p>Login</p>
								)}
							</button>
						</div>
					</form>
				</div>
				<div className="signLogFolder">
					<span>Not a member?</span>
					<Link
						to="/register"
						className="SignLog"
					>
						Sign up
					</Link>
				</div>
			</div>
			<div className="showCover">
			<img src="https://res.cloudinary.com/dqhbcpiul/image/upload/v1727398514/bg6_q9cck0.jpg" alt="" />
			</div>
		</div>
	);
};

export default Login;
