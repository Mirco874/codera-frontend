

import { getDate, getTime } from "../../helpers/date";
import {useNavigate} from "react-router-dom";
import "./StudentDeliveryCard.css";

export const StudentDeliveryCard = ({delivery}) => {
    const { id, user, task, score, deliveryDate }=delivery;
    
    const navigate=useNavigate();

    const goToDeliveryPage=()=>{
        navigate(`delivery/${id}`);
    }

    return (
        <div className="student-delivery-card" onClick={()=>{goToDeliveryPage()}}>
            <img className="student-photo" src={user.photo} alt={user.fullName} />
            <div className="delivery-data">
                <p>
                    <b>Student: </b> {user.fullName}
                </p>
                <p>
                    <b>Delivery Date: </b> { getDate(deliveryDate) } 
                </p>
                <p>
                    <b>Delivery Time: </b>  { getTime(deliveryDate) }
                </p>
            </div>
            <div className="delivery-status">
                <p >
                    <b>Score: </b> { score===null ? <>Pending</> : <>{score}</> }
                </p>

            </div>
        </div>
    )
}
