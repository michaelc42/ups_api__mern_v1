import { Button, Card } from 'react-bootstrap'

const ProductCard = (props) => {
    const { ProductName, _id, aggregateRating, brand,
        description, imageSrc, model, price, productMeasurements,
        shippingMeasurements, addToCartHandler } = props
    const croppedImage = imageSrc.slice(0, imageSrc.indexOf('.')) + 'crop' + imageSrc.slice(imageSrc.indexOf('.'))
    
    return (
        <Card style={{ width: '18rem' }}>
            <div>
                <Card.Img variant="top" className='' src={`/images/${croppedImage}`} />
            </div>
            <Card.Body className=''>
                <Card.Title>{ProductName}</Card.Title>
                <Card.Text>
                    {`$${price}`}
                </Card.Text>
                <Card.Text>
                    {aggregateRating+'/5'}
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
                    variant="primary">Add to Cart</Button>
            </Card.Body>
        </Card>
  )
}

export default ProductCard