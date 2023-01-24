import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./LinkedText.css";

export const LinkedText = ({ children, path, className  }) => {
  return (
    <Link className= {`linked-text header ${className} `} to={path}> {children} </Link>
  )
}

LinkedText.defaultProps={
    text:"",
    path:"#" ,
    className:"" 
}

LinkedText.propTypes={
    text:PropTypes.string,
    path:PropTypes.string,
    className:PropTypes.string 
}
