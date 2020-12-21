import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

import "./inputSlider.scss";

const InputSlider = ({ min, max, step, setCounter }) => {
  const [internalCount, setInternalCount] = useState(min);
  let rangeV = useRef(null);
  let range = useRef(null);
  const handleGlobalChange = debounce((e) => {
    setCounter(parseInt(e.target.value));
  }, 250);

  const handleChange = (e) => {
    setInternalCount(e.target.value);
    setValue();
    handleGlobalChange(e);
  };

  const setValue = () => {
    const newValue = Number(
        ((range.current.value - range.current.min) * 100) /
          (range.current.max - range.current.min)
      ),
      newPosition = 10 - newValue * 0.2;
    rangeV.current.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };

  useEffect(() => {
    setValue();
  }, []);

  return (
    <div className="range-slider">
      <div ref={rangeV} className="range-slider__value-container" id="rangeV">
        <span className="range-slider__value">{internalCount} </span>
      </div>
      <input
        ref={range}
        className="range-slider__input"
        id="range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={internalCount}
        onChange={handleChange}
      />
      <div className="range-slider__min-max">
        <label htmlFor="input-range__min">{min}</label>
        <label htmlFor="input-range__max">{max}</label>
      </div>
    </div>
  );
};

InputSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  setCounter: PropTypes.func,
};

export default InputSlider;
