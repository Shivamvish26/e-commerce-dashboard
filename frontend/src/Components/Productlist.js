import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
function Productlist() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      let result = await fetch("http://localhost:5000/products");
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deletproduct = async (id)=>{
   let result = await fetch(`http://localhost:5000/products/${id}`,{
      method:'Delete',
   })
   result =  await result.json()
   if(result){
    getProducts();
   }
     swal({
      title: "Product Deleted Successfully!",
      icon: "success",
    });
  }

  console.warn("Products", products);


  const searchHandleproduct = async(event)=>{
    // console.warn(event.target.value)
    let key = event.target.value;
    if(key){
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if(result){
        setProducts(result)
      }
    }else{
      getProducts()
    }

  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="product-list">
      <h1>Product Listing Page</h1>
      <input className="search-product" onChange={searchHandleproduct} type="text" placeholder="Search Product"/>
      <ul>
        <li>Sr.No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ul key={index}>
            <li>{index + 1}</li>
            <li>{product.name}</li>
            <li>{product.price}</li>
            <li>{product.category}</li>
            <li>
              <button className="delete-product" onClick={() => deletproduct(product._id)}>Delete</button>
              <Link to={"/update/" + product._id}>Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
}  

export default Productlist;
