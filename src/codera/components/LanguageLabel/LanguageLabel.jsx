import PropTypes from "prop-types";
import {IoMdClose} from "react-icons/io";
import "./LanguageLabel.css";

export const LanguageLabel = ({name, onClose}) => {
  return (
    <div className="language-label">
      <p className="text-button label-text">{name}</p> 
      <button className="close-button" onClick={onClose} > <IoMdClose/>  </button>
    </div>
  )
}

LanguageLabel.defaultProps={
    name:"label",
    onClose:()=>{console.log("closed")}
}

LanguageLabel.propTypes={
    name:PropTypes.string,
    onClose:PropTypes.func
}





