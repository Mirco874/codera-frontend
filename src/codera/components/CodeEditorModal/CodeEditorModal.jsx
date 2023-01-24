import PureModal from 'react-pure-modal';
import PropTypes from "prop-types";
import { Button } from "../../../ui/components";
import { CodeEditor } from "../";
import 'react-pure-modal/dist/react-pure-modal.min.css';
import "./CodeEditorModal.css";

export const CodeEditorModal = ({ openState, onCloseModal, onUpdateCode }) => {

  return (

    <PureModal
      header="Template"
      isOpen={openState}
      closeButton="X"
      onClose={onCloseModal}
      width="80%"
    > 
      <CodeEditor 
        onInputChange={onUpdateCode} 
        height="280px"
        />

        <Button
          text="Close"
          height="25px"
          width="80px"
          type="blue"
          borderRadius="15px"
        onClickFunction={onCloseModal}
        />
    </PureModal>
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
  