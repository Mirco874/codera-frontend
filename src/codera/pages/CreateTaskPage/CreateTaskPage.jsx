import { useContext, useEffect } from "react";
import {useParams} from "react-router-dom";
import {AiFillQuestionCircle} from "react-icons/ai";
import { useFetch, useForm, useModal } from "../../../hooks";
import { ApplicationContext } from "../../../provider";
import { Button, Selector, TextInput } from "../../../ui/components";
import { CodeEditorModal } from "../../components";
import "./CreateTaskPage.css"

const scoreList=[
    { name:"100" },
    { name:"70" },
    { name:"50" },
    { name:"30" },
    { name:"10" },
    { name:"5"},
]

const initialForm={
    classId: "",
    taskTitle:"",
    taskDescription: "",
    maxScore: scoreList[0].name,
    templateCode: "",
    limitTime: "12:00:00",
    limitDate: "2023-01-12"
}


export const CreateTaskPage = () => {
    const { classId:classGroupId } = useParams();
    const { open: isOpenEditorModal, onOpenModal: openEditorModal, onCloseModal: closeEditorModal }=useModal();
    const { data: classGroup , isLoading: loadingClassGroup } = useFetch(`classes/${classGroupId}`);
    const { classId, taskTitle, taskDescription, maxScore, templateCode, limitTime, limitDate,onFormChange }=useForm(initialForm);
    const { languageList, languagesLoading, fetchLanguages}=useContext(ApplicationContext);

    useEffect(()=>{
      fetchLanguages();
    },[])

    
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
                    <Selector optionsList={scoreList} name="maxScore" defaultValue={maxScore}  onChange={onFormChange} />
                </div>

                <div className="line">
                  <label >Deadline* </label> 
                  <input className="date-time-input" type="datetime-local" name="dateTime" onChange={onFormChange} />
                </div>

                <div className="line">
                    <label>Language* </label>
                    <Selector optionsList={languageList} name="language"  isLoading={languagesLoading} onChange={onFormChange}/>
                </div>

                <div className="line">
                    <p>Template code: </p>
                    <Button text="edit" type="blue" height="5vh" width="9vh" onClickFunction={openEditorModal} />
                    
                </div>
                <p className="help-message"> <AiFillQuestionCircle/> You can write a part of code</p>

                <Button text="Create task" type="blue" width="20vh" height="5vh" />
            </form>

            <CodeEditorModal openState={isOpenEditorModal} onCloseModal={closeEditorModal} value={templateCode} onCodeChange={onFormChange}/>

          </>)
      }

      </section>
    </div>
  )
}
