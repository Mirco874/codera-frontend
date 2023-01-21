import { useFetch } from "../../../hooks"
import { useParams } from "react-router-dom";
import { TaskCard } from "../../components";
import "./PendingTaskPage.css"

export const PendingTaskPage = () => {
    const {classId} = useParams();
    const { data:tasks, isLoading  } =useFetch(`tasks/todo?classId=${classId}`);
    const { data: classGroup ,
      isLoading: loadingClassGroup } = useFetch(`classes/${classId}`);


  return (
    <div className="main-content">
      <section className="main-layout">
        {
          loadingClassGroup ? ( <>Loading..</>  ) : 
          (<h2 className="h6 section-title"> My classes {">"} { classGroup.className }  {">"} New tasks</h2>)
        }
        <div className="tasks">
          {
            (!isLoading) &&  tasks.map((task)=>(<TaskCard task={task}/>) )
          } 
        </div>
      </section>
    </div>
  )
}
 