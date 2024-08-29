import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductCategory } from '../../actions/productActions'
import { Link, useParams } from 'react-router-dom'
import { BsCart4 } from "react-icons/bs";
import Loader from '../../pages/loader/loader'
import homePix from '../../assets/images/image1.jpg'
import { clearErrors } from '../../actions/userAction';
import AlertContext from '../../components/alert/AlertContext';

const AllCategory = ({ category }) => {
    const dispatch = useDispatch()
    const {id} = useParams()
    
    const [, setAlert] = useContext(AlertContext)

	const showAlert = (message, type) => {
		setAlert({
			message,
			type
		})
	}
    

    const { loading, error, products } = useSelector(state => state.productCategory)

    useEffect(() => {
        if(error) {
            showAlert(error, 'error')
            dispatch(clearErrors())
        }
        
        dispatch(getProductCategory(`${id}`))
    },[dispatch, error, id])

    if(loading) {
        return(
            <div><Loader/></div>
        )
    }
    return (
        <div className='catProdHome'>
            <div class="moving-sentence">SIMILAR MARIO'S</div>
            <div className='productHome'>
                {products.map((product, index) => {
                    return (
                        <div className='allHome Link' key={index}>
                            <div className='allHomeImg'>
                                <Link className='Link'  to={`/product/${product._id}`}>
                                <img src={homePix} alt="" />
                                </Link>
                            </div>
                            <div className='allTD'>
                                <div>
                                    <div className='allName'>{product.name && product.name.length > 1 ? `${product.name.toUpperCase().slice(0, 1)}...` : product.name.toUpperCase()}</div>
                                    <div className='allStars'>₦{product.price}</div>
                                </div>
                                <div><BsCart4 className='icons cart' /></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllCategory
