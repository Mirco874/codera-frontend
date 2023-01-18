import PropTypes from "prop-types";
import {BsQuestionDiamondFill} from "react-icons/bs"
import {useNavigate} from "react-router-dom";
import './OptionButton.css'

export const OptionButton = ({ icon, text, navigateTo }) => {
  const navigate=useNavigate();

  const redirect=()=>{
    navigate(navigateTo);
  }


  return (
    <div className="option-button" onClick={redirect}>
      {icon}
      <p className="sub-title2">{text}</p>
    </div>
  );
};

OptionButton.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  navigateTo:PropTypes.string
};

OptionButton.defaultProps = {
    icon: <BsQuestionDiamondFill/>,
    text: "text",
    navigateTo:""
  };