import { useNavigate, useParams } from "react-router-dom";
import PureModal from 'react-pure-modal';
import { TaskCard } from "../../components";
import {useFetch, useModal} from "../../../hooks";
import { Button } from "../../../ui/components";
import { removeFromAPI } from "../../helpers/removeFromAPI";
import { useState } from "react";
import 'react-pure-modal/dist/react-pure-modal.min.css';
import "./CheckTasksPage.css";

export const CheckTasksPage = () => {
    const { classId}=useParams();

    const{ data: taskList, isLoading: loadingTasks, fetchData: fetchTasks }= useFetch(`tasks?classGroupId=${classId}`);

    const { open, onOpenModal, onCloseModal } =useModal();

    const navigate= useNavigate();

    const [ toDeleteTask, setToDeleteTask ]= useState(-1);


    const goToDeliveries=(taskId)=>{
      navigate(taskId.toString());
    }

    const openDeleteModal=(taskId)=>{
      setToDeleteTask(taskId);
      onOpenModal();
    }

    const deleteTask=async ()=>{
      const response = await removeFromAPI(`tasks/${toDeleteTask}`);
      fetchTasks();

      onCloseModal();
    }

    const editTask=()=>{

    }

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
                        task= {task}
                        showRemainingDays= {false}
                        showEditButton= {true}
                        showDeleteButton ={true}
                        buttonText= {"Check deliveries"}
                        onDelete= {()=>{openDeleteModal(task.id)}}
                        onEdit={()=>{} }
                        onClickButton={()=>{goToDeliveries(task.id)}}
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

      </section>
    </div>
  )
}
