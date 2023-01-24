import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useFetch, useForm } from "../../../hooks";
import { Button } from "../../../ui/components";
import { CodeEditor, CommentarySection, TaskDetail } from "../../components";
import { post } from "../../helpers/post";
import "./TaskPage.css";

export const TaskPage = () => {

  const { taskId }= useParams();

  const navigate= useNavigate();

  const { data: task, isLoading: loadingTask }= useFetch(`tasks/${taskId}`);

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
    try {
      await post("task-deliveries", body );

      toast.success('you task was sended successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

      setTimeout( ()=> {navigate(-1);}, 1000);
    
    } catch (error) {

      toast.error('Server error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  
  }

    return (
    <div className="main-content">
      <section className="main-layout">
        <div className="detail">
        {
            loadingTask ? (<>Loading</>)
            :
            <>
                <div className="left-section">
                    <TaskDetail  task={task}/>
                    
                </div>
                 
                <div className="right-section">
                    <CodeEditor
                     showDownloadCodeButton={false}
                     defaultLanguageList={task.allowedLanguages}
                     height="45vh"
                     onSelectorChange={onUpdateLanguageId}
                     onInputChange={onUpdateCode}   
                    /> 
                    <Button text="Send task" height="35px" width="130px" borderRadius="10px" onClickFunction={sendTaskDelivery}/>

                </div>
            </>
        }
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
        <ToastContainer />
        </div>
      </section>
    </div>
  )
} 
