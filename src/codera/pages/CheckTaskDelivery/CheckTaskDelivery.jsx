import {useParams} from "react-router-dom";
import { useFetch } from "../../../hooks";
import { StudentDeliveryCard } from "../../components";

import "./CheckTaskDelivery.css";

export const CheckTaskDelivery = () => {
  const {taskId}= useParams();
  const { data:deliveries, isLoading: deliveriesLoading }= useFetch(`task-deliveries?taskId=${taskId}`);
  console.log(deliveries)

  return (
    <div className="main-content">
      <section className="main-layout">
        <div className="task-deliveries">
          {
            deliveriesLoading ? <>Loading</>
            :
            <ul className="card-deliveries">
              {deliveries.map((delivery)=>(
                <li>
                <StudentDeliveryCard delivery={delivery}/>
              </li>
              )
              )}
            </ul>
          }


        </div>
      </section>
    </div>
  )
}
