import PropTypes from "prop-types";
import { getDate, getTime } from "../../helpers/date";
import "./DeliveryDetail.css";

export const DeliveryDetail = ({ student, selectedLanguage,  deliveryDate, score }) => {

  
  return (
    <div className="delivery-detail-section">
      {
        student !==null && (
          <>
            <h4 className="subtitle2"> <b>Student:</b>  </h4>
            <p className="body2"> <b>Name: </b>{ student.fullName } </p>
            <p className="body2"> <b>Email: </b>{ student.email } </p>
          </>
          )
      }
      {
      selectedLanguage !== null && (
          <p><b>Selected Language: </b>{selectedLanguage.name} </p>
        )
      }
    <p> <b>Delivered:</b> { `${getDate(deliveryDate)} ${getTime(deliveryDate)}` }</p>

    <p> <b>Score:</b> {
    score===null ? <>Pending.</>
    : <> {score}</>
}
</p>

    </div>
  )
}

DeliveryDetail.defaultProps={
  student: null , 
  selectedLanguage: null,  
  deliveryDate: "" , 
  score: ""
}

DeliveryDetail.propTypes={
  student: PropTypes.object , 
  selectedLanguage: PropTypes.object,  
  deliveryDate: PropTypes.string, 
  score: PropTypes.string
}



