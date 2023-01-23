import {RxLapTimer} from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { Button, RemainingDaysLabel } from "../../../ui/components";
import { AllowedLanguages } from "../";
import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";

import "./TaskCard.css";
import { MdModeEditOutline } from "react-icons/md";
import { getDate, getTime } from "../../helpers/date";

export const TaskCard = ({ task,
    showRemainingDays,
    showEditButton,
    showDeleteButton,
    buttonText,
    onDelete,
    onEdit,
    onClickButton
     }) => {

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
                        <p><b>Limit date: </b> {getDate(limitDate)} {getTime(limitDate)}   </p>
                    </div>
                    <div>
                    {
                        showEditButton && <button className="edit-button" onClick={onEdit}> <MdModeEditOutline/> </button>
                    }
                    {
                        showDeleteButton && <button className="delete-button" onClick={onDelete}> <FaTrashAlt/> </button>
                    }
                    </div>  
                </div>

            <hr />

            <div className="body">
                <p>{description}</p> 
                <AllowedLanguages languagesList={allowedLanguages}/>
            </div> 

            <div className="footer">
                {
                    showRemainingDays && <RemainingDaysLabel limitDate={limitDate} />
                }
                <Button text={buttonText} type="white" borderRadius="10px" height="35px" width="140px" onClickFunction={onClickButton} />
            </div>
         
        </div>

    )
}

TaskCard.defaultProps={
    task: {},
    showRemainingDays: true,
    showEditButton: false,
    showDeleteButton: false,
    buttonText:"button",
    onDelete: ()=>{} ,
    onEdit: ()=>{} ,
    onClickButton: ()=>{}
}

TaskCard.propTypes={
    task: PropTypes.object,
    showRemainingDays: PropTypes.bool,
    showEditButton: PropTypes.bool,
    showDeleteButton: PropTypes.bool,
    buttonText: PropTypes.string,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func,
    onClickButton: PropTypes.func,
}