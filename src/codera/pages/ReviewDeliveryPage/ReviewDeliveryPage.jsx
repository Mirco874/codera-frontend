import { useContext } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useFetch, useForm } from "../../../hooks";
import { ApplicationContext } from "../../../provider";
import { Button, DefaultSelector, InfoMessage } from "../../../ui/components";
import { CodeEditor, CommentarySection, DeliveryDetail, TaskDetail } from "../../components";
import { post } from "../../helpers/post";
import { updateFromAPI } from "../../helpers/updateFromAPI";

import "./ReviewDeliveryPage.css";

export const ReviewDeliveryPage = () => {
  const {deliveryId}= useParams();
  const { data:delivery , isLoading: loadingDelivery, fetchData: reloadData } = useFetch(`task-deliveries/${deliveryId}`);
  const { scoreList } = useContext(ApplicationContext);
  const { score, onFormChange } =useForm({ score: null });

  const uploadDeliveryCalification= async () =>{
    if(score.id<=delivery.task.maxScore){

      const body={
        score: score.id
      };

      await updateFromAPI(`task-deliveries/${delivery.id}/update-score`, body);

      toast.success('Task graded successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        reloadData();
    }

  else{
    toast.error('The score must be less than or equal to the maximum', {
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

        <div className="delivery-detail">
            {
                loadingDelivery ? (<>Loading</>)
                :
                <>
                    <div className="left-section">
                        <TaskDetail  
                          task={delivery.task}
                          showLanguages= {false}
                          showValuePoints= {false} 
                        />
                        <DeliveryDetail 
                          student={delivery.user} 
                          selectedLanguage={delivery.language}  
                          deliveryDate={delivery.deliveryDate} 
                          score={delivery.score}
                        />
                        
                        <InfoMessage text="you can set the note or update the note" />
                        
                        <div className="calification-section">
                          <DefaultSelector objectList={scoreList} name="score"  defaultValue={score} onChange={onFormChange} />
                          <p className="gray-text ">out of</p> {delivery.task.maxScore}
                          <Button text="Rate" 
                                type="purple" 
                                height="35px" 
                                width="60px" 
                                borderRadius="10px" 
                                onClickFunction={uploadDeliveryCalification}
                        />
                        </div>
                        <CommentarySection deliveryId={delivery.id} />
                    </div>
                         
                        <div className="right-section">
                        <CodeEditor
                            readOnly= {true}
                            defaultCode= {delivery.code}
                            defaultLanguage= {delivery.language}
                            showDownloadCodeButton={false}
                            showLanguagesSelector={false}
                            showAutoCompleteCheckbox={false}
                            showSnippetsCheckbox={false}
                            height="45vh"
                            />
                        </div>
                </>
            }
        </div>
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
      </section>
    </div>
  )
}
