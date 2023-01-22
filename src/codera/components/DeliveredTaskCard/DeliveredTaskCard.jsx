import { AiOutlineFieldTime } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import {TbCalendar, TbCalendarTime} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../ui/components";
import { getDate, getTime } from "../../helpers/date";
import "./DeliveredTaskCard.css";

export const DeliveredTaskCard = ({ delivery }) => {
    const { id, task, score, deliveryDate }= delivery;
    const navigate= useNavigate();

    const goToDelivery=()=>{
        navigate(id.toString());
    }

  return (
    <div className="task-delivered-card">
        <div className="title">
            <div className="blue-line"></div>
            <h4>{task.taskTitle}</h4>
        </div>
        
        <div className="body">
        <p>
            <TbCalendarTime/> <b>Limit date: </b> {getDate(task.limitDate)}
        </p>

        <p>
        <BiTime/> <b>Limit time: </b> {getTime(task.limitDate)}
        </p>

        <p>
            <TbCalendar/> <b>Delivered date: </b> {getDate(deliveryDate)}
        </p>

        <p>
        <AiOutlineFieldTime/> <b>Delivered time: </b> {getTime(deliveryDate)}
        </p>

        <p>
            <b>Score: </b>
            {
                score===null ? <>Pending.</>
                :
                <>{ score } / { task.maxScore }</>
            }
        </p>

        <Button text="See more" type="white" height="15%" width="40%" borderRadius="10px" onClickFunction={goToDelivery}/>
    
        </div>

    </div>
  )
}
