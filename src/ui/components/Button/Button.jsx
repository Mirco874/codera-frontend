import PropTypes from "prop-types";
import "./Button.css";

export const Button = ({ text, type, height, width, variation }) => {
  switch (type) {
    case "white":
      return (
        <button className="white-button button-text" type={variation}>
          {text}
        </button>
      );
    default:
      return (
        <button
          className="blue-button button-text"
          style={{ height, width }}
          type={variation}
        >
          {text}
        </button>
      );
  }
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  variation: PropTypes.string,
};

Button.defaultProps = {
  text: "Button",
  type: "blue",
  height: "100px",
  width: "100px",
  variation: "button",
};
