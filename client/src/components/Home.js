import {useState, useEffect, useContext} from 'react'
import ProductCard from './ProductCard'
import fetchProducts from '../services/api_calls/fetchProducts'
import CartContext from '../context/CartContext'

const Home = () => {

  const [products, setProducts] = useState([])
  const [productCount, setProductCount] = useState(0)

  const cartContext = useContext(CartContext)

  const {cart, setCart } = cartContext

  const addToCartHandler = (e) => {

    console.log(e.target.getAttribute('data-id'))
    let count = 0
    let updatedCart
    const alreadyInCart = cart.find(element => element.id === e.target.getAttribute('data-id'))

    if (alreadyInCart) {
      count = alreadyInCart.count
      updatedCart = cart.map(item => {
        if (item.id === alreadyInCart.id) {
          return { ...item, count: count + 1 }
        }
        return item
      })
      setCart((prev) => updatedCart)
    } else {
      setCart((prev) => {
        return [...prev,
          {
            id: e.target.getAttribute('data-id'),
            count: 1,
            productName: e.target.getAttribute('data-productname'),
            brand: e.target.getAttribute('data-brand'),
            model: e.target.getAttribute('data-model'),
            price: e.target.getAttribute('data-price'),
            description: e.target.getAttribute('data-description'),
            shippingMeasurements: JSON.parse(e.target.getAttribute('data-shippingmeasurements')),

          }
        ]
      })
    }
  }

  //update cart whenever cart changes to keep qty and storage same
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  let prodCards = []

  useEffect(() => {
    try {
      (async () => {
        const fetchedProducts = await fetchProducts()
        setProducts(fetchedProducts.products)
        setProductCount(fetchedProducts.count)
      })()
    
    } catch (error) {
      console.log(error)
    }
  }, [])

  products.forEach((prod) => {
    const { ProductName, _id, aggregateRating, brand, description, imageSrc, model, price, productMeasurements, shippingMeasurements } = prod
    prodCards = [...prodCards, <ProductCard
      ProductName = {ProductName}
      _id ={_id}
      aggregateRating = {aggregateRating}
      brand ={brand}
      description ={description}
      imageSrc ={imageSrc}
      model ={model}
      price = {price}
      productMeasurements ={productMeasurements}
      shippingMeasurements={shippingMeasurements}
      key={_id}
      addToCartHandler={addToCartHandler}
    />]
  })
  return (

    <div className='mt-3 d-flex flex-wrap'>
      {prodCards.map(card => <div 
      className='mx-2' key={card.key}>{card}</div>)}


    </div>
    
  )
}

export default Home