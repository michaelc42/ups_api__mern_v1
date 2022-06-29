import { useContext, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import CartContext from '../context/CartContext'
import useAuth from '../hooks/useAuth'
import getUpsRate from '../services/UPS_API/getUpsRate'

const Cart = () => {
    const cartContext = useContext(CartContext)
    const { cart, setCart } = cartContext

    const userInfo = useAuth()

    let tempSubTotal = 0
    let tempQty = 0

    const cartCards = cart.map(item => {
        tempSubTotal += Number((item.price * item.count).toFixed(2))
        tempQty += parseInt(item.count)
        return (
            <Form.Group key={item.id} className="row">
                <Form.Label className="col-2 border border-secondary mb-0" htmlFor="checkout">{item.productName}</Form.Label>
                <Form.Label className="col-4 border border-secondary flex-grow-1 mb-0" htmlFor="checkout">{item.description}</Form.Label>
                <Form.Label className="col-3 border border-secondary w-15 mb-0 px-2" htmlFor="checkout">QTY: {item.count}</Form.Label>
                <Form.Label className="col-3 border border-secondary  w-20 mb-0 px-2" htmlFor="checkout">Total: ${(item.price * item.count).toFixed(2)}</Form.Label>
            </Form.Group >
        )
    })
    

    const [shipPrice, setShipPrice] = useState('0.00')
    const [shippingData, setShippingData] = useState({})
    const [taxes, setTaxes] = useState(Number((tempSubTotal * .0875).toFixed(2)))
    const [subtotal, setSubtotal] = useState(Number((tempSubTotal).toFixed(2)))
    const [total, setTotal] = useState()
    const [qty, setQty] = useState(tempQty)

  
    // const tempShippingCost = async () => {
    //     try {
    //         return await getUpsRate(userInfo.auth)
    //     } catch (error) {
    //         console.log('Error on call: ', error)
    //     }
    // }
    

    useEffect(() => {
        userInfo.auth.cart = cart
        async function getShipRate() {
            if (userInfo.auth.name) {
                const response = await getUpsRate(userInfo.auth)
                //console.log(response)
                setShippingData(await response)
                setShipPrice(await Number(shippingData?.resData?.RateResponse?.RatedShipment?.TotalCharges?.MonetaryValue))
                setTotal(await Number(shipPrice+taxes+subtotal).toFixed(2))
                
            }
        }
        try {
            getShipRate()
        } catch (error) {
            console.log(error)
        }
        
    }, [total, subtotal, taxes, shipPrice])


    return (
        <div className=''>
            <h2>Cart</h2>

            {cartCards.length > 0 ? (
                <Form className="container">
                    <Form.Group className="row">
                        {cartCards}
                    </Form.Group>
                    <Form.Group className="row w-100">
                        <Form.Label className='col-3 offset-md-6 d-flex justify-content-between'><span>Total QTY</span> <span>{qty}</span></Form.Label>
                        <Form.Label className='col-3 d-flex justify-content-between'><span>Sub Total</span> <span>{subtotal}</span></Form.Label>
                    </Form.Group>
                    <Form.Group className="row w-100">
                        <Form.Label className='col-3  offset-md-9 d-flex justify-content-between'><span>Taxes</span> <span>{taxes}</span></Form.Label>
                    </Form.Group>
                    <Form.Group className="row w-100 mt-0">
                        <Form.Label className='col-3 offset-md-6 d-flex justify-content-center'><Button  className='w-100'>Calc Shipping</Button></Form.Label>
                        <Form.Label className='col-3 d-flex justify-content-between'><span>Shipping</span> <span>{shipPrice ? '$' + shipPrice : 'TBD' }</span></Form.Label>
                    </Form.Group>
                    <Form.Group className="row w-100 mt-0">
                        <Form.Label className='col-3 offset-md-9 border-top border-secondary d-flex justify-content-between'><span>Total Price</span> <span>{ total }</span></Form.Label>
                    </Form.Group>
                </Form>
                ) : <h3>Cart is empty</h3>
            }
        </div>
    
    
  )
}

export default Cart