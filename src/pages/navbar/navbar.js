import React from 'react'
import SearchIcon from '../../assets/svg/Search'
import CartIcon from '../../assets/svg/cart'
import Hamburger from '../../assets/svg/hamburger'

const navbar = () => {
  return (
    <div className='navbar'>

      <div className='navText'>
        <h3>ZARMARIO</h3>
      </div>

      <div className='navList'>
        <ul>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Shoes</li>
            <li>Caps</li>
        </ul>
      </div>

      <div className='navDetails'>
        <SearchIcon className="icons search_icon"/>
        <div className='cart'>
            <CartIcon className="cartIcon"/>
            <span className='cartNumb'>2</span>
        </div>
        <Hamburger className="Hamburger_icon"/>
      </div>

      <div className='burger'>
      <div>
        <SearchIcon className="icons search_icon"/>
      </div>
      <div>
        <ul>
            <li>Men</li>
            <li>Women</li>
            <li>Kids</li>
            <li>Shoes</li>
            <li>Caps</li>
        </ul>
      </div>
      <div>
        <p>Sign In</p>
      </div>
      </div>
    </div>
  )
}

export default navbar
