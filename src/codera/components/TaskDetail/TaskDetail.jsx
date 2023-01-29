import { getDate, getTime } from "../../helpers/date";
import { AllowedLanguages } from "../AllowedLanguages/AllowedLanguages"
import PropTypes from "prop-types";
import "./TaskDetail.css";

export const TaskDetail = ({ task, showLanguages, showValuePoints }) => {

    const { 
        allowedLanguages,
        id,
        limitDate,
        maxScore,
        taskDescription,
        taskTitle} =task

  return (
    <div className="task-detail">
        <h2 className="header6"><b>{taskTitle} </b></h2>
        <p className="body2">{taskDescription}</p>
        {
          showValuePoints &&  <p> <b>Value: </b>{maxScore} points.</p>
        }
       
        <p className="body2"> <b>Until:</b> {`${getDate(limitDate)} ${getTime(limitDate)}`} </p>
        {
          showLanguages && <AllowedLanguages languagesList={allowedLanguages}/>
        }
    </div>
  )
}

TaskDetail.defaultProps={
  task : null ,
  showLanguages: true , 
  showValuePoints: true
}

TaskDetail.propTypes={
  task : PropTypes.object.isRequired ,
  showLanguages: PropTypes.bool , 
  showValuePoints: PropTypes.bool
}