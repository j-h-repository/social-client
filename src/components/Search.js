import { UserContext } from "../context";
import { useContext, useState } from "react";
import People from "./cards/People";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import {toast} from "react-toastify"

//Import usercontext, usecontext, state, the people component, loading, and axios


const Search = ({other, setOther}) => {
    const [state, setState]= useContext(UserContext);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);

    const searchUser = async (e) => {
      e.preventDefault();
      //console.log(state && state.user._id);
      try {
        const { data } = await axios.get(`/search-user/${query}`, {user:state});
        setResult(data);
      } catch (err) {
        console.log(err);
      }
    };

    const handleFollow = async (user) => {
   
        try{
      const {data} = await axios.put("/user-follow", {_id: user._id})
      
      let auth = JSON.parse(localStorage.getItem("auth"));
          auth.user = data;
          localStorage.setItem("auth", JSON.stringify(auth));
          setState({...state, user: data});
          
          // let filtered = result.filter((p) => (p._id !== user._id) ) ;
          // setResult(filtered);
      
          toast.success(`Following ${user.firstName} ${user.lastName}`)
      } catch(err){
        console.log(err)
      }
      }

    const handleUnfollow = async (user) => {
        try{
      const {data} = await axios.put("/user-unfollow", {_id: user._id})
      
      let auth = JSON.parse(localStorage.getItem("auth"));
          auth.user = data;
          localStorage.setItem("auth", JSON.stringify(auth));
          setState({...state, user: data});
          
          // let filtered = result.filter((p) => (p._id !== user._id) ) ;
          // setResult(filtered);
        //console.log(state)
          toast.success(`You unfollowed ${user.firstName} ${user.lastName}`)
      } catch(err){
        console.log(err)
      }
      }

return (
  <>
    <form className="form-inline row" onSubmit={searchUser}>
      <div className="col-8">
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
      <div className="col-4">
        <button className="btn btn-outline-primary col-12" disabled={query.length<=0}>Search</button>
      </div>
    </form>
    {result.length>0 && <People people={result} handleFollow={handleFollow} handleUnfollow={handleUnfollow} other={other} setOther={setOther} /> }
       hey
    </>
);

}
export default Search
 
