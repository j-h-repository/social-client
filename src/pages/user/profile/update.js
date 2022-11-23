import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../context";
import axios from "axios"
import {toast} from "react-toastify"
import {Modal, Avatar} from "antd"
import SignUp from "../../../components/SignUp";
import { LoadingOutlined, CameraOutlined, DeleteOutlined, DeleteFilled } from "@ant-design/icons";
import { useRouter } from "next/router";

/**/ //copy and paste when annotating the page

const Update = () => {

  const router = useRouter();


  const [email] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [ok, setOk]=useState(false);
  const [loading, setLoading]=useState(false)
  const [state, setState]= useContext(UserContext);
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("")
  const [imageLoad, setImageLoad] = useState(false);

    useEffect( ()=>{
	if(state && state.user) 
		setUsername(state.user.username);
		setAbout (state.user.about);
		setFirstName(state.user.firstName);
		setLastName(state.user.lastName);
    setAbout(state.user.about);
    setUsername(state.user.username)
    setImage(state.user.image)
    }, [state && state.user] )


  const handleSubmit = async (e) => {
   console.log("button pressed")
   //console.log(state)
    e.preventDefault();
 try {const {data} = await axios.put(`/update-profile` /*the endpoint its being sent to*/, {
  
      firstName,
      lastName,
      password,
      password2,
      username,
      about, 
      image});

      if (data && data.error) {
        setUsername(state.user.username)
        return toast.error("Username already in use");
      } else {
        console.log(data)
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        //console.log("auth=>",auth)
        localStorage.setItem("auth", JSON.stringify(auth));
        setState({ ...state, user: data });
        //console.log("after state is set again=>", state)
        router.push(`/user/${username}`)
        toast.success("Your information has been updated successfully")
        //console.log("state=>",state)
        
      }
  }
  catch(err){toast.error(err)}
    };

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("image", file);
        console.log([...formData]);
        try {
          setImageLoad(true);
          const { data } = await axios.post("/upload-image", formData);
          setImage(data);
          setImageLoad(false);
        } catch (err) {
          console.log(err);
        }
      };

      const deleteImage = async () => {
        setImageLoad(true)
        try {
          const { data } = await axios.put("/delete-image", image);
          if(data && data.ok){
            setImage({});
            setImageLoad(false);
          }else{
            toast.error("there was an error deleting your photo. Please try again later")
          }
         
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div className="container p-3">
      <h1 className="display-2 text-center">Update your profile</h1>
    <div className="d-flex justify-content-center py-3">
    <label>
            {image && image.url ? (
              <Avatar size={100} src={image.url} className="profile-pic"/>
            ) : imageLoad ? (
              <LoadingOutlined spin />
            ) : (
             <CameraOutlined className="profile-pic"/>
            )}
             <input onChange={uploadImage} type="file" accept="image/*" hidden/>
          </label>
          <span className="m-4">
            <DeleteFilled onClick={()=> {console.log(image);deleteImage()}}></DeleteFilled>
          </span>
    </div>
      

     <SignUp
        handleSubmit={handleSubmit}
        firstName={firstName}
        lastName={lastName} 
        email={email} 
        password={password}   
        password2={password2} 
        ok={ok}
        loading={loading}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setPassword={setPassword}
        setPassword2={setPassword2}
        setOk={setOk}
        setLoading={setLoading}
        updateProfile={true}
        username={username}
        setUsername={setUsername}
        about={about}
        setAbout={setAbout}
      />

      {/* <div className="row">
        <div className="col-md-6">
          <Modal className="text-center" title="Successful profile update" open={ok} onCancel={()=>setOk(false)} footer={null}>
            <h4>Your information has been updates successfully</h4>
           
          </Modal>
        </div>
      </div> */}

    

    </div>
  );
};
export default Update;
