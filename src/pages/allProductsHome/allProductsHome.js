import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getAllProducts } from '../../actions/productActions'
import Loader from '../../pages/loader/loader'
import './allProductsHome.css'
import homePix from '../../assets/images/image1.jpg'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { BsCart4 } from "react-icons/bs";

const AllProductsHome = () => {
    const dispatch = useDispatch()
    const alert = useAlert

    const {loading, error, products } =useSelector(state => state.allProducts)

    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        
        dispatch(getAllProducts())
    },[alert, dispatch, error])



    if(loading) {
        return(
            <div><Loader/></div>
        )
    }
    return (
        <div className='allProdHome'>
            <div class="moving-sentence">NEW MARIO'S</div>
            <div className='productHome'>
                {products && products.map((product, index) => {
                    return (
                        <div className='allHome Link' key={index}>
                            <div className='allHomeImg'>
                                <Link className='Link'  to={`/product/${product._id}`}><img src={homePix} alt="" /></Link>
                            </div>
                            <div className='allTD'>
                                <div>
                                    <div className='allName'>{product.name && product.name.length > 13 ? `${product.name.toUpperCase().slice(0, 13)}...` : product.name.toUpperCase()}</div>
                                    <div className='allStars'>₦{product.price}</div>
                                </div>
                                <div className='basket'><BsCart4 className='basketIcon' /></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )    
}

export default AllProductsHome
