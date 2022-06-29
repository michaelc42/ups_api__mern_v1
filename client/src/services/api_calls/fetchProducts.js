

const fetchProducts = async () => {

    const response = await fetch(window.location.origin + '/api/v1/products', {
        method: 'GET',
    })
    if (!response.ok) {
        throw new Error("HTTP Error " + response.status)
    }
    const products = await response.json()
    return products
    
    
}

export default fetchProducts