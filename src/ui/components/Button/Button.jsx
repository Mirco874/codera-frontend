import PropTypes from "prop-types";
import "./Button.css";

export const Button = ({ text, type, height, width }) => {
  switch (type) {
    case "blue":
      return (
        <button
          className="blue-button"
          style={{ height, width}}
        >
          {text}
        </button>
      );
    case "white":
      return <button className="white-button">{text}</button>;
  }
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};

Button.defaultProps = {
  text: "Button",
  type: "blue",
  height:"100px",
  width: "100px"
};
