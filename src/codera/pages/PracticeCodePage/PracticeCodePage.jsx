import AceEditor from "react-ace";
import { useState } from "react";
import { useFetch, useForm } from "../../../hooks";
import { saveAs } from "file-saver";
import { Selector } from "../../../ui/components";
import { CgPlayTrackNext } from "react-icons/cg";
import { BiDownload } from "react-icons/bi";
import { Terminal } from "../../components";
import { runCode } from "../../helpers/runCode";
import { toast, ToastContainer } from "react-toastify";
import { findClassName, validateClassName } from "../../helpers/javaHelper";
import "./PracticeCodePage.css";


const themeList = [
  { name: "monokai" },
  { name: "github" },
  { name: "dracula" },
];

export const PracticeCodePage = () => {
  const editorForm = {
    theme: themeList[0].name,
    language: "",
    snippets: false,
    autocomplete: false,
  };

  const { data: languageList, isLoading } = useFetch("programming-languages");
  const { theme, language, snippets, autocomplete, onFormChange } =
    useForm(editorForm);

  const [code, setCode] = useState("");
  const [outputConsole, setOutpuConsole] = useState("");

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

  const onCodeChange = (value) => {
    setCode(value);
  };

  const runJavaCode = async (code) => {
    const className = findClassName(code);
    const body = { className, code };

    if (!validateClassName(className)) {
      const message = `Error de sintaxis en el nombre de la clase: ${className}`;
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

  const runInterpretedCode = async (code, path) => {
    const body = {code};
    const response = await runCode(`/run/${path}`, body);
    setOutpuConsole(response.data.output);
  };


  const showSelectLanguageMessage=()=>{
    const message="select a language"
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
    console.log(extention)
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
    <div className="main-content">
      <section className="main-layout">
        <h2 className="h6 section-title">Practice code</h2>
        <form>
          <ul className="editor-options">
            <li className="editor-option">
              <p className="body2">Theme: </p>
              <Selector
                optionsList={themeList}
                name="theme"
                defaultValue={theme}
                onChange={onFormChange}
              />
            </li>
            <li className="editor-option">
              <p className="body2">Language: </p>
              <Selector
                optionsList={languageList}
                name="language"
                onChange={onFormChange}
                isLoading={isLoading}
              />
            </li>
            <li className="editor-option">
              <p className="body2">Enable Snippets: </p>
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

        <div className="editor">
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
  );
};
