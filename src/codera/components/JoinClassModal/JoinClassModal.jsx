import PropTypes from "prop-types";
import PureModal from 'react-pure-modal';
import { useForm } from "../../../hooks";
import { Button } from "../../../ui/components";
import { getUserInformation } from "../../helpers/userData";
import { post } from "../../helpers/post";
import { useState } from "react";
import 'react-pure-modal/dist/react-pure-modal.min.css';
import "./JoinClassModal.css";


const initialForm = { code: "" };

export const JoinClassModal = ({ openState, onCloseModal, onReload }) => {
  const { code, onFormChange, onFormReset } = useForm(initialForm);
  const [errorMessage,setErrorMessage]=useState("");

  const enroll = async () => {
    const { id } = getUserInformation();
   
    const body = { userId: id, classId: code};
 
    try {
      await post("inscriptions", body);
      setTimeout( ()=> {onReload();}, 1000);
      closeModal();
    } 
    catch (error) {
      setErrorMessage(error.response.data.message)
    }

  };

  const removeErrorMessage=()=>{
    setErrorMessage("");
  }

  const closeModal = () => {
    removeErrorMessage();
    onFormReset();
    onCloseModal();
  };

  const onCodeTextChange=(e)=>{
    onFormChange(e);
    removeErrorMessage();
  }


  return (
    <PureModal
      header="Insert the course code:"
      isOpen={openState}
      closeButton="X"
      onClose={onCloseModal}
      width="26%"
    >
      <p className="error-message body2"> {errorMessage} </p>

      <input
        className="input-field code-input"
        type="text"
        placeholder="Code"
        name="code"
        value={code}
        onChange={onCodeTextChange}
      />

      <div className="buttons">

        <Button
          text="Enroll"
          height="25px"
          width="80px"
          borderRadius="15px"
          onClickFunction={enroll}
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

JoinClassModal.defaultProps = {
  openState: false,
  onCloseModal: () => {console.log("close modal"); },
  onReload:()=>{console.log("reloaded");}
};

JoinClassModal.propTypes = {
  openState: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onReload:PropTypes.func
};
