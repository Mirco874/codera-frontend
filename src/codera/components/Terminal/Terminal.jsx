import PropTypes from "prop-types"
import "./Terminal.css";

export const Terminal = ({text}) => {
  return (
    <div className="body2 terminal">
    <p className="text-green"><i>Console: </i>  </p> <p className="text-white">{text}</p> 
    </div>
  )
}

Terminal.defaultProps={
    text:""
}

Terminal.propTypes={
    text:PropTypes.string
}