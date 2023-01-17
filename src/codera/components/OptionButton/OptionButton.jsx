import PropTypes from "prop-types";
import {BsQuestionDiamondFill} from "react-icons/bs"
import './OptionButton.css'

export const OptionButton = ({ icon, text }) => {
  return (
    <div className="option-button">
      {icon}
      <p className="sub-title2">{text}</p>
    </div>
  );
};

OptionButton.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
};

OptionButton.defaultProps = {
    icon: <BsQuestionDiamondFill/>,
    text: "text",
  };