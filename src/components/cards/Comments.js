import { Modal, List, Comment } from "antd";
import moment from "moment";
import { useState, useContext } from "react";
import { UserContext } from "../../context";
import axios from "axios";
import {toast} from "react-toastify"
import { DeleteFilled } from "@ant-design/icons";

const Comments = ({post, visible, setVisible, getUserPosts})=> {

  const [deleteCom, setDeleteCom] = useState("")
  const [postDelCom, setPostDeleteCom] = useState("")
  const [state] = useContext(UserContext);
    
const deleteComment = async ()=>{
    
    const answer = window.confirm("Are you sure you want to delete this comment?")
    if(answer){
       try{
        const {data} = await axios.put("/delete-comment", 
        {postId: postDelCom, comment: deleteCom});
        if(data && data.error){
          toast.error(data && data.error)
        } else{
          setVisible(false);
          getUserPosts();
          toast.success("Post removed.")
        }
      } catch(err){
        console.log(err);
      }
    }
   
      
  }

    return (
      <Modal
        style={{ height: 'calc(100vh - 200px)' }}
        bodyStyle={{overflowY: 'auto'}}
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        title={`${post && post.postedBy && post.postedBy.firstName}'s Post`}
       
      >
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={post && post.comments}
          renderItem={(c) => (
            <>
            <li>
              <Comment
                author={`${c && c.postedBy && c.postedBy.firstName} ${c &&c.postedBy&& c.postedBy.lastName}`}
                avatar={c && c.postedBy.image && c.postedBy.image.url || "/images/profile.jpeg"}
                content={c && c.text}
                datetime={moment(c && c.created).fromNow()}
              />

              {state && state.user && state.user._id == c.postedBy._id || state.user._id == post.postedBy._id? (
                 <div className="d-flex justify-content-end">
                 <span className="follow" >
                     <DeleteFilled onClick={()=>{
                       setPostDeleteCom(post && post._id)
                       setDeleteCom(c.text);
                       deleteComment();
                       }}
                      
                     />
                 </span>
               </div>
              ):("")}
            </li>
            <hr/>
            </>
          )}
        />
      </Modal>
    );
}
export default Comments