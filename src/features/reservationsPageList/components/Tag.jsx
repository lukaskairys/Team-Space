import React from "react";
import PropTypes from "prop-types";

import Button from "components/button/Button";
import { ReactComponent as IconX } from "assets/icons/x.svg";

import "./tag.scss";

function Tag({ name, handleSingleTag }) {
  return (
    <div className="tag">
      <span className="tag__name">{name}</span>
      <Button empty dataTagName={name} handleClick={handleSingleTag}>
        <IconX
          className="tag__icon"
          data-tag-name={name}
          onClick={handleSingleTag}
        />
      </Button>
    </div>
  );
}

Tag.propTypes = {
  name: PropTypes.string,
  handleSingleTag: PropTypes.func,
};

export default Tag;
