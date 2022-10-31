import React, { useState, useEffect, useRef } from "react";
import { Route, NavLink, Link } from "react-router-dom";
import "./Home.css";

function addInner(id, str, delay) {
  setTimeout(() => {
    document.getElementById(id).innerHTML = str;
    document.getElementById(id).style.display = "block";
  }, delay * 750);
}

function Home() {
  const h3 = useRef();
  return (
    <div className="contain">
      <h2>
        Welcome to <span className="stroke">PLAY</span>.
      </h2>
      <h3 id="h3">
        {addInner(
          "h3",
          'The <span class="stroke">BEST GAMING EXPERIENCE</span> in <span class="stroke">ISRAEL</span>.',
          1
        )}
      </h3>
      <NavLink
        to="/mid-project/shop"
        id="button"
        onMouseEnter={(e) => {
          e.target.innerHTML = "ONE <span class='stroke'>CLICK</span> AWAY >>";
        }}
        onMouseLeave={(e) => {
          e.target.innerHTML =
            'LEVEL UP YOUR <span class="stroke">GAME</span> >>';
        }}
      >
        {addInner(
          "button",
          'LEVEL UP YOUR <span class="stroke">GAME</span> >>',
          2
        )}
      </NavLink>
    </div>
  );
}

export default Home;
