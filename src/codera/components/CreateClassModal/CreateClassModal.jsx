import {useState} from "react";
import { useForm } from "../../../hooks";
import PropTypes from "prop-types";
import Modal from "react-responsive-modal";
import { Button } from "../../../ui/components";
import { getUserInformation } from "../../helpers/userData";
import { post } from "../../helpers/post";
import "react-responsive-modal/styles.css";

const initialForm = { className: "", classDescription: "" };

export const CreateClassModal = ({ openState, onCloseModal, onReload }) => {
  const { className, classDescription, onFormChange, onFormReset } = useForm(initialForm);
  const [errorMessage,setErrorMessage]=useState("");  


  const createClass=async ()=>{

    const { id } = getUserInformation();

    const body = { teacherId:id, className, classDescription };

    try {
      await post("classes", body);
      onReload();
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

  return (
    <Modal open={openState} onClose={onCloseModal}>
      <h2 className="sub-title2">Complete the next information: </h2>
      {errorMessage}
      <p>Class Name :* </p>
      <input
        className="input-field"
        type="text"
        placeholder="Class Name"
        name="className"
        value={className}
        onChange={onFormChange}
      />

      <p>Description: </p>
      <textarea
        className="input-field modal-description"
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
    </Modal>
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
  