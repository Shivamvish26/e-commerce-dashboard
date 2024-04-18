import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
    const navigate = useNavigate();

  const updateproduct = async () => {
    console.log(name, price, category, company);
    let result = fetch(`http://localhost:5000/products/${params.id}`,{
        method:'Put',
        body:JSON.stringify({name, price, category, company}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    result = (await result).json()
    console.log(result)
    navigate('/');
     //clear form data
     setName("");
     setPrice("");
     setCategory("");
     setCompany("");

    // Show success message using SweetAlert
    swal({
      title: "Product Updated Successfully!",
      icon: "success",
    });
  };

  const getProductDetails = async () => {
    console.log(params);
    let result = await fetch(`http://localhost:5000/products/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  useEffect(() => {
    getProductDetails();
  }, [params.id]); // Add params.id to the dependency array
  
  

  return (
    <div className="add-product">
      <h1>Update Product</h1>
      <input
        className="inputbbox"
        type="text"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputbbox"
        type="text"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="inputbbox"
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        className="inputbbox"
        type="text"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button onClick={updateproduct} className="btn-submit">
        Update Product
      </button>
    </div>
  );
}

export default UpdateProduct;
