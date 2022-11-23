import { Avatar, List } from "antd";
import { UserContext } from "../../context";
import { useContext, useState , useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Following = () => {
    const [state, setState] = useContext(UserContext);
    //const [image, setImage] = useState("");
    const [people, setPeople] = useState([])
    const router = useRouter();

    useEffect(() => {
      if (state && state.token){ 
        fetchPeople();
      };
    }, [state && state.token]);

    const fetchPeople=async()=>{
      try{
        const {data} = await axios.get("/user-following");
        console.log("data=> ", data)
        setPeople(data);
      } catch(err){
        console.log(err);
      }
    }


    const handleUnfollow = async (user) => {
      try{
    const {data} = await axios.put("/user-unfollow", {_id: user._id})
    
    let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        setState({...state, user: data});
        
        let filtered = people.filter((p) => (p._id !== user._id) ) ;
        setPeople(filtered);
      console.log(state)
        toast.success(`You unfollowed ${user.firstName} ${user.lastName}`)
    } catch(err){
      console.log(err)
    }
    }
    


    return (
      <>
      <div className=" px-5">
        <List
          itemLayout="horizontal"
          dataSource={people}
          renderItem={(user) => (
            <List.Item>
              <List.Item.Meta
                avatar={user&&user.image && user.image.url ? (<Avatar src={user.image.url}></Avatar>
                ) : (<Avatar>{user.firstName[0]}{user.lastName[0]}</Avatar>)}
                title={
                    <div className="d-flex justify-content-between">
                    {user && user.firstName} {user && user.lastName} <span className="text-primary follow" onClick={() => handleUnfollow(user)}>Unfollow</span>
                    </div>
                }
                />
            </List.Item>
          )}
        />
     </div> 
     </>
    );
}

export default Following;