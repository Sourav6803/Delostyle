import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumbs from "../components/BreadCrumbs";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "./Color";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { addRating, getAProduct, getAllProducts } from "../features/product/productSlice";

import { toast } from "react-toastify";
import { addProductToCart, getUserCart } from "../features/user/userSlice";

const SingleProduct = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [orderdProduct, setorderdProduct] = useState(true);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [popularProduct , setPopularProduct] = useState([])

  const getproductId = location.pathname.split("/")[2];
  const productState = useSelector((state) => state?.product?.sproduct);
  console.log(productState)
  const cartState = useSelector((state) => state?.auth?.product);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAProduct(getproductId));
    dispatch(getUserCart());
    dispatch(getAllProducts())
  }, []);
  
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getproductId === cartState[index].productId._id) {
        setAlreadyAdded(true);
      }
    }
  },[]);

  useEffect(()=>{
    let data = []
    for(let i=0;i<productState.length;i++){
      const element = productState[i]
      if(element.tags === "popular"){
        data.push(element)
      }
      setPopularProduct(data)
    }
  },[productState])
  

  const uploadCart = () => {
    if (color === null) {
      toast.error("Please select color");
      return false;
    } else {
      dispatch(
        addProductToCart({
          productId: productState._id,
          quantity,
          color,
          price: productState.price,
        })
      );
      navigate('/cart')
    }

  };
  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const props = {
    width: 400,
    height: 300,
    zoomWidth: 500,
    img: productState.productImage
      ? productState.productImage
      : "https://www.freepnglogos.com/uploads/mobile-png/samsung-mobile-png-14.png",
  };

  const [star , setStar] = useState(null)
  const [comment , setComment] = useState(null)
  const addRatingProduct = ()=>{
    if(star == null){
      toast.error("Please add rating")
      return false
    }if(comment==null){
      toast.error("Please write a review")
      return false
    }else{
      dispatch(addRating({star:star,comment:comment,prodId: getproductId}))
      setTimeout(()=>{
        dispatch(getAProduct(getproductId));
      },100)
    }
  }

  return (
    <>
      <Meta title={"Single product"} />
      <BreadCrumbs title={productState?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                {" "}
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {/* {
                                productState.productImage && productState.productImage.map((item,index)=>{
                                    return (
                                        <div key={index}> <img src={item.productImage} alt='img' className='img-fluid' /></div>
                                    )
                                })
                            } */}
            </div>
          </div>

          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price py-3"> {productState?.price}</p>
                <div className="c">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState.totalrating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">(2 Reviews)</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className="border-bottom py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type:</h3>{" "}
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand:</h3>{" "}
                  <p className="product-data">{productState.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category:</h3>{" "}
                  <p className="product-data">{productState.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags:</h3>{" "}
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size:</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      L
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availability:</h3>{" "}
                  <p className="product-data">In Stock</p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Colors:</h3>
                  <Color setColor={setColor} colorData={productState.color} />
                </div>
                <div className="d-flex gap-10 align-items-center mt-2 mb-3">
                  {alreadyAdded === false && (
                    <>
                      <h3 className="product-heading">Quantity: </h3>
                      <div className="">
                        <input
                          type="number"
                          name=""
                          id=""
                          defaultValue={1}
                          min={1}
                          max={5}
                          style={{ width: "70px" }}
                          onChange={(e) => setQuantity(e.target.value)}
                          value={quantity}
                        ></input>
                      </div>
                    </>
                  )}
                  <div
                    className={
                      alreadyAdded
                        ? "ms-0"
                        : "ms-5" + "d-flex gap-30 align-items-center ms-5"
                    }
                  >
                    <div
                      className="d-flex  gap-15 align-item-center ms-5"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                    >
                      <button
                        className="button border-0"
                        type="submit"
                        onClick={() =>{alreadyAdded ? navigate('/cart'):  uploadCart()}}
                      >
                        {alreadyAdded ? "go To Cart" : "Add To Cart"}
                      </button>
                      {/* <Link to="*" className='button signup'>BUY IT NOW</Link> */}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" /> Add to Compare
                    </a>
                  </div>
                  <div>
                    <a href="">
                      {" "}
                      <AiOutlineHeart className="fs-5 me-2" />
                      Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column align-items-center my-2">
                  <h3 className="product-heading ">Shipping & Returns:</h3>
                  <p className="product-data">
                    Free shipping and Returns available on all orders!
                    <br /> We Ship all us domestic orders within
                    <b> 5-10 business days</b>{" "}
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Copy:</h3>
                  <a
                    href="javascript:void(0)"
                    onClick={() => {
                      copyToClipboard(window.location.href);
                    }}
                  >
                    Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4 className="b">Description</h4>
            <div className="bg-white p-3">
              <p> {productState?.description}</p>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="reviews-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Review</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderdProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="*">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                
                  <h4> Write a Review</h4>
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e)=>{setStar(e)}}
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      className="w-100 form-control"
                      rows="3"
                      placeholder="Comments"
                      onChange={(e)=>{setComment(e.target.value)}}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button onClick={addRatingProduct} className="button border-0" type="button"> Submit Review</button>
                  </div>
                
              </div>
              <div className="reviews mt-3">
                {
                  productState && productState?.ratings?.map((item,index)=>{
                    return (
                      <div key={index} className="review mt-4">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Sourav Bhukta</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={item?.star}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p>  
                    {item?.comment}
                  </p>
                </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
          <div className="row">
            <ProductCard data={popularProduct} />
            
            
          </div>
        </div>
      </Container>
    </>
  );
};

// data={popularProduct}

export default SingleProduct;
