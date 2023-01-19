import { useState, useEffect, useContext } from "react";
import AceEditor from "react-ace";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "../../../hooks";
import { ApplicationContext } from "../../../provider";
import { findClassName, validateClassName } from "../../helpers/javaHelper";
import { runCode } from "../../helpers/runCode";
import { saveAs } from "file-saver";
import { Selector } from "../../../ui/components";
import { CgPlayTrackNext } from "react-icons/cg";
import { BiDownload } from "react-icons/bi";
import { Terminal } from "../Terminal/Terminal";
import "./CodeEditor.css"


export const CodeEditor = ( { onInputChange } ) => {
    const { languageList, languagesLoading, fetchLanguages, themeList}=useContext(ApplicationContext);
    const [code, setCode] = useState("");    
    const [outputConsole, setOutpuConsole] = useState("");

    const editorForm = {
        theme: themeList[0].name,
        language: "",
        snippets: false,
        autocomplete: false,
      };

    const { theme, language, snippets, autocomplete, onFormChange } = useForm(editorForm);  
    
    useEffect(()=>{
        fetchLanguages();
      },[])


    const onCodeChange = (value) => {
      onInputChange(value);
      setCode(value); 
    };

    const sendCode = async (e) => {
        e.preventDefault();
        switch (language) {
            case "java":
            runJavaCode(code);
            break;

            case "javascript":
            runInterpretedCode(code, "javascript");
            break;

            case "python":
            runInterpretedCode(code, "python");
            break;

            default:
            showSelectLanguageMessage();
            break;
        }
    };
    

    
    const runJavaCode = async (code) => {
        const className = findClassName(code);
        const body = { className, code };

        if (!validateClassName(className)) {

            let message='';

            if(className===null){
                message = `no se encontro el nombre de la clase`;
            }
            else{
                message = `Error de sintaxis en el nombre de la clase: ${className}`;
            }
            
            toast.error(message, {
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
        
        const response = await runCode("/run/java", body);
        setOutpuConsole(response.data.output);
    };
    
      const runInterpretedCode = async (code, languageName) => {
        const body = {code};
        const response = await runCode(`/run/${languageName}`, body);
        setOutpuConsole(response.data.output);
      };
    
    
    const showSelectLanguageMessage=()=>{
        const message="select a language";

        toast.error(message, {
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


    const downloadCode = (e) => {
        e.preventDefault();
        const fileName = new Date().toDateString();
        const file=new Blob([code],{type: 'text/plain;charset=utf-8'});
        const extention= getExtention(language);
        saveAs(file,`${fileName}.${extention}`)
    };

    const getExtention=(language)=>{
        switch (language) {
          case "java": 
            return "java"
    
          case "javascript":
            return "js"
    
          case "python":
            return "py"
    
          default:
            return "txt"
        }
      }

  return (
    <div className="code-editor">
         <form className="options-section">
          <ul className="editor-options">

            <li className="editor-option">
              <label className="body2">Theme: </label>
              <Selector
                optionsList={themeList}
                name="theme"
                defaultValue={theme}
                onChange={onFormChange}
              />
            </li>

            <li className="editor-option">
              <label className="body2">Language: </label>
              <Selector
                optionsList={languageList}
                name="language"
                onChange={onFormChange}
                isLoading={languagesLoading}
              />
            </li>

            <li className="editor-option">
              <label className="body2">Enable Snippets: </label>
              <input
                type="checkbox"
                name="snippets"
                checked={snippets}
                onChange={onFormChange}
              />
            </li>

            <li className="editor-option">
              <p className="body2">Enable Autocomplete: </p>
              <input
                type="checkbox"
                name="autocomplete"
                checked={autocomplete}
                onChange={onFormChange}
              />
            </li>

          </ul>

          <button className="button-text editor-button" onClick={sendCode}>
            Run <CgPlayTrackNext size={40} />
          </button>

          <button className="button-text editor-button" onClick={downloadCode}>
            Download code <BiDownload size={25} />
          </button>

        </form>


        <AceEditor
            fontSize="16px"
            value={code}
            mode={language}
            theme={theme}
            enableLiveAutocompletion={autocomplete}
            enableSnippets={snippets}
            onChange={onCodeChange}
            editorProps={{ $blockScrolling: true }}
            height="50vh"
            width="100%"
          />
          <Terminal text={outputConsole} />

    </div>
  )
}
