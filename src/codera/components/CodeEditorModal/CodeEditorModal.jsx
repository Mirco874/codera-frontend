import Modal from "react-responsive-modal";
import PropTypes from "prop-types";
import { Button } from "../../../ui/components";
import { CodeEditor } from "../";
import "react-responsive-modal/styles.css";
import "./CodeEditorModal.css";

export const CodeEditorModal = ({ openState, onCloseModal, value, onCodeChange  }) => {

  return (
    <Modal open={openState} onClose={onCloseModal}>
      
      <h2 className="sub-title2">Template</h2>

      <CodeEditor value={value} onCodeChange={onCodeChange} inputName={"templateCode"}/>

      <div className="buttons">
        <Button
          text="Save"
          height="25px"
          width="80px"
          borderRadius="15px" 
        />
        <Button
          text="Cancel"
          height="25px"
          width="80px"
          type="red"
          borderRadius="15px"
         onClickFunction={onCloseModal}
        />
      </div>

      

    </Modal>
  )
}


CodeEditorModal.defaultProps = {
    openState: false,
    onCloseModal: () => {console.log("close modal"); },
  };
  
  CodeEditorModal.propTypes = {
    openState: PropTypes.bool,
    onCloseModal: PropTypes.func,
  };
  