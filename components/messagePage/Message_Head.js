// import { UserContext } from "../context";
import { useContext, useState } from "react";
// import People from "./cards/People";
// import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
// import {toast} from "react-toastify"



//Import usercontext, usecontext, state, the people component, loading, and axios


const MessaageHead = ({receiver}) => {
    // const [state, setState]= useContext(UserContext);
    // const [query, setQuery] = useState("");
    // const [result, setResult] = useState([]);
    



return (
  <>
    <div className="">
       {receiver && 
       <>
        Message to {receiver.username}
       </>}
    </div>
    </>
);

}
export default MessaageHead
 