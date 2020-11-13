import "./eatOutSection.scss";
import React from "react";

const EatOutSection = () => {
  const formTitle = (title) => {
    if (title.length > 26) {
      return title.substring(0, 26) + "...";
    } else {
      return title;
    }
  };
  const favoriteClickHandler = (event) => {
    console.log(event.target.children);
    var classes = event.target.classList;
    if (classes.contains("eatOut-card__favorite--active")) {
      classes.remove("eatOut-card__favorite--active");
    } else {
      classes.add("eatOut-card__favorite--active");
    }
  };
  return (
    <section className="eatOut-card">
      <div>
        <div className="eatOut-card__center">
          <h1 className="eatOut-card__title">
            View all your favorite lunch spots and more{" "}
          </h1>
          <button className="eatOut-card__button">Browse List</button>
        </div>
      </div>
      <div className="grid2">
        <div className="eatOut-card__header">
          <div className="eatOut-card__icons">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.45944 6.45114C7.1015 6.45114 8.43689 5.11576 8.43689 3.47369V2.97745C8.43689 1.33539 7.1015 0 5.45944 0C3.81737 0 2.48199 1.33539 2.48199 2.97745V3.47369C2.48199 5.11576 3.81737 6.45114 5.45944 6.45114Z"
                fill="#FADB5E"
              />
              <path
                d="M9.09214 7.93091C6.75782 7.2843 4.15999 7.2843 1.82518 7.93091C0.750814 8.22865 0 9.2127 0 10.3248V11.9103H10.9173V10.3248C10.9173 9.2127 10.1665 8.22865 9.09214 7.93091Z"
                fill="#FADB5E"
              />
            </svg>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M11.572 4.27044L8.03149 3.75594L6.44999 0.549943C6.40401 0.471872 6.33845 0.407155 6.25979 0.362192C6.18113 0.31723 6.09209 0.293579 6.00149 0.293579C5.91089 0.293579 5.82185 0.31723 5.74319 0.362192C5.66453 0.407155 5.59897 0.471872 5.55299 0.549943L3.96849 3.75594L0.42799 4.27044C0.33566 4.28377 0.2489 4.32266 0.177518 4.38272C0.106136 4.44278 0.0529789 4.52161 0.0240571 4.6103C-0.00486475 4.69899 -0.00839815 4.794 0.0138563 4.88459C0.0361108 4.97519 0.0832656 5.05775 0.14999 5.12294L2.71249 7.61994L2.10799 11.1464C2.09223 11.2384 2.10252 11.3329 2.13768 11.4193C2.17284 11.5057 2.23147 11.5806 2.30695 11.6354C2.38243 11.6902 2.47175 11.7229 2.56479 11.7296C2.65784 11.7363 2.75092 11.7169 2.83349 11.6734L5.99999 10.0089L9.16649 11.6734C9.24906 11.7169 9.34214 11.7363 9.43518 11.7296C9.52823 11.7229 9.61755 11.6902 9.69302 11.6354C9.7685 11.5806 9.82714 11.5057 9.8623 11.4193C9.89746 11.3329 9.90774 11.2384 9.89199 11.1464L9.28749 7.61994L11.85 5.12294C11.9167 5.05781 11.9639 4.97533 11.9862 4.88481C12.0085 4.79429 12.005 4.69934 11.9762 4.61068C11.9474 4.52201 11.8944 4.44317 11.8231 4.38305C11.7519 4.32293 11.6652 4.28392 11.573 4.27044H11.572Z"
                  fill="#31465E"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="12" height="12" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <ul className="eatOut-card__categories">
            <li className="eatOut-card__item">
              <span>Salads</span>
            </li>
            <li className="eatOut-card__item">
              <span>Snacks</span>
            </li>
            <li className="eatOut-card__item">
              <span>Pizza</span>
            </li>
          </ul>
        </div>
        <div className="eatOut-card__subSection">
          <h1 className="eatOut-card__title">
            {formTitle("Restorante Viva Piccola Itelianto u skanu")}
          </h1>
          <svg className="eatOut-card__favoriteContainer" viewBox="0 0 24 22">
            <path
              onClick={favoriteClickHandler}
              className="eatOut-card__favorite--active eatOut-card__favorite"
              d="M20.84 3.60999C20.3292 3.099 19.7228 2.69364 19.0554 2.41708C18.3879 2.14052 17.6725 1.99817 16.95 1.99817C16.2275 1.99817 15.5121 2.14052 14.8446 2.41708C14.1772 2.69364 13.5708 3.099 13.06 3.60999L12 4.66999L10.94 3.60999C9.9083 2.5783 8.50903 1.9987 7.05 1.9987C5.59096 1.9987 4.19169 2.5783 3.16 3.60999C2.1283 4.64169 1.54871 6.04096 1.54871 7.49999C1.54871 8.95903 2.1283 10.3583 3.16 11.39L4.22 12.45L12 20.23L19.78 12.45L20.84 11.39C21.351 10.8792 21.7563 10.2728 22.0329 9.60535C22.3095 8.93789 22.4518 8.22248 22.4518 7.49999C22.4518 6.77751 22.3095 6.0621 22.0329 5.39464C21.7563 4.72718 21.351 4.12075 20.84 3.60999Z"
            />
            {formTitle("Restorante Viva Piccola Itelianto u skanu")}
          </svg>
        </div>
        <time className="eatOut-card__time">10:00 - 21:00</time>
      </div>
      <div className="grid3">
        <div className="eatOut-card__header">
          <ul className="eatOut-card__categories">
            <li className="eatOut-card__item">
              <span>Salads</span>
            </li>
            <li className="eatOut-card__item">
              <span>Snacks</span>
            </li>
            <li className="eatOut-card__item">
              <span>Pizza</span>
            </li>
          </ul>
        </div>
        <div className="eatOut-card__subSection">
          <h1 className="eatOut-card__title">
            {formTitle("Restorante Viva Piccola Itelianto u skanu")}
          </h1>
          <svg className="eatOut-card__favoriteContainer" viewBox="0 0 24 22">
            <path
              onClick={favoriteClickHandler}
              className="eatOut-card__favorite--active eatOut-card__favorite"
              d="M20.84 3.60999C20.3292 3.099 19.7228 2.69364 19.0554 2.41708C18.3879 2.14052 17.6725 1.99817 16.95 1.99817C16.2275 1.99817 15.5121 2.14052 14.8446 2.41708C14.1772 2.69364 13.5708 3.099 13.06 3.60999L12 4.66999L10.94 3.60999C9.9083 2.5783 8.50903 1.9987 7.05 1.9987C5.59096 1.9987 4.19169 2.5783 3.16 3.60999C2.1283 4.64169 1.54871 6.04096 1.54871 7.49999C1.54871 8.95903 2.1283 10.3583 3.16 11.39L4.22 12.45L12 20.23L19.78 12.45L20.84 11.39C21.351 10.8792 21.7563 10.2728 22.0329 9.60535C22.3095 8.93789 22.4518 8.22248 22.4518 7.49999C22.4518 6.77751 22.3095 6.0621 22.0329 5.39464C21.7563 4.72718 21.351 4.12075 20.84 3.60999Z"
            />
          </svg>
        </div>
        <time className="eatOut-card__time">10:00 - 21:00</time>
      </div>
    </section>
  );
};

export default EatOutSection;
