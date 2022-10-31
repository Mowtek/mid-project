import React from "react";
import "./Item.css";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function Item({ numbify, cart, changeCount, addToCart }) {
  const { category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { item } = state;
  return (
    <div id="itemPage">
      <div id="itemContainer">
        <button
          className="goBack"
          onClick={() => {
            navigate(-1);
          }}
        >
          {"<--"} Go Back
        </button>
        <div className="explainAndImageContainer">
          <div className="explainage">
            <h2 className="itemNameHeader">{item.name}</h2>
            <p className="itemPagePrice">Price: {numbify(item.price)} ₪</p>
            <p className="itemDescription">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
              dignissimos assumenda est optio labore? Corrupti similique earum
              et, fugit nulla obcaecati est doloribus quidem iure! Repellendus
              quisquam mollitia vel quam esse, officia architecto. Modi illo
              exercitationem nisi inventore alias numquam iure praesentium sed
              molestias ipsum, molestiae minus, accusantium beatae aspernatur.
            </p>
          </div>
          <div className="imageDiv">
            <img src={item.img} className="itemPageImage" />
          </div>
        </div>
        <div>
          {cart.findIndex((i) => i.id === item.id) === -1 && (
            <button
              className="addToCartItemPage"
              onClick={(e) => {
                e.preventDefault();
                addToCart(item);
              }}
            >
              Add to Cart
            </button>
          )}
          {cart.findIndex((i) => i.id === item.id) !== -1 && (
            <div className="updateCountDivI">
              <div className="updateCount e">
                <button
                  className="changeCount"
                  onClick={() => {
                    let count = document.getElementById(`${item.id}Count`);
                    if (+count.innerText > 1)
                      count.innerText = +count.innerText - 1;
                  }}
                >
                  -
                </button>
                <p>
                  Count:{" "}
                  <span id={`${item.id}Count`}>
                    {cart[cart.findIndex((i) => i.id === item.id)].count || 1}
                  </span>
                </p>
                <button
                  className="changeCount"
                  onClick={() => {
                    let count = document.getElementById(`${item.id}Count`);
                    if (+count.innerText < 9)
                      count.innerText = +count.innerText + 1;
                  }}
                >
                  <span style={{ marginTop: "0.1rem" }}>+</span>
                </button>
              </div>
              <button
                className="addToCartButton updateCountButton i"
                onClick={(e) => {
                  e.preventDefault();
                  const count = +document.getElementById(`${item.id}Count`)
                    .innerText;
                  changeCount(item, count);
                  e.target.innerText = "Item Updated!";
                  setTimeout(() => {
                    e.target.innerText = "Update Cart";
                  }, 1750);
                }}
              >
                Update Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Item;
