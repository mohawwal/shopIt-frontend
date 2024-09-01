import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const PageFooter = () => {
    const location = useLocation()

    const [footerStyle, setFooterStyle] = useState('footerHome')

    useEffect(() => {
        let footerClass = "footerHome"

        if(location.pathname === '/') {
            footerClass = "footerNone"
        } else if (location.pathname === '/register') {
            footerClass = "footerNone"
        } else if (location.pathname === '/login') {
            footerClass = "footerNone"
        } else if(location.pathname.startsWith('/me')) {
            footerClass = "footerNone"
        } else if(location.pathname.startsWith('/password')) {
            footerClass = "footerNone"
        } else if(location.pathname.startsWith('/order')) {
            footerClass = "footerNone"
        } else if(location.pathname.startsWith('/dashboard')) {
            footerClass = "footerNone"
        } else if(location.pathname.startsWith('/wishlist')) {
            footerClass = "footerNone"
        } else if(location.pathname.startsWith('/payment')) {
            footerClass = "footerNone"
        } else if (location.pathname === '/shop') {
            footerClass = "footerNone"
        } else if (location.pathname === '/shipping') {
            footerClass = "footerNone"
        } else if (location.pathname === '/cart') {
            footerClass = "footerNone"
        } else if(location.pathname.startsWith('/admin')) {
            footerClass = "footerNone"
        } else if (location.pathname === '/product/:id/reviews') {
            footerClass = "footerNone"
        } 

        setFooterStyle(footerClass)
    },[footerStyle, location.pathname])
  return (
    <div className={`pageFooter ${footerStyle}`}>
      PAGE FOOTER
    </div>
  )
}

export default PageFooter
