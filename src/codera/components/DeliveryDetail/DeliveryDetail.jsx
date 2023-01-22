import { getDate, getTime } from "../../helpers/date"
import "./DeliveryDetail.css"

export const DeliveryDetail = ({deliveryDate, score}) => {
  return (
    <div>
        <p> <b>Delivered:</b> { `${getDate(deliveryDate)} ${getTime(deliveryDate)}` }</p>
        <p> <b>Score:</b> {
            score===null ? <>Pending.</>
            :<> 
            {score}
            </>
        }</p>
    </div>
  )
}
