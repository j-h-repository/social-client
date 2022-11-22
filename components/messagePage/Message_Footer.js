// import { UserContext } from "../context";
// import { useContext, useState } from "react";
// import People from "./cards/People";
// import { LoadingOutlined } from "@ant-design/icons";
// import axios from "axios";
// import {toast} from "react-toastify"

//Import usercontext, usecontext, state, the people component, loading, and axios


const MessaageFooter = ({setMessage, message, sendMessage, fetchChats}) => {
    // const [state, setState]= useContext(UserContext);
    // const [query, setQuery] = useState("");
    // const [result, setResult] = useState([]);





return (
  <>
    <div>

        <div className="row">
        <textarea
          id="message"
          type="text"
          className="form-control"
          placeholder="type message here"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />
        </div>
        <div className=" d-flex justify-content-between py-2">
            <div> <button className="btn btn-warning" onClick={()=>{console.log("cleared");setMessage(""); document.getElementById("message").value = ""}}>
                    Clear text
            </button></div>
            <div>  <button className="btn btn-success" disabled={message.length<1} onClick={(e)=>{sendMessage(e); setMessage(""); document.getElementById("message").value = ""; fetchChats()}}>
                    Submit response
            </button></div>
            
           
        </div>
      
       
    </div>
    </>
);

}
export default MessaageFooter
 