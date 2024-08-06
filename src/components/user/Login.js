import React, { useEffect, useState } from "react";
import "./user.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { login, clearErrors } from "../../actions/userAction";
import googleIcon from "../../assets/images/google_icon.png";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const alert = useAlert();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(login(email, password));
	};

	const { loading, error, isAuthenticated } = useSelector(
		(state) => state.auth,
	);

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
			alert.success("Logged In successful");
		}

		if (error) {
			alert.error(error)
			dispatch(clearErrors());
		}
	}, [alert, dispatch, error, isAuthenticated, navigate]);


	return (
		<div className="login">
			<div className="loginForm">
				<div className="logText">
					<div className="head">Log in</div>
					<div className="toe">
						Enter your credentials to access your account.
					</div>
				</div>
				<div className="google">
					<img
						src={googleIcon}
						alt="gg"
					/>
					<div>Log in with Google</div>
				</div>
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
								{/* <ErrorMessage
									name="email"
									component="div"
									className="errorMsg"
								/> */}
							</div>
						</div>

						<div className="space emailSpace">
							<div className="nas">
								<div className="nameAs">
									<label htmlFor="name_field">Password</label>
									<div className="as">*</div>
								</div>
								<div>
									<Link className="forgotPass" to="/password/forgot">Forgot Password ?</Link>
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
								{/* <ErrorMessage
									name="password"
									component="div"
									className="errorMsg"
								/> */}
							</div>
						</div>

						<div className="errorMsg">
							{error}
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
								disabled={loading ? true : false}
							>
								Log in
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
				<div>IMAGE</div>
			</div>
		</div>
	);
};

export default Login;
