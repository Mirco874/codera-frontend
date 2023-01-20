import { useContext, useEffect } from "react";
import {useParams} from "react-router-dom";
import {AiFillQuestionCircle} from "react-icons/ai";
import { useFetch, useForm, useModal } from "../../../hooks";
import { ApplicationContext } from "../../../provider";
import { Button, DefaultSelector, FilteredSelector, Selector, TextInput } from "../../../ui/components";
import { CodeEditorModal } from "../../components";
import "./CreateTaskPage.css"
import { post } from "../../helpers/post";


export const CreateTaskPage = () => {
    const { classId } = useParams();

    const { open: isOpenEditorModal, 
            onOpenModal: openEditorModal, 
            onCloseModal: closeEditorModal } = useModal();

    const { data: classGroup ,
            isLoading: loadingClassGroup } = useFetch(`classes/${classId}`);

    const { languageList, 
      scoreList, 
      languagesLoading, 
      fetchLanguages } = useContext(ApplicationContext);

    const initialForm={
      classId: "",
      taskTitle:"",
      taskDescription: "",
      maxScore: scoreList[0],
      templateCode: "",
      limitDate: "",
      selectedLanguages:[]
  }

    const { taskTitle, 
            taskDescription, 
            maxScore, 
            templateCode, 
            limitDate,
            selectedLanguages,
            onFormChange, 
            changeValue } = useForm(initialForm);

    useEffect(()=>{
      fetchLanguages();
    },[])


  const updateTemplateCode=( newCode )=>{
    changeValue( "templateCode", newCode );
  }

  const uploadTask= async()=>{
    const body={
      classId,
      taskTitle,
      taskDescription,
      maxScore : maxScore.id ,
      templateCode,
      limitDate: new Date(limitDate)
    }

    const response= await post("tasks",body);
  }


  return (
    <div className="main-content">
      <section className="main-layout">
        {loadingClassGroup ? ( <>Loading..</>  ) : 
        ( <>
            <h2 className="h6 section-title"> My classes {">"} { classGroup.className }  {">"} New tasks</h2>
            <h2 className="h6 section-title">New task</h2>
            <form >
                <label>Task title*</label>
                <TextInput type="text" placeholder="Task title" name="taskTitle" width="100%" value={taskTitle} onChange={onFormChange}/>
                
                <label>Task description*</label> 
                <TextInput placeholder="Task title" name="taskDescription" width="100%" height="10vh" variation="text-area" value={taskDescription} onChange={onFormChange}/>


                <div className="line">
                    <label >Max score* </label> 
                    <DefaultSelector objectList={scoreList} name="maxScore" defaultValue={maxScore} onChange={onFormChange} />
                   
                </div>

                <div className="line">
                  <label >Deadline* </label> 
                  <input className="date-time-input" type="datetime-local" name="limitDate" value={limitDate} onChange={onFormChange} />
                </div>

                <div className="line">
                    <label>Language* </label>
                    <FilteredSelector name="selectedLanguages" totalItemsList={languageList} selectedItemsList={selectedLanguages} isLoading={languagesLoading} onChange={onFormChange}  />
                </div>

                <div className="line">
                    <p>Template code: </p>
                    <Button text="edit" type="blue" height="5vh" width="9vh" onClickFunction={openEditorModal} />
                    
                </div>
                <p className="help-message"> <AiFillQuestionCircle/> You can write a part of code</p>

                <Button text="Create task" type="blue" width="20vh" height="5vh" onClickFunction={uploadTask} />
            </form>

            <CodeEditorModal openState={isOpenEditorModal} onCloseModal={closeEditorModal} onUpdateCode={updateTemplateCode}/>

          </>)
      }

      </section>
    </div>
  )
}
