impot { useState, useEffect } from 'react'



interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    }







const ProductDetails = () => {
  return (
    <div>
        <h1>{product.name}</h1>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <img src={product.image} alt={product.name} />
    </div>
  )
}

export default ProductDetails