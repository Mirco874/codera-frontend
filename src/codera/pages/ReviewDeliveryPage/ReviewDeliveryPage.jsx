import { useContext } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Element } from 'react-scroll';
import { useFetch, useForm } from "../../../hooks";
import { ApplicationContext } from "../../../provider";
import { updateFromAPI } from "../../helpers/updateFromAPI";
import { CodeEditor, CommentarySection, DeliveryDetail, Loading, TaskDetail } from "../../components";
import { Button, DefaultSelector, InfoMessage } from "../../../ui/components";
import "./ReviewDeliveryPage.css";

export const ReviewDeliveryPage = () => {

  const { deliveryId }= useParams();
  
  const { scoreList } = useContext( ApplicationContext );

  const { score, onFormChange } =useForm({ score: null });

  const { data:delivery , 
          isLoading: loadingDelivery, 
          fetchData: reloadData } = useFetch(`task-deliveries/${ deliveryId }`);

  const uploadDeliveryCalification= async () =>{

    if( score.id <= delivery.task.maxScore ){

      const body={
        score: score.id
      };

      await updateFromAPI(`task-deliveries/${ delivery.id }/update-score`, body);

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
                loadingDelivery ? <Loading/>
                :
                <>
                  <div className="left-section">
                  <Element className="task-information-scroll scroll" >
                      <TaskDetail  
                        task= { delivery.task }
                        showLanguages= { false }
                        showValuePoints= { false } 
                      />
                      <DeliveryDetail 
                        student= { delivery.user } 
                        selectedLanguage= { delivery.language }  
                        deliveryDate= { delivery.deliveryDate } 
                        score= { delivery.score }
                      />
                      
                      <InfoMessage text="you can set the note or update the note" />
                      
                      <div className="calification-section">
                        <DefaultSelector 
                          objectList= { scoreList } 
                          name="score"  
                          defaultValue= { score } 
                          onChange= { onFormChange } 
                        />

                        <p className="gray-text ">out of</p> <p>{delivery.task.maxScore}</p> 

                        <Button 
                          text="Rate" 
                          type="purple" 
                          height="35px" 
                          width="60px" 
                          borderRadius="10px" 
                          onClickFunction= { uploadDeliveryCalification }
                      />
                    
                    </div>
                    </Element>

                    <Element className="commentary-scroll scroll " >
                      <CommentarySection deliveryId= { delivery.id } />
                    </Element>
                  </div>

                    <div className="right-section">
                      <CodeEditor
                          readOnly= { true }
                          defaultCode= { delivery.code }
                          defaultLanguage= { delivery.language }
                          showDownloadCodeButton= { false }
                          showLanguagesSelector= { false }
                          showAutoCompleteCheckbox= { false }
                          showSnippetsCheckbox= { false }
                          height="45vh"
                      />
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
