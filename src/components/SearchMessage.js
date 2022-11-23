import { UserContext } from "../context";
import { useContext, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import {toast} from "react-toastify"
import PeopleMessage from "./cards/PeopleMessage";

//Import usercontext, usecontext, state, the people component, loading, and axios


const SearchMessage = ({setReceiver}) => {
    const [state, setState]= useContext(UserContext);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    const searchUser = async (e) => {
      e.preventDefault();
      //console.log(state && state.user._id);
      try {
        const { data } = await axios.get(`/search-user/${query}`, {user:state});
        setResult(data);
        console.log(result)
      } catch (err) {
        console.log(err);
      }
    };

   
    

return (
  <>
    <form className="d-flex row" onSubmit={searchUser}>
      <div className="col-md-8">
        <input
          onChange={(e) => {
            setQuery(e.target.value);
            setResult([]);
          }}
          value={query}
          className="form-control"
          type="search"
          placeholder="search"
        />
      </div>
      <div className="col-md-4">
        <button className="btn btn-outline-primary col-12" disabled={query.length<=0}>Search</button>
      </div>
    </form>
    {result.length>0 && <PeopleMessage people={result} setReceiver={setReceiver}/> }
    
    </>
);

}
export default SearchMessage
 