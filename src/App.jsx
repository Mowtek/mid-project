import React, { useState } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Category from "./components/Category";
import Item from "./components/Item";
import Support from "./components/Support";

function App() {
  const [cart, setCart] = useState([]);

  const [user, setUser] = useState({ name: "Sharon", admin: true });

  // Function to add "," in numbers to look more "professional", converting 1000 to "1,000", 10000 to "10,000" and so on
  function numbify(num) {
    let arr = num.toString().split("");
    if (arr.length % 3 === 0) {
      for (let i = 3; i < arr.length; i = i + 4) {
        arr.splice(i, 0, ",");
      }
    } else if (arr.length % 3 === 1) {
      for (let i = 1; i < arr.length; i = i + 4) {
        arr.splice(i, 0, ",");
      }
    } else if (arr.length % 3 === 2) {
      for (let i = 2; i < arr.length; i = i + 4) {
        arr.splice(i, 0, ",");
      }
    }

    let string = arr.join("");
    return string;
  }
  // change count of specific item in the cart
  function changeCount(item, value) {
    setCart((prev) => {
      return prev.map((cartItem) => {
        if (cartItem.id === item.id) {
          cartItem.count = +value;
          return cartItem;
        }
        return cartItem;
      });
    });
  }

  function addToCart(item) {
    setCart((prev) => {
      return [...prev, { ...item, count: 1 }];
    });
  }

  function removeFromCart(obj) {
    setCart((prev) => {
      return prev.filter((item) => item.id !== obj.id);
    });
  }

  function logOut() {
    setUser(null);
  }

  const [itemsList, setItemsList] = useState({
    Mobile: [
      {
        name: "iPhone 14 Pro Max 256GB - Purple, Unworthy only, go buy a Samsung bro",
        price: 6900,
        img: "https://www.alm.co.il/media/catalog/product/cache/e4d64343b1bc593f1c5348fe05efa4a6/i/p/iphone_14_pro_deep_purple_pure_back_600600.jpg",
        id: "Mobile1",
      },
      {
        name: "Chad Samsung Galaxy S23 Ultra Pro 1,256GB",
        price: 4200,
        img: "https://www.officedepot.co.il/wp-content/uploads/2022/02/back-11.png",
        id: "Mobile2",
      },
      {
        name: "Huawei P?? 256GB Pro? Max? Turbo?",
        price: 900,
        img: "https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/nova9/specs/list-blue.png",
        id: "Mobile3",
      },
    ],
    "Gaming-PCs": [],
    "PC-Parts": [],
    Accessories: [],
    Consoles: [],
    "Funko-Pops": [],
  });

  function addItemToCategory(category, item) {
    setItemsList((prev) => {
      let newObj = {};
      Object.keys(prev).forEach((i) => {
        if (i === category) {
          newObj[i] = [
            ...prev[i],
            {
              name: item.name,
              price: item.price,
              img: item.img,
              id: `${
                item.name[Math.floor(Math.random() * item.name.length)] +
                item.name[Math.floor(Math.random() * item.name.length)] +
                item.name[Math.floor(Math.random() * item.name.length)] +
                item.name[Math.floor(Math.random() * item.name.length)]
              }${category}${prev[i].length + 1}`,
            },
          ];
        } else {
          newObj[i] = prev[i];
        }
      });
      return newObj;
    });
  }

  function removeItemFromCategory(category, item) {
    setItemsList((prev) => {
      let newObj = {};
      Object.keys(prev).forEach((i) => {
        if (i === category) {
          newObj[i] = prev[i].filter((e) => e.id !== item.id);
        } else {
          newObj[i] = prev[i];
        }
      });
      return newObj;
    });
  }

  function updateItemInCategory(category, item) {
    setItemsList((prev) => {
      let newObj = {};
      Object.keys(prev).forEach((i) => {
        if (i === category) {
          newObj[i] = [];
          prev[i].forEach((e) => {
            if (e.id === item.id) {
              newObj[i].push(item);
            } else {
              newObj[i].push(e);
            }
          });
        } else {
          newObj[i] = prev[i];
        }
      });
      return newObj;
    });
  }

  function sortItems(category, dir) {
    setItemsList((prev) => {
      let newObj = {};
      Object.keys(prev).forEach((item) => {
        if (category === item) {
          newObj[item] = prev[item].sort((a, b) => {
            if (dir === "asc" && a.price > b.price) return 1;
            if (dir === "dec" && a.price < b.price) return 1;
            if (dir === "nameAsc" && a.name > b.name) return 1;
            if (dir === "nameDec" && a.name < b.name) return 1;
            return -1;
          });
        } else {
          newObj[item] = [...prev[item]];
        }
      });
      return newObj;
    });
  }

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/mid-project/" element={<Home />} />
        <Route
          path="/mid-project/shop/:category/:item"
          element={
            <Item
              numbify={numbify}
              cart={cart}
              changeCount={changeCount}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/mid-project/shop/:category"
          element={
            <Category
              itemsList={itemsList}
              user={user}
              numbify={numbify}
              addToCart={addToCart}
              sortItems={sortItems}
              cart={cart}
              changeCount={changeCount}
              addItemToCategory={addItemToCategory}
              removeItemFromCategory={removeItemFromCategory}
              updateItemInCategory={updateItemInCategory}
            />
          }
        />
        <Route path="/mid-project/shop" element={<Shop user={user} />} />
        <Route
          path="/mid-project/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              changeCount={changeCount}
              numbify={numbify}
            />
          }
        />
        <Route path="/mid-project/support" element={<Support />} />
      </Routes>
    </div>
  );
}

export default App;
