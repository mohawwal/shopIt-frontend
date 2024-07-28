import React from 'react'
import './signOutAlert.css'
import { Link } from 'react-router-dom'
import logOutIcon from '../../../assets/images/logOut.png'

const SignOutAlert = ({ logoutToggle, logoutFunc, logOutHandler, handleNav }) => {

  return (
    <div className={logoutToggle ? "signOutAlert" : "noLogout"}>
    <div className='logOut'>
      <div className='logoutImg'>
        <img src={logOutIcon} alt="logOutIcon" />
      </div>
      <div className='logoutDetails'>
        <h4>Logout</h4>
        <p>Are you sure you want to logout ?</p>
      </div>
      <div className='logoutBtn'>
        <div className='cancel' onClick={() => {logoutFunc(); handleNav()}} >Cancel</div>
        <div className='out' onClick={() => {logOutHandler(); logoutFunc(); handleNav()}}><Link to="/">Logout</Link></div>
      </div>
    </div>
    </div>
  )
}

export default SignOutAlert
