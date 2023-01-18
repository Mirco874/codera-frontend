import PropTypes from "prop-types";
import "./Button.css";

export const Button = ({ text, type, height, width, variation, borderRadius, onClickFunction }) => {

  const handleClick=(e)=>{
    e.preventDefault();
    onClickFunction();
  }

  switch (type) {
    case "white":
      return (
        <button
          className="button white-button button-text"
          style={{ height, width, borderRadius }}
          type={variation}
          onClick={handleClick}
        >
        {text}
        </button>
      );

      case "red":
        return (
          <button
            className="button red-button button-text"
            style={{ height, width, borderRadius }}
            type={variation}
            onClick={handleClick}
          >
          {text}
          </button>
        );

    default:
      return (
        <button
          className="button blue-button"
          style={{ height, width, borderRadius }}
          type={variation}
          onClick={handleClick}
        >
          <p className="button-text">{text}</p>  
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
  borderRadius:PropTypes.string,
  onClickFunction:PropTypes.func
};

Button.defaultProps = {
  text: "Button",
  type: "blue",
  height: "100px",
  width: "100px",
  variation: "button",
  borderRadius:"0",
  onClickFunction:()=>{console.log("pressed")
}
};
