import { getDate, getTime } from "../../helpers/date";
import { AllowedLanguages } from "../AllowedLanguages/AllowedLanguages"
import "./TaskDetail.css";

export const TaskDetail = ({task}) => {
    const { 
        allowedLanguages,
        id,
        limitDate,
        maxScore,
        taskDescription,
        taskTitle} =task

  return (
    <div>
        <h2>{taskTitle}</h2>
        <p>{taskDescription}</p>
        <p> <b>Value: </b>{maxScore} points.</p>
        <p> <b>Until:</b> {`${getDate(limitDate)} ${getTime(limitDate)}`} </p>
        <AllowedLanguages languagesList={allowedLanguages}/>
    </div>
  )
}
