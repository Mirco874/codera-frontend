import { useState } from "react";
import { useContext, useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useFetch, useForm, useModal } from "../../../hooks";
import { ApplicationContext } from "../../../provider";
import { Button, DefaultSelector, InfoMessage, TextInput } from "../../../ui/components";
import { CodeEditorModal, LanguageLabel, LinkedText } from "../../components";
import { post } from "../../helpers/post";
import "./CreateTaskPage.css";


export const CreateTaskPage = () => {
    const { classId } = useParams();

    const navigate =useNavigate();

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

    const [ clickedLanguage, setClickedLanguage ]= useState({});


    useEffect(()=>{
      fetchLanguages();
    },[])


  const updateTemplateCode=( newCode )=>{
    changeValue( "templateCode", newCode );
  }

  const uploadTask= async()=>{
    if(selectedLanguages.length===0){
      toast.error('select one language at least', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }

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

        toast.success('task created succesfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });

          setTimeout( ()=> {navigate(-1)}, 1000);
        
    } catch (error) {
      toast.error('please, fill all the required fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const removeSelectedLanguage=(id)=>{
    const newList=selectedLanguages.filter((language)=>(language.id!=id))
    onFormChange( { target: { name: "selectedLanguages", value: newList } });
  }

  const registerLanguages = async(taskId) => {
    selectedLanguages.forEach( async ({id:languageId}) => {
      const body={ taskId, languageId };
      await post("/language-asignation", body);
    });
  }

  const onClickLanguage= ({ target })=> {
    const { value: language }= target;
    setClickedLanguage( language );
  }

  const onAddLanguage= ()=> {
    const repeatLanguage= selectedLanguages.find(({ id })=> (id===clickedLanguage.id))
    
    if(!repeatLanguage){
      const newSelectedLanguages= [ ...selectedLanguages, clickedLanguage ];
      changeValue( "selectedLanguages", newSelectedLanguages );
      return;
    }

    toast.error('you can not repeat the same programming language', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  return (
    <div className="main-content">
      <section className="main-layout">
        {loadingClassGroup ? ( <>Loading..</>  ) : 
        ( <>
            <h2 className="header6 section-title">

              <LinkedText className="header6" path="/classes">
                My classes
              </LinkedText> 

                {">"} 

              <LinkedText className="header6" back={true}>
                { classGroup.className } 
              </LinkedText>

                {"> "} 

                new task
            </h2> 
      
            <h2 className="header6 section-title">New task</h2>
            <form >
                <label> <b>Task title*:</b>  </label>
                <TextInput 
                  type="text" 
                  placeholder="Task title" 
                  name="taskTitle"
                  width="100%" 
                  value={taskTitle} 
                  onChange={onFormChange}
                />
                
                <label><b>Task description*:</b></label> 
                <TextInput 
                  placeholder="Task title" 
                  name="taskDescription" 
                  width="100%" 
                  height="10vh" 
                  variation="text-area" 
                  value={taskDescription} 
                  onChange={onFormChange}
                />

                <div className="line">
                    <label > <b>Max score*:</b> </label> 
                    <DefaultSelector 
                      objectList={scoreList} 
                      name="maxScore" 
                      defaultValue={maxScore} 
                      onChange={onFormChange} 
                    />
                </div>

                <div className="line">
                  <label > <b>Deadline*:</b> </label> 
                  <input 
                    className="date-time-input" 
                    type="datetime-local" 
                    name="limitDate" 
                    value={limitDate} 
                    onChange={onFormChange} 
                  />
                </div>

                <div className="line">
                    <label><b>Language*:</b></label>
                    <DefaultSelector 
                      objectList={languageList} 
                      name="selectedLanguages" 
                      isLoading={languagesLoading} 
                      onChange={onClickLanguage}
                    />

                  <Button 
                    text="Add language" 
                    height="35px" 
                    width="130px" 
                    borderRadius="10px" 
                    onClickFunction={onAddLanguage} 
                  />

                </div>

                <div>
                { selectedLanguages.map(({id, name})=>(
                    <LanguageLabel key={id} name={name} onClose={()=>{removeSelectedLanguage(id)}}/>
                    )
                  )
                }
                </div>

                <div className="line">
                    <label><b>Template code:</b></label>
                    <Button text="edit" type="blue" height="35px" width="45px" borderRadius="10px" onClickFunction={openEditorModal} />
                    
                </div>
                  <InfoMessage text="You can write a part of code to help your students."/>
                  <hr />
                <Button text="Create task" type="blue" height="35px" width="100px" borderRadius="10px" onClickFunction={uploadTask} />
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
