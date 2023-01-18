import PropTypes from "prop-types";
import Modal from "react-responsive-modal";
import { useForm } from "../../../hooks";
import { Button } from "../../../ui/components";
import { getUserInformation } from "../../helpers/userData";
import { post } from "../../helpers/post";
import { useState } from "react";
import "react-responsive-modal/styles.css";
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
      onReload();
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
    <Modal open={openState} onClose={onCloseModal}>
      
      <h2 className="sub-title2">Insert the course code: </h2>

      <p className="error-message body2"> {errorMessage} </p>

      <input
        className="input-field"
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
    </Modal>
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
