import { useFetch } from "../../../hooks"
import { useParams, useNavigate } from "react-router-dom";
import { TaskCard } from "../../components";
import "./PendingTaskPage.css"

export const PendingTaskPage = () => {
    const {classId} = useParams();
    
    const { data:tasks, isLoading  } =useFetch(`tasks/todo?classId=${classId}`);
    
    const { data: classGroup , isLoading: loadingClassGroup } = useFetch(`classes/${classId}`);

    const navigate= useNavigate();

    const goToTask= (taskId) =>{
      navigate(taskId.toString());
  }

  return (
    <div className="main-content">
      <section className="main-layout">
        {
          loadingClassGroup ? ( <>Loading..</>  ) : 
          (<h2 className="h6 section-title"> My classes {">"} { classGroup.className }  {">"} New tasks</h2>)
        }
        <div className="tasks">
          {
            (!isLoading) &&  tasks.map((task)=>(
            <TaskCard 
              task={task}
              buttonText="Check task"
              onClickButton={()=>{goToTask(task.id)}}
            />
            ) 
            )
          } 
        </div>
      </section>
    </div>
  )
}
 