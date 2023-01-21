import {RxLapTimer} from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { Button, RemainingDaysLabel } from "../../../ui/components";
import { AllowedLanguages } from "../";
import "./TaskCard.css"

export const TaskCard = ({ task }) => {

    const navigate= useNavigate();
    const { 
            id,
            taskTitle: title,
            taskDescription: description,
            limitDate,
            allowedLanguages } =task;
    
    const goToTask= () =>{
        navigate(id.toString());
    }

    return (
        <div className="card">
              <div className="header">
                    <h4>{title}</h4>
                    <div className="limit-date">
                        <RxLapTimer />
                        <p><b>Limit date: </b> {limitDate} </p>
                    </div>
                </div>

            <hr />

            <div className="body">
                <p>{description}</p> 
                <AllowedLanguages languagesList={allowedLanguages}/>
            </div> 

            <div className="footer">
                <RemainingDaysLabel limitDate={limitDate} />
                <>sadsadasd</>
                <Button text="Check task" type="white" borderRadius="10px" height="35px" width="130px" onClickFunction={goToTask} />
            </div>
         
        </div>

    )
}

{/* */}