import {useState} from "react";
import { useForm } from "../../../hooks";
import PropTypes from "prop-types";
import { Button } from "../../../ui/components";
import { getUserInformation } from "../../helpers/userData";
import { post } from "../../helpers/post";
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import "./CreateClassModal.css"

const initialForm = { className: "", classDescription: "" };

export const CreateClassModal = ({ openState, onCloseModal, onReload }) => {
  const { className, classDescription, onFormChange, onFormReset } = useForm(initialForm);
  const [errorMessage,setErrorMessage]=useState("");  


  const createClass=async ()=>{

    if(className===""){
      setErrorMessage("Insert the name of class")
      return;
    }

    const { id } = getUserInformation();
    const body = { teacherId:id, className, classDescription };

    try {
      await post("classes", body);
      setTimeout( ()=> {onReload();}, 1000);
      closeModal();
        
    } catch (error) {
        setErrorMessage(error.response.data.message)
    }

  }

  const removeErrorMessage=()=>{
    setErrorMessage("");
  }

  const closeModal = () => {
    removeErrorMessage();
    onFormReset();
    onCloseModal();
  };

  const onClassNameChange=(e)=>{
    onFormChange(e);
    removeErrorMessage();
  }


  return (
    <PureModal
    header="Complete the next information:"
    isOpen={openState}
    closeButton="X"
    onClose={onCloseModal}
    width="40%"
  >
    <p className="error-message body2"> {errorMessage} </p>
      <label> <p><b>Class Name*: </b></p></label>

      <input
        className="input-field input"
        type="text"
        placeholder="Class Name"
        name="className"
        value={className}
        onChange={onClassNameChange}
      />

      <label> <p><b>Description: </b></p></label>
      <textarea
        className="input-field modal-description input"
        type="text"
        placeholder="Description"
        name="classDescription"
        value={classDescription}
        onChange={onFormChange}
      />

      <div className="buttons">
        <Button
          text="Create"
          height="25px"
          width="80px"
          borderRadius="15px"
          onClickFunction={createClass}
        />
        <Button
          text="Cancel"
          height="25px"
          width="80px"
          type="red"
          borderRadius="15px"
          onClickFunction={closeModal}
        />
      </div>

  </PureModal>


  );
};

CreateClassModal.defaultProps = {
    openState: false,
    onCloseModal: () => {console.log("modal closed");},
    onReload:()=>{console.log("reloaded");}
  };
  
  CreateClassModal.propTypes = {
    openState: PropTypes.bool,
    onCloseModal: PropTypes.func,
    onReload:PropTypes.func
  };
  