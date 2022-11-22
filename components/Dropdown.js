import Link from "next/link";
import { Avatar } from "antd";


const Dropdown = ({image, logout,name, user}) => {
    return (
      <div className="dropdown">
        <button
          className="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
           {image ? ( <Avatar src={image} >but</Avatar>) : (<Avatar src="/images/profile.jpeg"></Avatar>)}
        </button>
        <ul className="dropdown-menu">
        
            <Link href="/user/following">
              <a className="nav-link">Follow List</a>
            </Link>
        <Link href={`/user/${user}`}>
            <a className="nav-link">{name}'s Dashboard</a>
        </Link>
        <Link href="/user/profile/update">
            <a className="nav-link">Update Profile</a>
        </Link>
        
        </ul>
      </div>
    );
}

export default Dropdown;