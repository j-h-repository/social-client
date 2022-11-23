import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context";

import {toast} from "react-toastify"

import MessaageHead from "../../components/messagePage/Message_Head";
import MessaageSide from "../../components/messagePage/Message_Side";
import MessaageBody from "../../components/messagePage/Message_Body";
import MessaageFooter from "../../components/messagePage/Message_Footer";


const Message = () => {

  const [state] = useContext(UserContext);
  const [receiver, setReceiver] = useState({}); ///triggered when the receiver is selected and hovered over on selection
  const [message, setMessage] = useState(""); ///the message that is going to be sent to the selected user
  const [chat, setChat] = useState([]); //the array of messages between the logged in user and the selected receiver
  const [list, setList] = useState([]);

  useEffect( ()=>{
    if(state && state.token){
       
        fetchChats();
        
    }
  },[state && state.token])



const fetchChats = async () => {
    try{
        console.log("fetching messages")
        const {data} = await axios.get("/messages");
        setList(data);
        setList(data);
        setList(data);
        console.log("list=>",list)
    } catch(err){
        console.log(err)
    }
  };


  const sendMessage = async (e) => {

    e.preventDefault();
    let empty = Object.keys(receiver).length === 0
    try {

      console.log(receiver, state && state.user)
      if (empty) {
        console.log("you have to choose who to send to");
      } else {
        const { data } = await axios.post(
          "/send-message",
          {receive: receiver, message, sent:state && state.user}
        );
        fetchChats();
        setChat(list && list.messages)
        
       
       
        console.log(chat)
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <div className="container">
        <div className="row">
          <div className="col-3 py-2">
            <MessaageSide setReceiver={setReceiver} list={list} setChat={setChat} chat={chat} />
          </div>

          <div className="col-8 offset-1 py-2">
            <div className="row">
              <MessaageHead receiver={receiver} chat={chat}/>
            </div>
            <div className="row">
              <MessaageBody chat={chat} />
            </div>
            <div className="row">
              <MessaageFooter
              fetchChats={fetchChats}
                setMessage={setMessage}
                message={message}
                sendMessage={sendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Message;
