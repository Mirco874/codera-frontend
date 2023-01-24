import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./LinkedText.css";

export const LinkedText = ({ children, path, back , className  }) => {
    const navigate= useNavigate();

    const backToPreviusPage=()=>{
        navigate(-1);
    }
  return (
    back ?
    <Link className= {`linked-text header ${className} `} onClick={backToPreviusPage} > {children} </Link>
    : 
    <Link className= {`linked-text header ${className} `} to={path}> {children} </Link>

  )
}

LinkedText.defaultProps={
    text:"",
    path:"#",
    back:false,
    className:"" 
}

LinkedText.propTypes={
    text:PropTypes.string,
    path:PropTypes.string,
    back:PropTypes.bool,
    className:PropTypes.string 
}
