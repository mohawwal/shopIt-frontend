import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useAlert } from "react-alert";
import { forgetPassword, clearErrors } from "../../actions/userAction";
import { useFormik, FormikProvider, Field } from "formik";

const ForgotPassword = () => {
	const dispatch = useDispatch();
	//const alert = useAlert();


	const { message, error, loading } = useSelector((state) => state.forgotPassword);

	useEffect(() => {
		if (error) {
			//alert.error(error);
			dispatch(clearErrors());
		}

		if (message) {
			//alert.success(message);
		}
	}, [dispatch, error, message]);

	const formik = useFormik({
		initialValues: {
			email: "",
		},

		onSubmit: (values) => {
			let formData = new FormData();
			formData.append("email", values.email);

			dispatch(forgetPassword(formData));
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
						<div className="fpHead">Forget Password</div>
						<div className="nameAs">
							<label htmlFor="name_field">Email</label>
							<div className="as">*</div>
						</div>
						<div className="inputField">
							<Field
								type="email"
								name="email"
								placeholder="Enter Email"
								className="field"
								value={formik.values.email}
								onChange={formik.handleChange}
							/>
						</div>
            			<button className="fpButton" type="submit" disabled={loading ? true : false}>Send email</button>
					</div>
				</form>
			</FormikProvider>
		</div>
	);
};

export default ForgotPassword;
