import { LanguageIcon } from "../../../ui/components";
import { getDate, getTime } from "../../helpers/date"
import PropTypes from "prop-types";

import "./DeliveryDetail.css"
import { LanguageLabel } from "../LanguageLabel/LanguageLabel";

export const DeliveryDetail = ({ student, selectedLanguage,  deliveryDate, score }) => {

  
  return (
    <div className="">
      {
        student !==null && (
          <>
            <h4>Student: </h4>
            <p> <b>Name: </b>{ student.fullName } </p>
            <p> <b>Email: </b>{ student.email } </p>
          </>
          )
      }
      {
      selectedLanguage !== null && (
        <div className="selected-languages">
          <p><b>Selected Language: </b>{selectedLanguage.name} </p>
        </div>
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



