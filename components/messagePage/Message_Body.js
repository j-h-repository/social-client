import { UserContext } from "../../context";
import { useContext, useState } from "react";
import { List } from "antd";
// import People from "./cards/People";
// import { LoadingOutlined } from "@ant-design/icons";
// import axios from "axios";
// import {toast} from "react-toastify"

import MessaageSide from "./Message_Side";

//Import usercontext, usecontext, state, the people component, loading, and axios

const MessaageBody = ({ other, setOther, emitId, chat }) => {
  const [state, setState] = useContext(UserContext);
  // const [query, setQuery] = useState("");
  // const [result, setResult] = useState([]);

  return (
    <>
      <div className=" comp p-4">
        <div>
          {chat && chat.length > 0 ? (
            <>
              {chat &&
                chat.map((c) => (
                  <div className="row py-1">
                    {c.sentBy == state.user._id ? (
                      <>
                        <div
                          id={c && c._id}
                          className="col-5 offset-7 text-end"
                        >
                          <div className="badge rounded-pill text-bg-primary">
                            <div className="p-2">
                              
                              {c.message}
                              </div>
                          </div>
                          <p className="msg-date">
                                { new Date(c.created).getMonth()}/
                                { new Date(c.created).getDate()}/
                                { new Date(c.created).getFullYear()}, 
                                {`${" "}`}
                                { new Date(c.created).getHours()}:
                                { new Date(c.created).getMinutes()<=9 && 0}
                                { new Date(c.created).getMinutes()}
                            </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          id={c && c._id}
                          className="col-5 text-start"
                        >
                          <div className="badge rounded-pill text-bg-success">
                            <div className="p-2">{c.message}</div>
                          </div>
                          <p className="msg-date">
                                { new Date(c.created).getMonth()}/
                                { new Date(c.created).getDate()}/
                                { new Date(c.created).getFullYear()}, 
                                {`${" "}`}
                                { new Date(c.created).getHours()}:
                                { new Date(c.created).getMinutes()<=9 && 0}
                                { new Date(c.created).getMinutes()}
                            </p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </>
          ) : (
            <> You have no chats</>
          )}
        </div>
      </div>
    </>
  );
};
export default MessaageBody;
