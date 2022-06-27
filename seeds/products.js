
const prodSeed = () => {
    const products = [
        {
            "ProductName": "Verde Silla Chair",
            "brand": "Chair Men of Tuscon",
            "description": "Perfect centerpiece for any space. Entertain, relax, and enjoy the Verde Silla experience.",
            "price": "149.95",
            "aggregateRating": "4.2",
            "productMeasurements": {
                "height": "48",
                "width": "24",
                "length": "24",
                "weight": "12"
            },
            "shippingMeasurements": {
                "height": "6",
                "width": "28",
                "length": "50",
                "weight": "12"
            },
            "model": "VS1-CH-GR",
            "imageSrc": "greenchair.jpg"
        },
        {
            "ProductName": "TeakStand Headphone Stand",
            "brand": "AllPine LLC",
            "description": "Provide a loving home for your headphones.  They make you happy - why don't you return the favor? The home is made of our patented TeakLyk TM wood.  Finished with a stylish charred coal finish.",
            "price": "89.99",
            "aggregateRating": "4.8",
            "productMeasurements": {
                "height": "12",
                "width": "8",
                "length": "6",
                "weight": "3"
            },
            "shippingMeasurements": {
                "height": "14",
                "width": "10",
                "length": "8",
                "weight": "4"
            },
            "model": "TK1-HPS",
            "imageSrc": "headphonestand.jpg"
        },
        {
            "ProductName": "Ceramic Photon Emitter",
            "brand": "Lotek Industries",
            "description": "Illuminate your home with our one-of-a-kind photon emitter.  Don't let the sun going down stop your evening!  Comes standard with our special diffuser to protect your eyes! (Light bulb not included)",
            "price": "249.95",
            "aggregateRating": "4.9",
            "productMeasurements": {
                "height": "30",
                "width": "15",
                "length": "15",
                "weight": "5"
            },
            "shippingMeasurements": {
                "height": "25",
                "width": "20",
                "length": "20",
                "weight": "6"
            },
            "model": "CPE-v7",
            "imageSrc": "lamp.jpg"
        },
        {
            "ProductName": "Hybrid Chair Stand",
            "brand": "HardSell Companies",
            "description": "Towel racks crowding your bathroom walls?  No place to sit when not on the throne?  The new Hybrid Chair Stand system will revolutionize your living!  Have a place to sit when the other seat is occupied.  Have a place to set towels instead of the floor!  Reclaim your wall space with photos of boats or the ocean!  Start living your best life!",
            "price": "99.95",
            "aggregateRating": "2.8",
            "productMeasurements": {
                "height": "40",
                "width": "24",
                "length": "30",
                "weight": "9"
            },
            "shippingMeasurements": {
                "height": "45",
                "width": "28",
                "length": "32",
                "weight": "11"
            },
            "model": "HSC-HCS-10027",
            "imageSrc": "whitechair.jpg"
        },
        {
            "ProductName": "Stül",
            "brand": "Eykea",
            "aggregateRating": "5",
            "price": "22.95",
            "description": "Stül. What else is there to say? This piece is made of solid alder and finished with a thin, white finish.  Enjoy the wood grain without the complexity of too much wood grain.  Just take a seat and nothing more. (Assembly required)",
            "productMeasurements": {
                "height": "42",
                "width": "18",
                "length": "18",
                "weight": "9"
            },
            "shippingMeasurements": {
                "height": "6",
                "width": "22",
                "length": "45",
                "weight": "10"
            },
            "model": "S",
            "imageSrc": "whitestool.jpg"
        }
    ]

    async function PostData(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)

        })

        return response.json()
    }

    products.forEach(async (prod) => {
        try {
            console.log('Adding Product')
            await PostData('localhost:3001/api/v1/products/', prod)
        } catch (error) {
            console.log(error)
        }
    })
}





