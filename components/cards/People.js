import { Avatar, List } from "antd";
import { UserContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

const People = ({people, handleFollow, handleUnfollow}) => {
    const [state, setState] = useContext(UserContext);
    const [image, setImage] = useState("");
    const router = useRouter();


// useEffect( ()=>{console.log(other)},[other])



    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={people}
          renderItem={(user) => (
            <List.Item>
              <List.Item.Meta
              // onMouseEnter={(e) => { setOther(user && user._id);}}
              //   onClick={() => {
              //      setOther(user && user._id);
              //     emitId();
              //   }}
                avatar={
                  user && user.image && user.image.url ? (
                    <Avatar src={user.image.url}></Avatar>
                  ) : (
                    <>
                      <Avatar>
                        {user.firstName[0]}
                        {user.lastName[0]}
                      </Avatar>
                    </>
                  )
                }
                title={
                  <div className="d-flex justify-content-between">
                    <div>
                      {" "}
                      <Link href={`/user/${user.username}`}>
                        <a className="nav-link">
                          {" "}
                          {user && user.firstName} {user && user.lastName}
                        </a>
                      </Link>
                      <div>{user.username && <i> (@{user.username})</i>}</div>
                    </div>

                    <div>
                      {state && user && state.user._id == user._id ? (
                        <span>You</span>
                      ) : state &&
                        user &&
                        state.user.following.includes(user._id) ? (
                        <span
                          className="text-primary follow"
                          onClick={() => handleUnfollow(user)}
                        >
                          Unfollow
                        </span>
                      ) : (
                        <span
                          className="text-primary follow"
                          onClick={() => handleFollow(user)}
                        >
                          Follow
                        </span>
                      )}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </>
    );
}

export default People;