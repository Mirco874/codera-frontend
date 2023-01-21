import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks";
import { CodeEditor, CommentarySection, TaskDetail } from "../../components";
import "./TaskPage.css";

export const TaskPage = () => {
    const { taskId }= useParams();
    const { data: task, isLoading }= useFetch(`tasks/${taskId}`);

    return (
    <div className="main-content">
      <section className="main-layout">
        <div className="detail">
        {
            isLoading ? (<>Loading</>)
            :
            <>
                <div className="left-section">
                    <TaskDetail  task={task}/>
                    <CommentarySection />
                </div>
                
                <div className="right-section">
                    <CodeEditor
                     showDownloadCodeButton={false}   
                    />
                </div>
            </>
        }
        </div>
      </section>
    </div>
  )
}
