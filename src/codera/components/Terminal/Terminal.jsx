import PropTypes from "prop-types"
import "./Terminal.css";

export const Terminal = ({ text, isLoading }) => {
  return (
    <div className="body2 terminal">
    {
          isLoading ? (      
            <div className="loading-spinner">
              <img 
                src="https://www.wpfaster.org/wp-content/uploads/2013/06/circle-loading-gif.gif" 
                alt="loading spinner" 
                height="50px" 
                width="50px" 
              />
              <p className="text-white"> Executing code </p>
            </div>
            )
            : ( 
              <>
              <p className="text-green">
                <i>Console: </i>  
              </p> 
              <p className="text-white">{text}</p>
              </> 
              )
          }
    </div>
  )
}

Terminal.defaultProps={
    text: "",
    isLoading: false
}

Terminal.propTypes={
    text: PropTypes.string,
    isLoading: PropTypes.bool
}