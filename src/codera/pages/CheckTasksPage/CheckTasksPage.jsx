import { useNavigate, useParams } from "react-router-dom";
import PureModal from 'react-pure-modal';
import { LinkedText, Loading, TaskCard } from "../../components";
import {useFetch, useModal} from "../../../hooks";
import { Button, InfoMessage } from "../../../ui/components";
import { removeFromAPI } from "../../helpers/removeFromAPI";
import { useState } from "react";
import 'react-pure-modal/dist/react-pure-modal.min.css';
import "./CheckTasksPage.css";

export const CheckTasksPage = () => {
    const { classId}=useParams();
    
    const navigate = useNavigate();

    const [ toDeleteTask, setToDeleteTask ] = useState(-1);
    
    const{ data: taskList, 
           isLoading: loadingTasks, 
           fetchData: fetchTasks } = useFetch(`tasks?classGroupId=${ classId }`);
    
    const { data: classGroup , 
            isLoading: loadingClassGroup } = useFetch(`classes/${classId}`);

    const { open, 
            onOpenModal, 
            onCloseModal } = useModal();

    

    const goToDeliveries = ( taskId ) => {
      navigate( taskId.toString() );
    }

    const goToEditTask = ( taskId ) => {
      navigate(`edit/${ taskId }`);
    }
 
    const openDeleteModal=( taskId )=>{
      setToDeleteTask( taskId );
      onOpenModal();
    }

    const deleteTask= async () => {
      await removeFromAPI(`tasks/${ toDeleteTask }`);

      setTimeout( ()=> { fetchTasks(); }, 1000);
      
      onCloseModal();
    }


  return (
    <div className="main-content">
      <section className="main-layout">
        <div>
        {
          loadingClassGroup ? <p>Loading title...</p> : 
            <h2 className="header6 section-title">
              <LinkedText className="header6" path="/classes">
                My classes
              </LinkedText> 

                {">"} 

              <LinkedText className="header6" back={true}>
                { classGroup.className } 
              </LinkedText>

                {"> "} 
                check tasks
            </h2> 
          
        }
          <InfoMessage text="In this page you will can see your tasks created" />

          { loadingTasks? <Loading/>
          :
          <ul className="tasks">
              {
                  taskList.map((task)=>(
                  <li key={ task.id }>
                      <TaskCard 
                          task= { task }
                          showRemainingDays= { false }
                          showEditButton= { true }
                          showDeleteButton = { true }
                          buttonText= "Check deliveries" 
                          onDelete= { ()=>{ openDeleteModal( task.id ) }}
                          onEdit={ ()=>{ goToEditTask(task.id) }}
                          onClickButton={()=>{ goToDeliveries(task.id) }}
                      />   
                  </li>
                  ))
              }
          </ul>
          }
          <PureModal
            header="Are you sure that you want to delete this task?"
            isOpen={open}
            closeButton="X"
            onClose={onCloseModal}
            width="36%"
          >
            <div className="delete-modal-buttons">
              <Button text="Yes" width="50px" height="30px" borderRadius="10px" onClickFunction={deleteTask}/>
              <Button text="No" type="red" width="50px" height="30px" borderRadius="10px" onClickFunction={onCloseModal}/>
            </div>
            
          </PureModal>
        </div>


      </section>
    </div>
  )
}
