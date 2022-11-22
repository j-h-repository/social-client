import { Avatar, List } from "antd";
import { UserContext } from "../../context";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { EditFilled } from "@ant-design/icons";

const PeopleMessage = ({people, setReceiver}) => {
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
            //   onMouseEnter={() => { setReceiver(user && user._id);}}
                
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
                            <EditFilled onClick={()=>{setReceiver(user)}}/>
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

export default PeopleMessage;