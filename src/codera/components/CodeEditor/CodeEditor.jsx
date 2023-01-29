import { saveAs } from "file-saver";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import AceEditor from "react-ace";
import { BiDownload } from "react-icons/bi";
import { CgPlayTrackNext } from "react-icons/cg";
import { toast } from "react-toastify";
import { useForm } from "../../../hooks";
import { ApplicationContext } from "../../../provider";
import { DefaultSelector } from "../../../ui/components";
import { findClassName, validateClassName } from "../../helpers/javaHelper";
import { runCode } from "../../helpers/runCode";
import { Terminal } from "../Terminal/Terminal";
import "./CodeEditor.css";

export const CodeEditor = ( { 
    onSelectorChange, 
    onInputChange, 
    showThemesSelector, 
    showLanguagesSelector, 
    showSnippetsCheckbox, 
    showAutoCompleteCheckbox, 
    showRunButton,
    showDownloadCodeButton,
    height,
    width,
    readOnly,
    defaultCode,
    defaultLanguage,
    defaultLanguageList
  } ) => 
  {

    const dataContext =useContext(ApplicationContext);

    const languageList=defaultLanguageList.length===0 ? dataContext.languageList : defaultLanguageList

    const { languagesLoading,
            fetchLanguages, 
            themeList} =dataContext;


    const [code, setCode] = useState(defaultCode);    
    const [outputConsole, setOutpuConsole] = useState("");

    const editorForm = {
        theme: themeList[0],
        language: {id: 1, name: 'java'},
        snippets: false,
        autocomplete: false,
    };

    const { theme, language, snippets, autocomplete, onFormChange } = useForm(editorForm);  
    
    useEffect(()=>{
        fetchLanguages();
      },[])


    const onCodeChange = (value) => {
      setCode(value);

      onInputChange(value);
    };
 
    const sendCode = async (e) => {
        e.preventDefault();
        
        const programmingLanguage = defaultLanguage.name==="" ?  language.name : defaultLanguage.name;

        const codeToExcecute = code;

        switch (programmingLanguage) {
            case "java":
            runJavaCode(codeToExcecute);
            break;

            case "javascript":
            runInterpretedCode(codeToExcecute, "javascript");
            break;

            case "python":
            runInterpretedCode(codeToExcecute, "python");
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

    const getExtention=({name})=>{
      
        switch (name) {
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

  const onSelectorUpdate=(e)=>{
    onSelectorChange(e);
    onFormChange(e);
  }

  return (
    <div className="code-editor">
         <form className="options-section">
          <ul className="editor-options">

          {
            showThemesSelector &&
            (
              <li className="editor-option">
                <label className="body2">Theme: </label>
                <DefaultSelector
                  objectList={themeList}
                  name="theme"
                  onChange={onSelectorUpdate}
                />
              </li>
            )
          }

          {
            showLanguagesSelector &&
            (
              <li className="editor-option">
                <label className="body2">Language: </label>
                <DefaultSelector
                  objectList={languageList}
                  name="language"
                  onChange={onSelectorUpdate}
                  isLoading={languagesLoading}
                />
              </li>
            )
          }

          {
            showSnippetsCheckbox &&
            (
              <li className="editor-option">
                <label className="body2">Enable Snippets: </label>
                <input
                  type="checkbox"
                  name="snippets"
                  checked={snippets}
                  onChange={onFormChange}
                />
              </li>
            )
          }

          {
            showAutoCompleteCheckbox &&
            (
              <li className="editor-option">
                <p className="body2">Enable Autocomplete: </p>
                <input
                  type="checkbox"
                  name="autocomplete"
                  checked={autocomplete}
                  onChange={onFormChange}
                />
              </li>
            )
          }
          </ul>

        {
          showRunButton && 
          (
            <button className="button-text editor-button" onClick={sendCode}>
              Run <CgPlayTrackNext size={40} />
            </button>
          )
        }
        {
          showDownloadCodeButton &&
          (
            <button className="button-text editor-button" onClick={downloadCode}>
              Download code <BiDownload size={25} />
            </button>
          )
        }
        </form>

        {
          readOnly ? 
            <AceEditor
            readOnly={readOnly}
            fontSize="16px"
            value={defaultCode}
            mode={defaultLanguage.name}
            theme={theme.id}
            enableLiveAutocompletion={autocomplete}
            enableSnippets={snippets}
            onChange={onCodeChange}
            editorProps={{ $blockScrolling: true }}
            height={height}
            width={width}
          />
          :
          (
            <AceEditor
            fontSize="16px"
            value={code}
            mode={language.name}
            theme={theme.id}
            enableLiveAutocompletion={autocomplete}
            enableSnippets={snippets}
            onChange={onCodeChange}
            editorProps={{ $blockScrolling: true }}
            height={height}
            width={width}
          />
          )
        }

          <Terminal text={outputConsole} />
    </div>
  )
}

CodeEditor.defaultProps={
  onInputChange:()=>{console.log("code editor text changed")},
  onSelectorChange:()=>{console.log("selector changed")},
  showThemesSelector:true, 
  showLanguagesSelector:true, 
  showSnippetsCheckbox:true, 
  showAutoCompleteCheckbox:true,
  showRunButton:true,
  showDownloadCodeButton:true,
  height:"50vh",
  width:"100%",
  readOnly: false,
  defaultCode: "",
  defaultLanguage:{id:"", name:""},
  defaultLanguageList: [ ]
}

CodeEditor.propTypes={
  onInputChange:PropTypes.func,
  onSelectorChange:PropTypes.func,
  showThemesSelector:PropTypes.bool, 
  showLanguagesSelector:PropTypes.bool, 
  showSnippetsCheckbox:PropTypes.bool, 
  showAutoCompleteCheckbox:PropTypes.bool,
  showRunButton:PropTypes.bool,
  showDownloadCodeButton:PropTypes.bool,
  height:PropTypes.string,
  width:PropTypes.string,
  readOnly: PropTypes.bool, 
  defaultCode: PropTypes.string, 
  defaultLanguage: PropTypes.object,
  defaultLanguageList: PropTypes.array
}