import {BsInfoCircleFill} from "react-icons/bs"
import './InfoMessage.css'
export const InfoMessage = ({ text }) => {
  return (
    <div className="informative-message">
      <BsInfoCircleFill /><p className="informative-text body2">{text}</p> 
    </div>
  );
};
