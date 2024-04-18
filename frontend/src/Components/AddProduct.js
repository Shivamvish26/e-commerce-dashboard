import React, { useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom"; 
function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const addproduct = async () => {
    // console.warn(!name);
    if (!name || !price || !category || !company) {
      setError(true);
      swal({
        title: "Error",
        text: "Please enter all fields",
        icon: "error",
      });
      return false;
    }

    console.log(name, price, category, company);
    const user = JSON.parse(localStorage.getItem("users"));
    const userId = user._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);

    //clear form data
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");
    setError(false);

    // Show success message using SweetAlert
    swal({
      title: "Product Added Successfully!",
      icon: "success",
    });
    navigate("/");
  };

  return (
    <div className="add-product">
      <h1>Add Product</h1>
      <input
        className="inputbbox"
        type="text"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && !name && (
        <span className="invalid-input">Enter Valid name</span>
      )}
      <input
        className="inputbbox"
        type="text"
        placeholder="Enter Product Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {error && !price && (
        <span className="invalid-input">Enter Valid price</span>
      )}

      <input
        className="inputbbox"
        type="text"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      {error && !category && (
        <span className="invalid-input">Enter Valid Category</span>
      )}

      <input
        className="inputbbox"
        type="text"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      {error && !company && (
        <span className="invalid-input">Enter Valid Company</span>
      )}

      <button onClick={addproduct} className="btn-submit">
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;
