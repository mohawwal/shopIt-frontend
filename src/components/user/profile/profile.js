import "./profile.css";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../../pages/loader/loader";
import ArrowLeft from "../../../assets/svg/arrowLeft";
import EditIcon from "../../../assets/svg/edit";
import GreaterThan from "../../../assets/svg/greaterThan";
import Logout from "../../../assets/svg/logout";
import Bin from "../../../assets/svg/bin";
import ChangePassword from "../../../assets/svg/chnagePassword";
import Pen from "../../../assets/svg/pen";
import { logOut } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import AlertContext from "../../alert/AlertContext";

const Profile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

	const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
	console.log(user)

	const signOutFromProfile = () => {
		dispatch(logOut());
		showAlert("sign out successfully", "success");
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="profile">
			<div className="profileBox">
				<div className="profileForm">
					<div
						className="profileStart"
						onClick={() => navigate(-1)}
					>
						<div>
							<ArrowLeft className="icons aLI" />
						</div>
						<div className="head">Profile Details</div>
					</div>
					<div className="profileSection">
						{isAuthenticated && user && user.avatar?.url ? (
							<div>
								<img
									src={user && user.avatar.url}
									alt="avatar"
								/>
								<Link
									to="/me/Update"
									className="imgPen"
								>
									<Pen className="icons editIcon" />
								</Link>
							</div>
						) : isAuthenticated && user && !user.avatar?.url && (
							<div>
								<p>add profile picture</p>{" "}
								<Link
									to="/me/Update"
									className="imgPen"
								>
									<Pen className="icons editIcon" />
								</Link>
							</div>
						)}
					</div>
					<div className="profileLog">
						<div className="profileDetailsLog">
							<div className="detailLog">
								<div>
									<div>Account name</div>
									<span>{user && user.name}</span>
								</div>
								<Link to="/me/Update">
									<EditIcon className="icons editIcon" />
								</Link>
							</div>
							<div className="detailLog">
								<div>
									<div>Email address</div>
									<span>{user && user.email}</span>
								</div>
								<Link to="/me/Update">
									<EditIcon className="icons editIcon" />
								</Link>
							</div>
							{/* <div className="detailLog">
								<div>
									<div>User Role</div>
									<span>{user ? user.role.toUpperCase() : ''}</span>
								</div>
							</div> */}
							{user && (
								<Link
									to="/orders/me"
									className="detailLog"
								>
									<div className="boldTxt">My Orders</div>
								</Link>
							)}
							{user && user.role === "user" ? (
								<div className="detailLog">
									<div>
										<div>Joined</div>
										<span>{user && user.createdAt.substring(0, 10)}</span>
									</div>
								</div>
							) :  (
								<Link to='/dashboard' className="detailLog">
									<div className="boldTxt">Dashboard</div>
								</Link>
							)}
						</div>
						<div className="orLine pLine">
							<div className="line"></div>
							<div className="orText"> Zarmario </div>
							<div className="line"></div>
						</div>
						<div className="profileSignLog">
							<div
								className="signSpace"
								onClick={signOutFromProfile}
							>
								<div>
									<span>
										<Logout className="icons signOutIcon" />
									</span>
									<span>Sign Out</span>
								</div>
								<span>
									<GreaterThan className="icons gTI" />
								</span>
							</div>
							<Link
								to="/password/Update"
								className="signSpace"
							>
								<div>
									<span>
										<ChangePassword className="icons signOutIcon" />
									</span>
									<span>Change password</span>
								</div>
								<span>
									<GreaterThan className="icons gTI" />
								</span>
							</Link>
							<div className="signSpace">
								<div>
									<span>
										<Bin className="icons binIcon" />
									</span>
									<span>Delete account</span>
								</div>
								<span>
									<GreaterThan className="icons gTI" />
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
