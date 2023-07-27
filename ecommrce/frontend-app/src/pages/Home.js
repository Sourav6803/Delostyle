import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";



import Container from "../components/Container";
import services from "../utils/Data";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";


const Home = () => {
  const navigate = useNavigate()
  
  const dispatch = useDispatch();


  return (
    <>
      {/* <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative p-3">
              <img
                src="images/main-banner-1.jpg"
                alt="banner"
                className="img-fluid rounded-3"
              ></img>
              <div className="main-banner-content position-absolute">
                <h4>Best sale</h4>
                <h5>iPad s13 pro</h5>
                <p>From $999 or $41.78/month</p>
                <Link className="button">Buy Now</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-2 justify-content-between align-items-center p-3">
              <div className="small-banner position-relative">
                <img src="images/catbanner-01.jpg" alt="banner" className="img-fluid rounded-3"></img>
                <div className="small-banner-content position-absolute">
                  <h4>New arrival</h4>
                  <h5>Buy Laptop here</h5>
                  <p>
                    From $999 or <br />
                    $41.78/month
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-02.jpg" alt="banner" className="img-fluid rounded-3"></img>
                <div className="small-banner-content position-absolute">
                  <h4>Best sale</h4>
                  <h5>Buy smart watch</h5>
                  <p> From $999 or <br /> $41.78/month </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-03.jpg" alt="banner" className="img-fluid rounded-3"></img>
                <div className="small-banner-content position-absolute">
                  <h4>New arrival</h4>
                  <h5>iPad S13+ pro</h5>
                  <p>
                    From $999 or <br /> $41.78/month
                  </p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img
                  src="images/catbanner-04.jpg"
                  alt="banner"
                  className="img-fluid rounded-3"
                ></img>
                <div className="small-banner-content position-absolute">
                  <h4>New Arrival</h4>
                  <h5>
                    Buy Headphone <br /> here
                  </h5>
                  <p>From $999 or $41.78/month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container> */}

      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="service" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container> */}

      {/* <Container class1="home-wrapper-3 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap-15 align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-15 align-items-center">
                <div>
                  <h6>Smart TV</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="tv" />
              </div>
              <div className="d-flex gap-15 align-items-center">
                <div>
                  <h6>Watches</h6>
                  <p>10 Items</p>
                </div>
                <img
                  src="images/watch.jpg"
                  style={{ height: "120px", width: "120px" }}
                  alt="watch"
                />
              </div>
              <div className="d-flex gap-15 align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="music" />
              </div>
              <div className="d-flex gap-15 align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="music" />
              </div>
              <div className="d-flex gap-15 align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-15 align-items-center">
                <div>
                  <h6>Smart TV</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="tv" />
              </div>
              <div className="d-flex gap-15 align-items-center">
                <div>
                  <h6>Watches</h6>
                  <p>10 Items</p>
                </div>
                <img
                  src="images/watch.jpg"
                  style={{ height: "120px", width: "120px" }}
                  alt="watch"
                />
              </div>
            </div>
          </div>
        </div>
      </Container> */}

      {/* <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <div className="d-flex ">
          {productState &&
              productState?.map((item, index) => {
                if (item.tags === "featured") {
                  return (
                    <div key={index} className="col-3">
                      <div className="product-card position-relative">
                        <div className="whishlist-icons position-absolute">
                          <button
                            className="border-0 bg-transparent"
                            onClick={(e) => {
                              addToWish(item?._id);
                            }}
                          >
                            <img src="images/wish.svg" alt="whishlist" />
                          </button>
                        </div>

                        <div className="product-image">
                          <img
                            src={item.productImage}
                            className="img-fluid mx-auto  "
                            width={160}
                            alt="product"
                          />
                          <img
                            src={item.productImage}
                            className="img-fluid "
                            alt="product"
                          />
                        </div>

                        <div className="product-details">
                          <h6 className="brand">{item.brand}</h6>
                          <h5 className="products-title">{item.title}</h5>
                          <ReactStars
                            count={5}
                            size={24}
                            value={4}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          <p className="description">
                            {item.description.substr(0, 70 + "...")}
                          </p>
                          <p className="price"> ₹{item.price}</p>
                        </div>

                        <div className="action-bar position-absolute">
                          <div className="d-flex flex-column gap-15">
                            <button className="border-0 bg-transparent">
                              {" "}
                              <img src="images/prodcompare.svg" alt="compare" />
                            </button>
                            <button className="border-0 bg-transparent">
                              {" "}
                              <img onClick={()=>navigate("/product/"+item?._id)} src="images/view.svg" alt="view" />
                            </button>
                            <button className="border-0 bg-transparent">
                              {" "}
                              <img src="images/add-cart.svg" alt="addcart" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </Container> */}

      {/* <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-1.jpg"
                className="img-fluid"
                style={{ height: "405px", width: "450px" }}
                alt="watches"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>
                  Smart Watches <br /> Series 7
                </h6>
                <p>
                  From $100 or $30 /mo <br /> for 12 mo.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-1.jpg"
                className="img-fluid"
                style={{ height: "405px", width: "450px" }}
                alt="watches"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>
                  Smart Watches <br /> Series 7
                </h6>
                <p>
                  From $100 or $30 /mo <br /> for 12 mo.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-1.jpg"
                className="img-fluid"
                style={{ height: "405px", width: "450px" }}
                alt="watches"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>
                  Smart Watches <br /> Series 7
                </h6>
                <p>
                  From $100 or $30 /mo <br /> for 12 mo.
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-1.jpg"
                className="img-fluid"
                style={{ height: "405px", width: "450px" }}
                alt="watches"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>
                  Smart Watches <br /> Series 7
                </h6>
                <p>
                  From $100 or $30 /mo <br /> for 12 mo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container> */}

      {/* <Container class1="special-wrapper py-5 home-wrapper">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {productState &&
            productState.map((item, index) => {
              if (item.tags === "special") {
                return (
                  <SpecialProducts
                    key={index}
                    id={item?._id}
                    brand={item?.brand}
                    title={item?.title}
                    price={item?.price}
                    totalrating={item?.totalrating}
                    image={item?.productImage}
                    sold={item?.sold}
                    quantity={item?.quantity}
                  />
                );
              }
            })}
        </div>
      </Container> */}

      {/* <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
          <div className="row">
            {productState &&
              productState.map((item, index) => {
                if (item.tags === "popular") {
                  return (
                    <div key={index} className="col-3">
                      <div className="product-card position-relative"  >
                        <div className="whishlist-icons position-absolute">
                          <button
                            className="border-0 bg-transparent"
                            onClick={(e) => {
                              addToWish(item?._id);
                            }}
                          >
                            <img src="images/wish.svg" alt="whishlist" />
                          </button>
                        </div>

                        <div className="product-image">
                          <img
                            src={item.productImage}
                            className="img-fluid mx-auto  "
                            width={160}
                            alt="product"
                          />
                          <img
                            src={item.productImage}
                            className="img-fluid "
                            alt="product"
                          />
                        </div>

                        <div className="product-details">
                          <h6 className="brand">{item.brand}</h6>
                          <h5 className="products-title">{item.title}</h5>
                          <ReactStars
                            count={5}
                            size={24}
                            value={4}
                            edit={false}
                            activeColor="#ffd700"
                          />
                          <p className="description">
                            {item.description.substr(0, 70 + "...")}
                          </p>
                          <p className="price"> ₹{item.price}</p>
                        </div>

                        <div className="action-bar position-absolute">
                          <div className="d-flex flex-column gap-15">
                            <button className="border-0 bg-transparent">
                              {" "}
                              <img src="images/prodcompare.svg" alt="compare" />
                            </button>
                            <button className="border-0 bg-transparent">
                              {" "}
                              <img onClick={()=>navigate("/product/"+item?._id)} src="images/view.svg" alt="view" />
                            </button>
                            <button className="border-0 bg-transparent">
                              {" "}
                              <img src="images/add-cart.svg" alt="addcart" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </Container> */}

      {/* <Container class1="marque-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  {" "}
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  {" "}
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  {" "}
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  {" "}
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  {" "}
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  {" "}
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  {" "}
                  <img src="images/brand-07.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container> */}

      {/* <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {blogState
            ? blogState?.map((item, index) => {
                if (index < 4) {
                  return (
                    <div key={index} className="col-3">
                      <BlogCard
                        id={item?._id}
                        title={item?.title}
                        description={item?.description}
                        items={item?.images}
                        date={moment(item?.created_at).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      />
                    </div>
                  );
                }
              })
            : []}
        </div>
      </Container> */}
    </>
  );
};

export default Home;
