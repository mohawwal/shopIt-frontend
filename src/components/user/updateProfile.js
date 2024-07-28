import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { useFormik, FormikProvider, Field } from "formik";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import avatarPrev from "../../assets/images/avatarPreview.png";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, loadUser, clearErrors } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../constants/userConstants";

const UpdateProfile = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	const { error, isUpdated, loading } = useSelector((state) => state.user);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [selectedAvatar, setSelectedAvatar] = useState(null);
	const [previewImage, setPreviewImage] = useState(avatarPrev);

	useEffect(() => {
		if (user) {
			setName(user.name);
			setEmail(user.email);
			setPreviewImage(
				user.avatar ? user.avatar.url : avatarPrev,
			);
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success("Update Successful");
			dispatch(loadUser());
			navigate("/me");
			dispatch({ type: UPDATE_PROFILE_RESET });
		}
	}, [navigate, alert, dispatch, error, isUpdated, user]);

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
					<div>
						<img
							src={previewImage}
							alt="chosen"
							style={{ height: "100px", width: "100px" }}
						/>
					</div>
					<div>
						<label htmlFor="avatar_upload">Choose Avatar</label>
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

					<h2>Update Profile</h2>

					<div>
						<label htmlFor="name_field">Name</label>
						<Field name="name" />
					</div>

					<div>
						<label htmlFor="email_field">Email</label>
						<Field name="email" />
					</div>

					<button
						disabled={loading ? true : false}
						type="submit"
					>
						Update
					</button>
				</form>
			</FormikProvider>
		</Fragment>
	);
};

export default UpdateProfile;
