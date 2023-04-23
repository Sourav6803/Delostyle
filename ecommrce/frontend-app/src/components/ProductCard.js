import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import { addToWishlist, getAllProducts } from "../features/product/productSlice";
import { productService } from "../features/product/productService";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = (props) => {
  const location = useLocation();
  const { grid, data } = props;
  const dispatch = useDispatch();

  const addToWish = (id) => {
    alert(id)
    dispatch(addToWishlist(id));
  };

  return (
    <>
      {data && data?.map((item, index) => {
        return (
          <div key={index} className={`${location.pathname === "/product"}` ? `gr-${grid}` : "col-3"}>
            <div className="product-card position-relative">
              <div className="whishlist-icons position-absolute">
                <button className="border-0 bg-transparent" onClick={(e) => { addToWish(item?._id);}} >
                  <img src="images/wish.svg" alt="whishlist" />
                </button>
              </div>

              <div className="product-image">
                <img src={item.productImage} className="img-fluid mx-auto overflow-hidden " width={160}  alt="product" />
                <img src={item.productImage} className="img-fluid "  alt="product" />
              </div>

              <div className="product-details">
                <h6 className="brand">{item.brand}</h6>
                <h5 className="products-title">{item.title}</h5>
                <ReactStars count={5} size={24} value={4} edit={false} activeColor="#ffd700"/>
                <p className="description">{item.description.substr(0,70 + "...")}</p>
                <p className="price"> ₹{item.price}</p>
              </div>

              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  {/* <button className="border-0 bg-transparent">
                    <img src="images/prodcompare.svg" alt="compare" />
                  </button> */}
                  <Link to={'/product/'+item?._id} className="border-0 bg-transparent">
                    <img src="images/view.svg" alt="view" />
                  </Link>
                  {/* <button  className="border-0 bg-transparent">
                    <img src="images/add-cart.svg" alt="addcart" />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
