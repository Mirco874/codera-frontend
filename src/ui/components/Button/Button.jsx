import PropTypes from "prop-types";
import "./Button.css";

export const Button = ({ text, type, height, width, variation }) => {
  switch (type) {
    case "blue":
      return (
        <button className="blue-button" style={{ height, width }} type={variation} >{text}</button>
      );
    case "white":
      return (
        <button className="white-button" type={variation}> {text} </button>
      );
  }
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  variation:PropTypes.string,
};

Button.defaultProps = {
  text: "Button",
  type: "blue",
  height: "100px",
  width: "100px",
  variation:"button"
};
