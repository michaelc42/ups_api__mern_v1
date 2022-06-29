import { Button, Card } from 'react-bootstrap'
import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';

const ProductCard = (props) => {
    const { ProductName, _id, aggregateRating, brand,
        description, imageSrc, model, price, productMeasurements,
        shippingMeasurements, addToCartHandler } = props
    const croppedImage = imageSrc.slice(0, imageSrc.indexOf('.')) + 'crop' + imageSrc.slice(imageSrc.indexOf('.'))
    
    function createStarRating(rating) { 
        console.log(rating)
        let starCount = 5
        let starComponent = []
        for (let i = 0; i < Math.floor(rating); i++) {
            starComponent.push(<StarFill />)
            starCount--
        }
        
        if ((rating - Math.floor(rating)) !== 0) {
            starComponent.push(<StarHalf />)
            starCount--
        }

        for (let i = 0; i < starCount; i++) {
            starComponent.push(<Star />)
        }

        return starComponent
    }

    return (
        <Card style={{ width: '18rem' }} className='mt-3'>
            <div>
                <Card.Img variant="top" className='' src={`/images/${croppedImage}`} />
            </div>
            <Card.Body className=''>
                <Card.Title>{ProductName}</Card.Title>
                <Card.Text>
                    {`$${price}`}
                </Card.Text>
                <Card.Text>
                    {aggregateRating + '/5'} {createStarRating(aggregateRating)}
                </Card.Text>
                <Card.Text>
                    {description}
                </Card.Text>
                <Button
                    data-id={_id}
                    data-productname={ProductName}
                    data-brand={brand}
                    data-model={model}
                    data-price={price}
                    data-description={description}
                    data-shippingmeasurements={JSON.stringify(shippingMeasurements)}

                    onClick={addToCartHandler}
                    className="w-100"
                    variant="secondary">Add to Cart</Button>
            </Card.Body>
        </Card>
  )
}

export default ProductCard