import React from "react";
import "./Cart.css";
import { NavLink } from "react-router-dom";

function Cart({ cart, changeCount, numbify, removeFromCart }) {
  // A function to help print <option> tags, i was raging at typing it manually
  function count(e) {
    let arr = [];
    for (let i = 1; i <= 9; i++) {
      arr[i] = (
        <option value={i} key={`${e}count${i}`}>
          {i}
        </option>
      );
    }
    return arr;
  }

  return (
    <div id="cart">
      <div id="actualCart">
        {cart.length ? (
          <ul>
            {cart.map((item, index) => (
              <li key={`item${index}`} className="liItem">
                <div className="removeCartItem">
                  <button
                    onClick={() => {
                      removeFromCart(item);
                    }}
                    className="xRemove"
                  >
                    X
                  </button>
                </div>
                <div className="imgDiv">
                  <img src={item.img} />
                  <div>
                    <p style={{ marginBottom: "0.7rem" }}>{item.name}</p>
                    <p style={{ fontWeight: "bold" }}>
                      Price: {numbify(item.price)} ₪
                    </p>
                  </div>
                </div>
                <div className="countDiv">
                  <p>Count: </p>
                  <select
                    value={item.count}
                    onChange={({ target }) => {
                      changeCount(item, target.value);
                    }}
                    className="count"
                  >
                    {count(index)}
                  </select>
                </div>
                <div style={{ width: "20%", fontWeight: "bold" }}>
                  <p>Total Price: {numbify(item.count * item.price)}₪</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <h2 style={{ textAlign: "center", margin: "30% 0" }}>
            Nothing here yet!
            <br />
            <NavLink to="/shop">Start Browsing Now!</NavLink>
          </h2>
        )}
      </div>
      <div id="payment">
        <div id="totalcart">
          <p>
            Total Cart Price:{" "}
            <span
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              {numbify(
                cart.reduce((a, { price, count }) => {
                  return a + price * count;
                }, 0)
              )}{" "}
              ₪
            </span>
          </p>
        </div>
        <button>
          Pay with <span className="payment-method">Credit Card</span>
        </button>
        <button>
          Checkout with{" "}
          <span className="payment-method darkblue paypal">Pay</span>
          <span className="payment-method lightblue paypal">Pal</span>
        </button>
      </div>
    </div>
  );
}

export default Cart;
