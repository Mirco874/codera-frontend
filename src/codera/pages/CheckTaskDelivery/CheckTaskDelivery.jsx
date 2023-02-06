import {useParams} from "react-router-dom";
import { useFetch } from "../../../hooks";
import { InfoMessage } from "../../../ui/components";
import { LinkedText, StudentDeliveryCard } from "../../components";

import "./CheckTaskDelivery.css";

export const CheckTaskDelivery = () => {
  const { taskId, classId }= useParams();
  
  const { data:deliveries, isLoading: deliveriesLoading }= useFetch(`task-deliveries?taskId=${taskId}`);

  const { data: classGroup , isLoading: loadingClassGroup } = useFetch(`classes/${classId}`);

  const { data: task , isLoading: loadingTask } = useFetch(`tasks/${taskId}`);

  return (
    <div className="main-content">
      <section className="main-layout">
        <div className="task-deliveries">
          {
            (loadingClassGroup || deliveriesLoading || loadingTask) ? <>Loading</>
            :
            <>
              <h2 className="header6 section-title">
                <LinkedText className="header6" path="/classes">
                  My classes
                </LinkedText> 

                  {">"} 

                <LinkedText className="header6" path={ `/classes/${classGroup.id}` }>
                  { classGroup.className } 
                </LinkedText>

                  {">"} 
                <LinkedText className="header6" back={true}>
                  check tasks
                </LinkedText>
                  {"> "} 
                  {task.taskTitle}
              </h2> 
              <InfoMessage text="You can see the deliveries in this section" />
              <ul className="card-deliveries">
                {deliveries.map(
                  (delivery)=>
                  (
                    <li>
                    <StudentDeliveryCard delivery={delivery}/>
                    </li>
                  )
                )
                }
              </ul>
            </>
          }


        </div>
      </section>
    </div>
  )
}
