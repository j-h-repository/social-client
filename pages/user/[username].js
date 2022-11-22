import { Avatar, List } from "antd";
import { UserContext } from "../../context";
import { useContext, useState , useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { EditFilled } from "@ant-design/icons";

const User = () => {
    const [state, setState] = useContext(UserContext);
    //const [image, setImage] = useState("");
    const [user, setUser] = useState({});
    const router = useRouter();
    const [image, setImage] = useState("");
    const firstName = user && user.firstName;
    const lastName = user && user.lastName;

    useEffect(() => {
      if (state && state.token){ 
        fetchUser();
      };
    }, [state && state.token]);

    const fetchUser = async() => {
        try{
            const {data} = await axios.get(`/user/${router.query.username}`);
            setUser(data)
            if(data && data.image && data.image.url){
                setImage(data && data.image && data.image.url)
            }  else{
                setImage()
            }
           
    } catch(err){
        console.log(err);
    }
    }
    
    return (
      <>
      <div className=" px-5">
        <div className="container-fluid">

            <div className="row text-center py-3">
                <div>
                    {image ? ( <Avatar src={image} size={150} >but</Avatar>) : (<Avatar size={150} src="/images/profile.jpeg"></Avatar>)} 
                    
                    


                </div>
                <div className="display-3">
                    {user && user.firstName} {" "}
                    {user && user.lastName}
                    
                </div>
               { state && user && user._id==state._id && <span><EditFilled onClick={()=> router.push("/user/profile/update")}></EditFilled></span>}
            </div>
                    <hr/>
            <div className="row">
                <div className="col-md-9">
                    <div><h4>A little bit about me</h4></div>
                    <div className="py-4 px-2s">{user && user.about}</div>
                </div>
                <div className="col-md-3 text-center">
                    <div className="row py-2">
                        <h5>Followers</h5>
                        <h5>{user && user.followers && user.followers.length}</h5>
                    </div>
                    <div className="row py-2">
                        <h5>Following</h5>
                        <h5>{user && user.following && user.following.length}</h5>
                    </div>
                </div>
            </div>

            <div className="row">

            </div>
        </div>
     </div> 
     </>
    );
}

export default User;