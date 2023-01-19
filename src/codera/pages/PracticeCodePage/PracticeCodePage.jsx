import { CodeEditor } from "../../components";
import { toast, ToastContainer } from "react-toastify";
import "./PracticeCodePage.css";

export const PracticeCodePage = () => {


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


  return (
    <div className="main-content">
      <section className="main-layout">
        <h2 className="h6 section-title">Practice code</h2>

        <CodeEditor/>

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
