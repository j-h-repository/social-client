import { useState, useContext } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import axios from "axios"
import {toast} from "react-toastify"
import {Modal} from "antd"
import Link from "next/link";
import SignUp from "../components/SignUp";
/**/ //copy and paste when annotating the page

const Signup = () => {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [ok, setOk]=useState(false);
  const [loading, setLoading]=useState(false)
  const [state]= useContext(UserContext);

  const handleSubmit = async(e) => {
    e.preventDefault();
 try {const {data}= await axios.post(`/signup` /*the endpoint its being sent to*/, {
  
      firstName,
      lastName,
      email,
      password,
      password2})
      if(data && data.error){
        toast.error(data.error)
        setEmail("");
        setPassword("");
        setPassword2("");
      } else{
       
        setOk(data.ok);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword2("");
        setPassword("");
      }
      
 

  }
  catch(err){toast.error(err)}
    };

  if(state&&state.token) router.push("/user/feed");

  return (
    <div className="container p-3">
      <h1 className="display-2">Sign Up</h1>

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
        setEmail={setEmail}
        setPassword={setPassword}
        setPassword2={setPassword2}
        setOk={setOk}
        setLoading={setLoading}
      />

      <div className="row">
        <div className="col-md-6">
          <Modal className="text-center" title="Successful account creation" open={ok} onCancel={()=>setOk(false)} footer={null}>
            <h4>Let's login to access your account!</h4>
            <Link href="/signin">
              <a className="btn btn-success btn-sm">Login</a>
            </Link>
          </Modal>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="text-center">
          <p>Already have an account? 
            <Link href="/signin"> Sign in</Link>
          </p>
          </div>
        </div>
      </div>

    </div>
  );
};
export default Signup;
