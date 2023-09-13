import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();

  // Fetch the product details based on productId
  // You can use this productId to fetch the specific product details from your data source

  return (
    <div>
      <h1>Product Details</h1>
      {/* Display product details here */}
    </div>
  )
}

export default ProductDetails;































// import { useState, useEffect } from 'react'
// import { Navigate } from 'react-router-dom';



// interface Product {
//     id: number;
//     name: string;
//     price: number;
//     description: string;
//     image: string;
//     }







// const ProductDetails = () => {
//   return (
//     <div>
//         <h1>Product Details</h1>
//         {/* <h1>{product.name}</h1>
//         <p>{product.price}</p>
//         <p>{product.description}</p>
//         <img src={product.image} alt={product.name} /> */}
//     </div>
//   )
// }

// export default ProductDetails