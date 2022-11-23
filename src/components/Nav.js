import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import Dropdown from "./Dropdown";


const Nav = ({query, setQuery}) => {
  const router = useRouter();
  const [state, setState] = useContext(UserContext);

  const image = state && state.user && state.user.image && state.user.image.url;
  const name = state && state.user && state.user.firstName;
  const username=state && state.user && state.user.username;

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/signin");
  };

  return (
    <nav className="navbar navbar-expand-sm bg-light justify-content-between px-3">
      <ul className="navbar-nav">
        {state !== null ? (
          <>
            <Dropdown logout={logout} image={image} name={name} user={username} />
            <Link href="/user/feed">
              <a className="nav-link">Feed</a>
            </Link>
           
            
            <Link href="/user/messages">
              <a className="nav-link">Messages</a>
            </Link>

            <a onClick={()=>{logout();window.localStorage.removeItem("alma")}} className="nav-link">
            Logout
        </a>
          </>
        ) : (
          <>
            <Link href="/">
              <a className="nav-link">Home</a>
            </Link>
            <Link href="/signin">
              <a className="nav-link">Sign In</a>
            </Link>
            <Link href="/signup">
              <a className="nav-link">Sign Up</a>
            </Link>
            
          </>
        )}
      </ul>
      

   
    </nav>
  );
};

export default Nav;
