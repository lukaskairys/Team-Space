import React from "react";
import PropTypes from "prop-types";

import Button from "components/button/Button";
import Checkboxes from "./Checkboxes";

import { ReactComponent as Clear } from "assets/icons/x.svg";
import "./sideFilters.scss";

const SideFilters = ({
  filterItems,
  title,
  clearAll,
  tags,
  handleChange,
  renderInputSlider,
  filterRef,
  isCombined,
}) => {
  return (
    <div className="side-filter" ref={filterRef} data-filtertype={title}>
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
          >
            <span>Clear all</span>
            <Clear className="side-filter__clearX" />
          </Button>
        )}
      </div>
      {renderInputSlider ? (
        renderInputSlider()
      ) : (
        <Checkboxes
          key={filterItems}
          title={title}
          filterItems={filterItems}
          filterTags={tags}
          clearAll={clearAll}
          tags={tags}
          handleChange={handleChange}
        />
      )}
      {isCombined && (
        <span className="side-filter__caption">Combined selection filter</span>
      )}
    </div>
  );
};

SideFilters.displayName = "SideFilters";
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
