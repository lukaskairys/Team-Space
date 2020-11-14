import React from "react";
import "./person.scss";

const Person = (counter) => {
  return (
    <div className="person-container">
      <div className="person-container__items">
        <svg className="person-container__icon" viewBox="0 0 12 12">
          <path
            d="M5.45944 6.45114C7.1015 6.45114 8.43689 5.11576 8.43689 3.47369V2.97745C8.43689 1.33539 7.1015 0 5.45944 0C3.81737 0 2.48199 1.33539 2.48199 2.97745V3.47369C2.48199 5.11576 3.81737 6.45114 5.45944 6.45114Z"
            fill="#FADB5E"
          />
          <path
            d="M9.09214 7.93091C6.75782 7.2843 4.15999 7.2843 1.82518 7.93091C0.750814 8.22865 0 9.2127 0 10.3248V11.9103H10.9173V10.3248C10.9173 9.2127 10.1665 8.22865 9.09214 7.93091Z"
            fill="#FADB5E"
          />
        </svg>
        <span className="person-container__counter">{counter}</span>
      </div>
    </div>
  );
};
export default Person;
