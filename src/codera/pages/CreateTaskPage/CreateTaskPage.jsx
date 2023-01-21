import { useContext, useEffect } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useFetch, useForm, useModal } from "../../../hooks";
import { ApplicationContext } from "../../../provider";
import { Button, DefaultSelector, FilteredSelector, TextInput } from "../../../ui/components";
import { CodeEditorModal, LanguageLabel } from "../../components";
import { post } from "../../helpers/post";
import "./CreateTaskPage.css";


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

    try {
        const response= await post("tasks",body);
        registerLanguages(response.data.id)
        
    } catch (error) {

    }
  }


  const removeSelectedLanguage=(id)=>{
    const newList=selectedLanguages.filter((language)=>(language.id!=id))
    onFormChange( { target: { name: "selectedLanguages", value: newList } });
  }


  const registerLanguages = async(taskId) => {
    selectedLanguages.forEach( async ({id:languageId}) => {
      const body={ taskId, languageId };
      const response = await post("/language-asignation", body);
      console.log(response)
    });
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
                <div>
                { selectedLanguages.map(({id, name})=>(
                    <LanguageLabel key={id} name={name} onClose={()=>{removeSelectedLanguage(id)}}/>
                  )
                )
                }
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
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
        <ToastContainer />
      </section>
    </div>
  )
}
