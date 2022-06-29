
import { useContext, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom";
import useAuth from '../hooks/useAuth';

import CartContext from '../context/CartContext'


const AvatarForNav = () => {
    const { auth } = useAuth()

    
    const cartContext = useContext(CartContext)

    
    const bgStyle = {
        "backgroundColor": "gray",
        "borderRadius":"5px"
    }

    const textStyle = {
        "color": "white"
    }

    let  cartCount = 0
    cartContext.cart.forEach((element) => {
        cartCount += element.count
    })
    
    //console.log(cartCount)
    return (
        <Navbar.Text className="ms-auto d-inline-flex p-0" style={bgStyle}>
            {auth?.username ? <Nav.Link style={textStyle} as={Link} to="/logout">Log Out</Nav.Link> : <Nav.Link style={textStyle} as={Link} to="/login">Log In</Nav.Link>}
            {auth?.username ? <Nav.Link style={textStyle} as={Link} to="#">{auth.username}</Nav.Link> : ''}
            {<Nav.Link className="" style={textStyle} as={Link} to="/cart">({cartCount}) Cart</Nav.Link>}
        </Navbar.Text>
    )
}

export default AvatarForNav