import React from 'react'
import './navCategory.css'
import { categories } from '../../components/data/categories'
import { useNavigate, useParams } from 'react-router-dom'
import ArrowRight from '../../assets/svg/arrowRight'
import ArrowLeft from '../../assets/svg/arrowLeft'
import { Link } from 'react-router-dom'
import MetaData from '../../components/layouts/MetaData'

const NavCategory = () => {
  const { catId } = useParams()
  const navigate = useNavigate()

  const category = categories.find(cat => cat.id === catId)


  return (
    <div className='fullNav fullNav2' >
      <MetaData title="Zarmario product categories"/>
        <div className='blurNav blurNav2'></div>
        <div className='navBurger navBurger2'>
          <div className='navBack' onClick={() => navigate(-1)}>
            <ArrowLeft className="icons arrowIcon"/>
            <p>Back</p>
          </div>
          <div className='burgerList burgerList2'>
            <div className='imagesShowNav'>
              <img src={category.image} alt="" />
            </div>
          <ul className='productLi'>
            {category.items.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={`/product/category/${category.title}_${item}`} className='linkList'>
                    <div><p>{item}</p></div>
                    <div><ArrowRight className="icons arrowIcon"/></div>
                  </Link>
                </li>
              )
            })}
          </ul>
          </div>
        </div>
    </div>
  )
}

export default NavCategory

