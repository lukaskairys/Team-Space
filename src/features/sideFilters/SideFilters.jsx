import React from "react";
import PropTypes from "prop-types";

import Button from "components/button/Button";
import CheckboxesGroup from "./CheckboxesGroup";

import { ReactComponent as Clear } from "assets/icons/x.svg";
import "./sideFilters.scss";

const SideFilters = (props) => {
  const {
    filterItems,
    title,
    clearAll,
    tags,
    handleChange,
    renderInputSlider,
    filterRef,
    isCombined,
  } = props;

  return (
    <div className="side-filter" ref={filterRef} data-filtertype={title}>
      {renderInputSlider ? (
        renderInputSlider()
      ) : (
        <div className="side-filter__list-wrapper">
          <CheckboxesGroup
            key={filterItems}
            title={title}
            filterItems={filterItems}
            filterTags={tags}
            tags={tags}
            handleChange={handleChange}
            isCombined={isCombined}
          />
        </div>
      )}
      <div className="side-filter__top">
        <span>
          {title
            .replace(/([A-Z])/g, " $1")
            .trim()
            .toLowerCase()}
        </span>
        {renderInputSlider ? (
          ""
        ) : (
          <Button
            blankWithBorder={true}
            medium={true}
            handleClick={() => clearAll(filterRef.current)}
            ariaLabelText={`clear all selections from ${title} filter`}
          >
            <span>Clear all</span>
            <Clear className="side-filter__clearX" />
          </Button>
        )}
      </div>
      {isCombined && (
        <span className="side-filter__caption">Combined selection filter</span>
      )}
    </div>
  );
};

SideFilters.propTypes = {
  filterItems: PropTypes.array,
  isCombined: PropTypes.bool,
  title: PropTypes.string,
  clearAll: PropTypes.func,
  tags: PropTypes.shape({
    deviceType: PropTypes.array,
    os: PropTypes.array,
    brand: PropTypes.array,
    genres: PropTypes.array,
  }),
  handleChange: PropTypes.func,
  renderInputSlider: PropTypes.func,
  filterRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default SideFilters;
