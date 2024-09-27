import React, { Fragment, useEffect, useState, useContext } from "react";
import MetaData from "../layouts/MetaData";
import { useFormik, FormikProvider, Field } from "formik";

import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import avatarPrev from "../../assets/images/avatarPreview.png";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, loadUser, clearErrors } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";
import ArrowLeft from "../../assets/svg/arrowLeft";
import AlertContext from "../alert/AlertContext";

const UpdateProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const { user } = useSelector((state) => state.auth);
	const { error, isUpdated, loading } = useSelector((state) => state.user);

	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [selectedAvatar, setSelectedAvatar] = useState(null);
	const [previewImage, setPreviewImage] = useState(avatarPrev);

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setPreviewImage(user.avatar ? user.avatar.url : avatarPrev);
		}

		if (error) {
			showAlert(error, "error");
			dispatch(clearErrors());
		}

		if (isUpdated) {
			showAlert("Update Successful", "success");
			dispatch(loadUser());
			
		}
		return () => {
			dispatch({ type: UPDATE_PROFILE_RESET });
		}
	}, [navigate, dispatch, error, isUpdated, user]);

	const formik = useFormik({
		initialValues: {
			name: name,
			email: email,
		},

		onSubmit: (values) => {
			let formData = new FormData();
			formData.append("name", values.name);
			formData.append("email", values.email);

			if (selectedAvatar) {
				formData.append("avatar", selectedAvatar);
			}
			dispatch(updateProfile(formData));
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
		}
	};

	return (
		<Fragment>
			<MetaData title={"Update Profile"} />
			<FormikProvider value={formik}>
				<form
					onSubmit={formik.handleSubmit}
					encType="multipart/form-data"
				>
					<div className="profile">
						<div className="profileBox">
							<div className="profileForm">
								<div
									className="profileStart editPStart"
									onClick={() => navigate(-1)}
								>
									<div>
										<ArrowLeft className="icons aLI" />
									</div>
									<div className="head">Edit Profile</div>
								</div>
								<div className="profileSection editPS">
									<div>
										<img
											src={previewImage}
											alt="chosen"
											style={{ height: "100px", width: "100px" }}
										/>
									</div>
									<div className="editCA">
										<label htmlFor="avatar_upload">Choose Avatar</label>
										<input
											type="file"
											name="avatar"
											accept="image/*"
											onChange={(e) => {
												setSelectedAvatar(e.currentTarget.files[0]);
												formik.setFieldValue(
													"avatar",
													e.currentTarget.files[0],
												);
												handleFileChange(e);
											}}
										/>
									</div>
								</div>

								<div className="profileLog editPL">
									<div className="profileDetailsLog">
										<div className="editLog">
											<label htmlFor="name_field">Name</label>
											<Field
												className="fieldEdit"
												name="name"
											/>
										</div>
										<div className="editLog">
											<label htmlFor="email_field">Email</label>
											<Field
												className="fieldEdit"
												name="email"
											/>
										</div>
									</div>
									<div className="editBtn">
										<button
											disabled={loading ? true : false}
											type="submit"
										>
											{loading ? (
												<ClipLoader
													color={"white"}
													loading={true}
													size={20}
												/>
											) : (
												<div>Update</div>
											)}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</FormikProvider>
		</Fragment>
	);
};

export default UpdateProfile;
