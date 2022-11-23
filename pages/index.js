import { useContext } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";

const Home = ()=>{

    const [state] = useContext(UserContext);

    const router = useRouter();

    if(state&&state.token) router.push("/user/feed");

    return (
      <div
        className="containter-fluid"
        
      >
        <h1 className="display-2 font-weight-bold text-center">Homepage</h1>
        <div className="row">
            <div className="col-md-8 offset-2">
                <h1>
                    This is a simple web project (my first) that was built to gain a basic understanding of how utilize a functional web app using a front-end framework, Nodejs, and MongoDB
                 </h1>
                 <h1>
                  Please feel free to leave any feedback on my <a href="https://github.com/j-h-repository">github page</a> regarding what could be improved.
                 </h1>

            </div>
        </div>
        
      </div>
    );
}

export default Home;