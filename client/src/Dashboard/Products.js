import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import Modal from "../Components/Modal";
import { useAlert } from "react-alert";

function Products(props) {
  const { token } = props;
  const alert = useAlert();
  const [products, setProducts] = useState("");
  const [addForm, setAddForm] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [info, setInfo] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const closeForm = () => {
    setAddForm(false);
  };

  const clearForm = () => {
    setName("");
    setPrice(0);
    setType("");
    setInfo("");
    setImage(null);
    getProducts();
  };

  const submitForm = (event) => {
    event.preventDefault();
    createProduct();
  };

  const createProduct = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("info", info);
    formData.append("type", type);

    axios
      .post(
        "/api/products",
        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          alert.success("new product created");
          clearForm();
        } else {
          alert.error("add product failed");
        }
      })
      .catch((error) => {
        console.log(error);
        alert.error("add product failed");
      });
  };

  const deleteProduct = (id) => {
    axios
      .delete("/api/products/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert.success("product deleted");
      })
      .catch((error) => {
        console.log(error);
        alert.error("product deletion failed");
      });
  };

  const getProducts = () => {
    axios
      .get("/api/products/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const item = res.data.product;
        setProducts(item);
        console.log(item);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addProducts = () => {
    return (
      <div className="products__add">
        <div className="products__addButtons">
          <button
            onClick={() => {
              setAddForm(!addForm);
            }}
          >
            Add new Product
          </button>
        </div>
        <div className="products__modal">
          <Modal show={addForm}>
            <div className="products__addForm">
              <h2>Add Product</h2>
              <form onSubmit={submitForm}>
                <label>
                  name{""}
                  <input
                    type="text"
                    value={name}
                    placeholder="name"
                    onChange={(e) => setName(e.currentTarget.value)}
                    required
                  />
                </label>
                <label>
                  price{""}
                  <input
                    type="number"
                    value={price}
                    placeholder="price"
                    onChange={(e) => setPrice(e.currentTarget.value)}
                    required
                  />
                </label>
                <label>
                  info{""}
                  <input
                    type="text"
                    value={info}
                    placeholder="info"
                    onChange={(e) => setInfo(e.currentTarget.value)}
                    required
                  />
                </label>
                <label>
                  image{""}
                  <input
                    type="file"
                    onChange={(e) => setImage(e.currentTarget.files[0])}
                  />
                </label>

                <div className="type">
                  <label>
                    <input
                      type="radio"
                      value="fast food"
                      checked={type === "fast food"}
                      onClick={() => {
                        setType("fast food");
                      }}
                    />
                    fast food
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="healthy"
                      checked={type === "healthy"}
                      onClick={() => {
                        setType("healthy");
                      }}
                    />
                    healthy
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="get cooking"
                      checked={type === "get cooking"}
                      onClick={() => {
                        setType("get cooking");
                      }}
                    />
                    get cooking
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="get cookingff"
                      checked={type === "get cookingff"}
                      onClick={() => {
                        setType("get cookingff");
                      }}
                    />
                    get cooking ff
                  </label>
                </div>
                <div className="users__addFormButtons">
                  <div className="submitButton">
                    <button type="submit">Submit</button>
                  </div>

                  <div className="closeButton">
                    <button
                      onClick={() => {
                        closeForm();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    );
  };

  const productCard = (product) => {
    if (product !== "") {
      const id = product._id;
      return (
        <div className="products__card">
          <div
            className={
              product.type === "fast food"
                ? "ffCard"
                : product.type === "healthy"
                ? "hCard"
                : product.type === "get cooking"
                ? "gCard"
                : "gfCard"
            }
          >
            <div className="products__cardImg">
              <img src={`http://45.56.73.20:5000/${product.image}`} alt="" />
            </div>
            <div>{product.name} </div>
            <div>price: {product.price} </div>
            <div>info: {product.info} </div>
            <div>type: {product.type} </div>

            <button
              onClick={() => {
                deleteProduct(id);
                getProducts();
              }}
            >
              delete
            </button>
          </div>
        </div>
      );
    }
  };

  if (products.length > 0) {
    return (
      <div className="products">
        {addProducts()}
        <div>Products count: {products.length}</div>
        <div className="products__display">
          {products.map((val, key) => {
            return productCard(val);
          })}
        </div>
      </div>
    );
  } else {
    return <div>{addProducts()}</div>;
  }
}

export default Products;
