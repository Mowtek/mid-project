import React from "react";
import "./Support.css";

function Support() {
  return (
    <div id="support">
      <form className="supportForm">
        <h2 className="head">Need our help?</h2>
        <p className="underhead">
          Fill the form and we'll help as soon as we can.
        </p>
        <div className="input">
          <label for="fullname">Full Name:</label>
          <input type="text" id="fullname" spellCheck="false" />
        </div>
        <div className="input">
          <label for="email">Email Address:</label>
          <input type="email" id="email" spellCheck="false" />
        </div>
        <div className="input">
          <label for="reason">Select Category:</label>
          <select id="reason">
            <option value={"payment"}>Payment Problems</option>
            <option value={"shipping"}>Shipping Issues</option>
            <option value={"falseinfo"}>False Information</option>
            <option value={"other"}>Other / General Question</option>
          </select>
        </div>
        <div className="input">
          <label for="textarea">Message:</label>
          <textarea id="textarea"></textarea>
        </div>
        <input type="submit" id="submitForm" />
      </form>
      <div>
        <h2 className="head">Need faster help?</h2>
        <div className="contactUsContainer">
          <div>
            <h3 className="contactUs">Contact us by Mail:</h3>
            <p className="contactInfo">Mowsplace@gmail.com</p>
          </div>
          <div>
            <h3 className="contactUs">Contact us by Phone:</h3>
            <p className="contactInfo">+972 056-7891234</p>
          </div>
          <div>
            <h3 className="contactUs">Or just visit us at:</h3>
            <p className="contactInfo">Ice Mall, Kampen 8, Eilat</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Support;
