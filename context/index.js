import { useState, createContext, useEffect } from "react";
import axios from "axios";
import {useRouter} from "next/router";

const UserContext = createContext();

const UserProvider = ({children}) => {
 
  const router = useRouter();
  const [state, setState] = useState({ user: {}, token: "" });

  // if(state && state.error){
  //   window.localStorage.removeItem("auth");
  //   router.push("/signin")
  // }
 
  useEffect(() => {
    setState(JSON.parse(window.localStorage.getItem("auth")));
    if(state == null){
      router.push("/")
    }
  }, []);

  const token = state && state.token ? state.token : "";

  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
  axios.defaults.headers.common ["Authorization"] = `Bearer ${token}`;

  axios.interceptors.response.use(
    function (response) {
      { return response }
    },
    function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config._isRetryRequest) {
        setState(null);
        window.localStorage.removeItem("auth");
        router.push("/signin")
      }
    }
  )


  return(
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
