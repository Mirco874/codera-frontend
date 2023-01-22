import { useParams } from "react-router-dom";
import { TaskCard } from "../../components";
import {useFetch} from "../../../hooks";

import "./CheckTasksPage.css";

export const CheckTasksPage = () => {
    const { classId}=useParams();
    const{ data: taskList, isLoading: loadingTasks }= useFetch(`tasks?classGroupId=${classId}`);

    console.log(taskList);

  return (
    <div className="main-content">
      <section className="main-layout">
        {loadingTasks? <>loading</> 
        :
        <ul className="tasks">
            {
                taskList.map((task)=>(
                <li>
                    <TaskCard 
                        task={task}
                        showRemainingDays={false}
                        showEditButton={true}
                        showDeleteButton={true}
                        onDelete={()=>{}}
                        onEdit={()=>{}}
                        onClick={()=>{ goToDeliveries( task.id ) }}
                        buttonText="Check deliveries"
                    />
                </li>
                ))
            }
        </ul>

        }
      </section>
    </div>
  )
}
