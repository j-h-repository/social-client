import { useState } from "react";
const AddComment = ({ addComment, setComment, post, comment, setCurrentPost, currentPost})=>{


    return (
      <form>
        <input
          type="text"
          className="form-control"
          placeholder="share your opinion"
          value={post.comment}
            id={post._id}
      
          onChange={(e) => {
            setComment(e.target.value);
            console.log()
          }}
        />
         
     

        <button
          className="btn btn-primary btn-sm btn-block mt-3"

          onMouseEnter={(e) => {
            setCurrentPost(post._id);
            
            let p = (document.getElementById(post._id).value);
            setComment(p)
            
           
           
               }}

          onClick={(e) => {
            e.preventDefault();
            setComment(comment)
            setComment(comment)
          
            document.getElementById(post._id).value = "";
            addComment(e)
          }}
        >
          Post
        </button>
      </form>
    );
}
export default AddComment