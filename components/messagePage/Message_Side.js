import { UserContext } from "../../context";
 import { useContext, useState, useEffect } from "react";
// import People from "./cards/People";
// import { LoadingOutlined } from "@ant-design/icons";
 import axios from "axios";
// import {toast} from "react-toastify"
import { List, Avatar } from "antd";

import { EditFilled } from "@ant-design/icons";

import SearchMessage from "../SearchMessage";
//Import usercontext, usecontext, state, the people component, loading, and axios


const MessaageSide = ({setReceiver, list, setChat, chat}) => {
    ///the array of chats with other users displayed in chronological order, newest to oldest
    

    // const [query, setQuery] = useState("");
    // const [result, setResult] = useState([]);

    const [state] = useContext(UserContext);
    let look = ""

    
return (
  <>
    <div className="">
      <div className="row ">
        <SearchMessage setReceiver={setReceiver} />
      </div>
      <hr />
      Chats
      <div>
        {list && list.length>0 ? (
          <>
            <List
              itemLayout="horizontal"
              dataSource={list}
              renderItem={(chat) => (
                <List.Item className="user">
                  <List.Item.Meta
                 onMouseEnter={() => { setReceiver(chat && chat.people.map(people=>{
                  if(people._id != state.user._id){
                    return people
                  }
                }).sort()[0])}}
                 onClick={() => { 
                  setChat(chat && chat.messages); 
                  console.log("chat=>",chat); 
                  setReceiver(chat && chat.people.map(people=>{
                    if(people._id !=  state.user._id){
                      return people
                    }
                  }).sort()[0])
                 }
                }
                  
                    avatar={
                        <>
                      <Avatar
                        src={
                          chat && chat.people.map(people=>{
                            if(people._id != state.user._id){
                              return people.image.url
                            }
                          }).sort()[0]
                        }
                      />
                      
                      </>
                    }
                    title={`${
                      chat && chat.people.map(people=>{
                        if(people._id != state.user._id){
                          return people.firstName
                        }
                      }).sort()[0]
                    } `}
                  />
                </List.Item>
              )}
            />
          </>
        ) : (
          <> You have no chats</>
        )}
      </div>
    </div>
  </>
);

}
export default MessaageSide
 