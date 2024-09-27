import React, { useEffect, useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getUserDetails, clearErrors } from '../../../actions/userAction'
import { useDispatch, useSelector } from "react-redux"
import AlertContext from "../../alert/AlertContext";
import Loader from "../../../pages/loader/loader";
import { UpdateUser } from '../../../actions/userAction';
import { DELETE_USERS_RESET, UPDATE_USERS_RESET } from '../../constants/userConstants';
import { deleteUser } from '../../../actions/userAction';
import './UpdateUser.css'
import UTurn from '../../../assets/svg/UTurn';

const UpdateUsers = () => {
  const {userId} = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [, setAlert] = useContext(AlertContext);

	const showAlert = (message, type) => {
		setAlert({
			message,
			type,
		});
	};

  const {user, loading, error} = useSelector(state => state.getUsersDetails)
  const {isUpdated, isDeleted} = useSelector(state => state.UpdateUser)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  
  useEffect(() => {
    dispatch(getUserDetails(userId))

    if(error) {
      showAlert(error, "error")
      dispatch(clearErrors())
    }

    if(isUpdated) {
      showAlert("user data updated successfully", "success")
      dispatch({ type: UPDATE_USERS_RESET })
    }

    if(isDeleted) {
      showAlert("user deleted successfully", "success")
      navigate("/admin/users")
      dispatch({ type: DELETE_USERS_RESET })
    }
    
  },[dispatch, error, isDeleted, isUpdated, navigate, userId])

  const updateUserHandler = (id) => {

    const formData = new FormData()
    formData.set('name', name)
    formData.set('email', email)
    formData.set('role', role)

    dispatch(UpdateUser(id, formData))
  }

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }

  if(loading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="newProduct">
      <div
						className="backArrowPD"
						onClick={() => navigate(-1)}
					>
						<UTurn className="icons aLI" fill="rgba(116, 106, 224, 0.948)" />
						<span>Back</span>
					</div>
      <div className='UpdateUser'>
      <div>
        <b>#{user && user._id}</b>
        <div className='uUPP'>
          <img src={user && user.avatar && user.avatar.url} alt="" />
        </div>
        <div>
          <div>Name: <b>{user && user.name}</b></div>
          <div>Email: <b>{user && user.email}</b></div>
          <div>Role: <b>{user && user.role}</b></div>
          {/* <div>Joined: <b></b></div> */}
        </div>
      </div>
      <div className='uUR'>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="role">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>
          <button onClick={() => updateUserHandler(user && user._id)}>Update User Details</button>
        </div>
        <div>
          <button onClick={() => deleteUserHandler(user && user._id)}>Delete User</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default UpdateUsers
