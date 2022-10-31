import React from "react";
import "./Shop.css";
import { NavLink } from "react-router-dom";

function Shop({ user }) {
  return (
    <div className="shop-container">
      <h2>What would you like to purchase, {user ? user.name : "stranger"}?</h2>
      <div className="shop-categories">
        <NavLink to="/shop/Mobile" className="shop-option">
          <img src="./iphone.jpg" />
          <h3>Mobile</h3>
        </NavLink>
        <NavLink to="/shop/Gaming-PCs" className="shop-option">
          <img src="./prebuilt.jpg" />
          <h3>Gaming PCs</h3>
        </NavLink>
        <NavLink to="/shop/PC-Parts" className="shop-option">
          <img src="./gpu.jpg" />
          <h3>PC Parts</h3>
        </NavLink>
        <NavLink to="/shop/Accessories" className="shop-option">
          <img src="./controller.jpg" />
          <h3>Accessories</h3>
        </NavLink>
        <NavLink to="/shop/Consoles" className="shop-option">
          <img src="./console.jpeg" />
          <h3>Consoles</h3>
        </NavLink>
        <NavLink to="/shop/Funko-Pops" className="shop-option">
          <img src="./funko.jpg" />
          <h3>Funko Pops</h3>
        </NavLink>
      </div>
      <NavLink to="/shop/All" className="shop-notsure">
        I'm just casually browsing.
      </NavLink>
    </div>
  );
}

export default Shop;
