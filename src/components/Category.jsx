import React from "react";
import "./Category.css";
import { useParams, NavLink } from "react-router-dom";
import { useRef } from "react";

// i truly don't know what i put EVERYTHING in this component and didn't split it to multiple components, and when I thought about adding more components I was too late... maybe someday i'll fix this.. but good luck for now navigating it. Tried my best to add as much comments.

function Category({
  itemsList,
  user,
  numbify,
  addToCart,
  sortItems,
  cart,
  changeCount,
  addItemToCategory,
  removeItemFromCategory,
  updateItemInCategory,
}) {
  const { category } = useParams();

  const updatedItem = useRef();

  // lots of refs used to get info out of "ADD ITEM" section,
  // excuse my french but FREAK document.get
  const addItemHidden = useRef();
  const addItemName = useRef();
  const addItemPrice = useRef();
  const addItemImage = useRef();
  // also wanted to use hella refs for the items themselves but thinking they
  // could collide and after a little research i stuck to document.get....

  return (
    <div id="categoryContainer">
      <h2 className="categoryHeader">{category.replace("-", " ")}</h2>
      <p className="itemUpdated" ref={updatedItem}>
        Item Updated!
      </p>
      <div id="itemsContainer">
        {category === "All" &&
          Object.keys(itemsList)
            .map((category) => {
              let returnedArr = [];
              let index = 0;
              for (let item of itemsList[category]) {
                index++;
                returnedArr.push(
                  <NavLink
                    to={{
                      pathname: `/shop/${category}/${item.name.replaceAll(
                        " ",
                        "-"
                      )}`,
                    }}
                    key={`${category}${index}`}
                    className="categoryItem"
                    state={{ item: item }}
                  >
                    <img src={item.img} className="itemImage" />
                    <p className="itemName">{item.name}</p>
                    <p className="itemPrice">Price: {numbify(item.price)} ₪</p>
                    {cart.findIndex((i) => i.id === item.id) === -1 && (
                      <button
                        className="addToCartButton"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(item);
                        }}
                      >
                        Add to Cart
                      </button>
                    )}
                    {user && user.admin && category !== "All" && (
                      <button
                        className="removeItemX"
                        onClick={(element) => {
                          element.preventDefault();
                          removeItemFromCategory(category, item);
                        }}
                      >
                        X
                      </button>
                    )}
                    {/* EDIT ITEM BUTTON */}
                    {user && user.admin && category !== "All" && (
                      <button
                        className="removeItemX goRight"
                        onClick={(element) => {
                          element.preventDefault();
                          document.getElementById(
                            `${category}${index}edit`
                          ).style.display = "flex";
                        }}
                      >
                        E
                      </button>
                    )}
                    <div
                      id={`${category}${index}edit`}
                      className="editItem"
                      onClick={(element) => {
                        element.preventDefault();
                      }}
                    >
                      <div className="editInput">
                        <label>Name:</label>
                        <input
                          type="text"
                          placeholder={item.name}
                          id={`${category}${index}name`}
                          className="editActualInput"
                        />
                      </div>
                      <div className="editInput">
                        <label>Price:</label>
                        <input
                          type="number"
                          placeholder={numbify(item.price)}
                          id={`${category}${index}price`}
                          className="editActualInput"
                        />
                      </div>
                      <div className="editInput">
                        <label>Image Link:</label>
                        <input
                          type="text"
                          placeholder={item.img}
                          id={`${category}${index}image`}
                          className="editActualInput"
                        />
                      </div>
                      {/* REMOVE ITEM BUTTON */}
                      <button
                        className="removeItemX exitEdit"
                        onClick={() =>
                          (document.getElementById(
                            `${category}${index}edit`
                          ).style.display = "none")
                        }
                      >
                        X
                      </button>
                      <button
                        className="updateEdit"
                        onClick={() => {
                          const name =
                            document.getElementById(`${category}${index}name`)
                              .value || item.name;
                          const price =
                            +document.getElementById(`${category}${index}price`)
                              .value || item.price;
                          const image =
                            document.getElementById(`${category}${index}image`)
                              .value || item.img;
                          console.log(name + price + image);
                          updateItemInCategory(category, {
                            name: name,
                            price: price,
                            img: image,
                            id: item.id,
                          });
                          document.getElementById(
                            `${category}${index}edit`
                          ).style.display = "none";
                        }}
                      >
                        Update Item
                      </button>
                    </div>
                    {cart.findIndex((i) => i.id === item.id) !== -1 && (
                      <div
                        className="updateCountDiv"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <div className="updateCount">
                          <button
                            className="changeCount"
                            onClick={() => {
                              let count = document.getElementById(
                                `${item.id}Count`
                              );
                              if (+count.innerText > 1)
                                count.innerText = +count.innerText - 1;
                            }}
                          >
                            -
                          </button>
                          <p>
                            Count:{" "}
                            <span id={`${item.id}Count`}>
                              {cart[cart.findIndex((i) => i.id === item.id)]
                                .count || 1}
                            </span>
                          </p>
                          <button
                            className="changeCount"
                            onClick={() => {
                              let count = document.getElementById(
                                `${item.id}Count`
                              );
                              if (+count.innerText < 9)
                                count.innerText = +count.innerText + 1;
                            }}
                          >
                            <span style={{ marginTop: "0.1rem" }}>+</span>
                          </button>
                        </div>
                        <button
                          className="addToCartButton updateCountButton"
                          onClick={(e) => {
                            e.preventDefault();
                            const count = +document.getElementById(
                              `${item.id}Count`
                            ).innerText;
                            changeCount(item, count);
                            e.target.innerText = "Item Updated!";
                            updatedItem.current.style.display = "flex";
                            setTimeout(() => {
                              updatedItem.current.style.display = "none";
                              e.target.innerText = "Update Cart";
                            }, 1750);
                          }}
                        >
                          Update Cart
                        </button>
                      </div>
                    )}
                  </NavLink>
                );
              }
              return returnedArr;
            })
            .reduce((a, b) => a.concat(b), [])}
        {/* this below makes sure to render the correct category, unless its "ALL" */}
        {category !== "All" &&
          itemsList[category].map((item, index) => {
            return (
              <NavLink
                to={{
                  pathname: `/shop/${category}/${item.name.replaceAll(
                    " ",
                    "-"
                  )}`,
                }}
                key={`${category}${index}`}
                className="categoryItem"
                state={{ item: item }}
              >
                <img src={item.img} className="itemImage" />
                <p className="itemName">{item.name}</p>
                <p className="itemPrice">Price: {numbify(item.price)} ₪</p>
                {cart.findIndex((i) => i.id === item.id) === -1 && (
                  <button
                    className="addToCartButton"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(item);
                    }}
                  >
                    Add to Cart
                  </button>
                )}
                {user && user.admin && category !== "All" && (
                  <button
                    className="removeItemX"
                    onClick={(element) => {
                      element.preventDefault();
                      removeItemFromCategory(category, item);
                    }}
                  >
                    X
                  </button>
                )}
                {/* EDIT ITEM BUTTON */}
                {user && user.admin && category !== "All" && (
                  <button
                    className="removeItemX goRight"
                    onClick={(element) => {
                      element.preventDefault();
                      document.getElementById(
                        `${category}${index}edit`
                      ).style.display = "flex";
                    }}
                  >
                    E
                  </button>
                )}
                <div
                  id={`${category}${index}edit`}
                  className="editItem"
                  onClick={(element) => {
                    element.preventDefault();
                  }}
                >
                  <div className="editInput">
                    <label>Name:</label>
                    <input
                      type="text"
                      placeholder={item.name}
                      id={`${category}${index}name`}
                      className="editActualInput"
                    />
                  </div>
                  <div className="editInput">
                    <label>Price:</label>
                    <input
                      type="number"
                      placeholder={numbify(item.price)}
                      id={`${category}${index}price`}
                      className="editActualInput"
                    />
                  </div>
                  <div className="editInput">
                    <label>Image Link:</label>
                    <input
                      type="text"
                      placeholder={item.img}
                      id={`${category}${index}image`}
                      className="editActualInput"
                    />
                  </div>
                  {/* REMOVE ITEM BUTTON */}
                  <button
                    className="removeItemX exitEdit"
                    onClick={() =>
                      (document.getElementById(
                        `${category}${index}edit`
                      ).style.display = "none")
                    }
                  >
                    X
                  </button>
                  <button
                    className="updateEdit"
                    onClick={() => {
                      const name =
                        document.getElementById(`${category}${index}name`)
                          .value || item.name;
                      const price =
                        +document.getElementById(`${category}${index}price`)
                          .value || item.price;
                      const image =
                        document.getElementById(`${category}${index}image`)
                          .value || item.img;
                      console.log(name + price + image);
                      updateItemInCategory(category, {
                        name: name,
                        price: price,
                        img: image,
                        id: item.id,
                      });
                      document.getElementById(
                        `${category}${index}edit`
                      ).style.display = "none";
                    }}
                  >
                    Update Item
                  </button>
                </div>
                {cart.findIndex((i) => i.id === item.id) !== -1 && (
                  <div
                    className="updateCountDiv"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="updateCount">
                      <button
                        className="changeCount"
                        onClick={() => {
                          let count = document.getElementById(
                            `${item.id}Count`
                          );
                          if (+count.innerText > 1)
                            count.innerText = +count.innerText - 1;
                        }}
                      >
                        -
                      </button>
                      <p>
                        Count:{" "}
                        <span id={`${item.id}Count`}>
                          {cart[cart.findIndex((i) => i.id === item.id)]
                            .count || 1}
                        </span>
                      </p>
                      <button
                        className="changeCount"
                        onClick={() => {
                          let count = document.getElementById(
                            `${item.id}Count`
                          );
                          if (+count.innerText < 9)
                            count.innerText = +count.innerText + 1;
                        }}
                      >
                        <span style={{ marginTop: "0.1rem" }}>+</span>
                      </button>
                    </div>
                    <button
                      className="addToCartButton updateCountButton"
                      onClick={(e) => {
                        e.preventDefault();
                        const count = +document.getElementById(
                          `${item.id}Count`
                        ).innerText;
                        changeCount(item, count);
                        e.target.innerText = "Item Updated!";
                        updatedItem.current.style.display = "flex";
                        setTimeout(() => {
                          updatedItem.current.style.display = "none";
                          e.target.innerText = "Update Cart";
                        }, 1750);
                      }}
                    >
                      Update Cart
                    </button>
                  </div>
                )}
              </NavLink>
            );
          })}
        {/* NEED TO ADD FUNCTIONALITY TO ADD NEW ITEMS FOR ADMIN USERS */}
        {/* LATER */}
        {user && user.admin && category !== "All" && (
          <div className="categoryItem addItem">
            <div className="addItemHidden" ref={addItemHidden}>
              <div className="editInput">
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="iPhone 14 / RTX 3070 Ti / Funko"
                  ref={addItemName}
                  className="editActualInput"
                />
              </div>
              <div className="editInput">
                <label>Price:</label>
                <input
                  type="number"
                  placeholder="4,000 / 965 / 47"
                  ref={addItemPrice}
                  className="editActualInput"
                />
              </div>
              <div className="editInput">
                <label>Image:</label>
                <input
                  type="text"
                  placeholder="https://cdn.somewebsite.com/..."
                  ref={addItemImage}
                  className="editActualInput"
                />
              </div>
              <button
                className="updateEdit"
                onClick={() => {
                  addItemToCategory(category, {
                    name: addItemName.current.value,
                    price: +addItemPrice.current.value,
                    img: addItemImage.current.value,
                  });
                  addItemHidden.current.style.display = "none";
                  addItemName.current.value = "";
                  addItemPrice.current.value = "";
                  addItemImage.current.value = "";
                }}
              >
                Add new Item
              </button>
              <button
                className="removeItemX"
                onClick={() => {
                  addItemHidden.current.style.display = "none";
                }}
              >
                X
              </button>
            </div>
            <button
              className="addItemButton"
              onClick={() => (addItemHidden.current.style.display = "flex")}
            >
              +
            </button>
          </div>
        )}
        <div className="sortButtons">
          <button
            className="sortList"
            onClick={() => sortItems(category, "asc")}
          >
            Price: Low -&gt; High
          </button>
          <button
            className="sortList"
            onClick={() => sortItems(category, "dec")}
          >
            Price: High -&gt; Low
          </button>
        </div>
        <div className="sortButtons" style={{ right: 0 }}>
          <button
            className="sortList"
            onClick={() => sortItems(category, "nameAsc")}
          >
            Name: A -&gt; Z
          </button>
          <button
            className="sortList"
            onClick={() => sortItems(category, "nameDec")}
          >
            Name: Z -&gt; A
          </button>
        </div>
      </div>
    </div>
  );
}

export default Category;
