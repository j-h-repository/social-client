import { useState, useContext} from "react";
import axios from "axios"
import {toast} from "react-toastify"
import Link from "next/link";
import SignIn from "../components/SignIn";
import {useRouter} from "next/router";
import {UserContext} from "../context"

// import {io} from "socket.io-client";
// const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {reconnection: true})


const Signin = ()=>{

const router = useRouter();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading]=useState(false);
const [state, setState] = useContext(UserContext)

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(
      `/signin` /*the endpoint its being sent to*/,
      {
        email,
        password,
      }
    );
    

    if (data && data.error) {
      toast.error(data.error);
      setPassword("");
    } else {
     
      setState({ user: data.user, token: data.token });
      window.localStorage.setItem("auth", JSON.stringify(data));
      router.push("/user/feed");
     
    }
  } catch (err) {
    console.log(err);
  }
};

if(state&&state.token) router.push("/user/feed");

return (
  <div className="container p-3">
    <h1 className="display-2">Sign In</h1>

   <SignIn
      handleSubmit={handleSubmit}
      email={email} 
      password={password}   
      loading={loading}
      setEmail={setEmail}
      setPassword={setPassword}
      setLoading={setLoading}
    />

 

    <div className="row">
      <div className="col">
        <div className="text-center">
        <p>Don't have an account? 
          <Link href="/signup"> Sign up</Link>
        </p>
        </div>
      </div>
    </div>

  </div>
);
}
    export default Signin;