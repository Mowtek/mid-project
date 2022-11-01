import React, { useState, useRef } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

function Header({ user, setUser }) {
  const [openHeader, setOpenHeader] = useState(false);

  function handleClick() {
    if (openHeader) {
      header.current.style.height = "10vh";
      headerList.current.style.display = "none";
      setOpenHeader(false);
    } else {
      header.current.style.height = "100vh";
      headerList.current.style.display = "flex";
      setOpenHeader(true);
    }
  }

  const headerList = useRef();
  const header = useRef();

  const userName = useRef();
  const userAdmin = useRef();

  const some = useRef();

  return (
    <header ref={header}>
      <div>
        <button id="hamburger" onClick={handleClick}>
          <div className="hambrow"></div>
          <div className="hambrow"></div>
          <div className="hambrow"></div>
        </button>
      </div>
      <div className="h1-user">
        <NavLink
          to="/"
          id="h1"
          className={({ isActive }) => (isActive ? "" : "")}
        >
          <h1>PLAY</h1>
        </NavLink>
      </div>
      <div id="header-right" ref={headerList}>
        <button id="closehamb" onClick={handleClick}>
          <div className="x rotateleft"></div>
          <div className="x rotateright"></div>
        </button>
        <NavLink
          to="/mid-project/"
          className={({ isActive }) =>
            isActive ? "nav-link current" : "nav-link"
          }
        >
          HOME
        </NavLink>
        <NavLink
          to="/mid-project/shop"
          className={({ isActive }) =>
            isActive ? "nav-link current" : "nav-link"
          }
        >
          SHOP
        </NavLink>
        <NavLink
          to="/mid-project/support"
          className={({ isActive }) =>
            isActive ? "nav-link current" : "nav-link"
          }
        >
          SUPPORT
        </NavLink>
        <NavLink
          to="/mid-project/cart"
          className={({ isActive }) =>
            isActive ? "cart nav-link current" : "cart nav-link"
          }
        >
          <i className="fa-solid fa-bag-shopping fa-xl"></i>
        </NavLink>
      </div>
      <div className="changeDetails">
        <div className="changeInput">
          <label>Name:</label>
          <input
            type="text"
            placeholder={user.name}
            className="changeDetailsInput"
            ref={userName}
          />
        </div>
        <div className="changeInput">
          <label>Are you an admin?</label>
          <input
            type="checkbox"
            className="changeDetailsInput"
            ref={userAdmin}
          />
        </div>
        <button
          className="changeDetailsButton"
          onClick={() => {
            setUser({
              name: userName.current.value,
              admin: userAdmin.current.checked,
            });
            console.log(user.name);
          }}
        >
          Update Details
        </button>
      </div>
    </header>
  );
}

export default Header;
