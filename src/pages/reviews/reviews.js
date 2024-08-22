import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productActions'
import Loader from '../loader/loader'
import { useNavigate, useParams } from 'react-router-dom'
import AlertContext from '../../components/alert/AlertContext'
import { IoMdStar } from "react-icons/io";
import { IoMdStarHalf } from "react-icons/io";
import { IoMdStarOutline } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import ArrowLeft from '../../assets/svg/arrowLeft'
import './reviews.css'
import MetaData from '../../components/layouts/MetaData'

const Reviews = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {id} = useParams()
    
    const [, setAlert] = useContext(AlertContext)

	const showAlert = (message, type) => {
		setAlert({
			message,
			type
		})
	}

    const {
        loading, product, error
    } = useSelector(state => state.productDetails)

    useEffect(() => {
        if(error) {
            showAlert(error, 'error')
            dispatch(clearErrors())
        }

        dispatch(getProductDetails(id))
    }, [dispatch, error, id])

    
    if(loading) {
        return (
            <Loader/>
        )
    }

    const reviewStarFunc = (ratingValue) => {
        return Array.from({length: 5}, (elem, index) => {
            let number = index + 0.5
            return (
                ratingValue >= index + 1 
                ? <IoMdStar className='stars'/>
                : ratingValue >= number
                ? <IoMdStarHalf className='stars'/>
                : <IoMdStarOutline className='stars'/>
            )
        })
    }

  return (
    <div className='reviewForAll'>
        <MetaData title="Zarmario product review"/>
        <div className='backArrowPD' onClick={() => navigate(-1)}>
          <ArrowLeft className='icons ArrowLeft'/>
          <span>Back</span>
        </div>
      {product.reviews && product.reviews.map((review) => {
        return (
            <div className='allReview'>
                <div className='reviewD'>
                   <div className='DName'>{review.name && review.name.toUpperCase()}</div>
                    <div className='starNo'>
                        <div className='reviewRatingStar'>
                            {reviewStarFunc(review.rating)}
                        </div>
                        <div> <GoDotFill className='dotIcon' /> </div>
                        <div> ({review.rating})</div>
                    </div>
                </div>
                <div>{review.comment}</div>
                <div className='underline tickLine'></div>
            </div>
        )
      })}
    </div>
  )
}

export default Reviews
