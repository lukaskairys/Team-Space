import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import "./inputSlider.scss";

const InputSlider = ({ min, max, step, setCounter }) => {
  const [internalCount, setInternalCount] = useState(min);
  let rangeV = useRef(null);
  let range = useRef(null);

  const handleGlobalChange = debounce((e) => {
    setCounter(parseFloat(e.target.value));
  }, 250);

  const handleChange = (e) => {
    setInternalCount(e.target.value);
    moveContainer();
    handleGlobalChange(e);
  };

  const moveContainer = () => {
    const newValue = Number(
        ((range.current.value - range.current.min) * 100) /
          (range.current.max - range.current.min)
      ),
      newPosition = 10 - newValue * 0.2;
    rangeV.current.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };

  useEffect(() => {
    moveContainer();
  }, []);

  return (
    <section className="range-slider">
      <p id="sliderDescription" aria-hidden={true} className="visually-hidden">
        Use the arrow keys to change the value.
      </p>
      <input
        ref={range}
        className="range-slider__input"
        aria-label="range filter slider."
        id="range"
        type="range"
        aria-describedby="sliderDescription"
        min={min}
        max={max}
        step={step}
        value={internalCount}
        onChange={handleChange}
      />

      <p className="visually-hidden">
        {`Is the current Value. Slider values range from ${min} to ${max}`}
      </p>

      <div ref={rangeV} className="range-slider__value-container" id="rangeV">
        <p className="range-slider__value" aria-hidden={true}>
          {internalCount}+{" "}
        </p>
      </div>
      <div className="range-slider__min-max">
        <p aria-hidden={true} id="range-slider__min">
          {min}
        </p>
        <p aria-hidden={true} id="range-slider__max">
          {max}
        </p>
      </div>
    </section>
  );
};

InputSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  setCounter: PropTypes.func,
};

export default InputSlider;
