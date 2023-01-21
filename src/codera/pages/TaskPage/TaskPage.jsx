import { useParams } from "react-router-dom";
import { useFetch, useForm } from "../../../hooks";
import { Button } from "../../../ui/components";
import { CodeEditor, CommentarySection, TaskDetail } from "../../components";
import { post } from "../../helpers/post";
import "./TaskPage.css";

export const TaskPage = () => {
  const { taskId }= useParams();

  const { data: task, isLoading }= useFetch(`tasks/${taskId}`);

  const initialForm={ code:"", languageId:0 }

  const { code, languageId, changeValue }= useForm( initialForm );

  const onUpdateLanguageId=(e)=>{
    const { value } =e.target;
    changeValue( "languageId", value.id  )
  }

  const onUpdateCode=(value)=>{
    changeValue( "code", value );
  }

  const sendTaskDelivery= async() =>{
    const body={ taskId:+taskId, languageId, code }; 
    const response= await post("task-deliveries", body );
    console.log(response)
  }


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
                     height="45vh"
                     onSelectorChange={onUpdateLanguageId}
                     onInputChange={onUpdateCode}   
                    />
                    <Button text="Send task" height="35px" width="130px" borderRadius="10px" onClickFunction={sendTaskDelivery}/>

                </div>
            </>
        }
        </div>
      </section>
    </div>
  )
} 
