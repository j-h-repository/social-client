import renderHTML from "react-render-html";
import axios from 'axios';
import moment from "moment";
import { Avatar, List, Modal } from "antd";
import { UserContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddComment from "./AddComment";
import PostAction from "./PostActions";
import Comments from "./Comments";
import Link from "next/link";


const UserPosts = ({posts, handleDelete, getUserPosts, addComment, setComment, comment, setCurrentPost, currentPost})=>{

    const router = useRouter();
    const [state]= useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const [modalPost, setModalPost] = useState({});

    // useEffect = {()=>{

    // },[]}

    const postLike = async (_id) => {
      try{
        const {data} = await axios.put("/post-like", {_id})
        getUserPosts();
      } catch(err){
        console.log(err)
      }
    }

    const postUnlike = async (_id) => {
      try{
        const {data} = await axios.put("/post-unlike", {_id})
        getUserPosts();
      } catch(err){
        console.log(err)
      }
    }


    
    ///click on a post by a user, grab the user name or id, send to the back end
    ///

    return (
      <>
        {posts &&
          posts.map((post) => (
            <div className="card mb-3" key={post._id} >
              <div className="card-header">
                <div className="d-flex">
                  {post && post.postedBy && post.postedBy.image ? (
                    <Avatar src={post.postedBy.image.url}></Avatar>
                  ) : (
                    <>
                      <Avatar src="/images/profile.jpeg"></Avatar>
                    </>
                  )}
                <Link  href={`/user/${
                        post && post.postedBy && post.postedBy.username
                      }`} >
                <span className="px-2 follow">
                      {post.postedBy.firstName} {post.postedBy.lastName}
                  </span>
                </Link>
                  
                  <span className="text-small px-1">
                      <small>Posted {moment(post.createdAt).fromNow()}</small>
                    </span>
                </div>

                <br />
                <div>{renderHTML(post.content)}</div>
              </div>
              {post.image && post.image.url && (
                <div className="card-body ">
                  <img
                    src={post.image && post.image.url}
                    className="img-fluid"
                  ></img>
                </div>
              )}

              <PostAction
                post={post}
                postLike={postLike}
                postUnlike={postUnlike}
              />

              <div className="card-footer py-2">
                {post && post.comments.length > 0 && (
                  <>
                    <div className="pb-3">Comments</div>
                    <div className="px-3">
                      <div className="d-flex justify-content-start">
                        <div>
                          <span>
                            <Avatar
                              src={
                                (post &&
                                  post.comments &&
                                  post.comments[post.comments.length - 1] &&
                                  post.comments[post.comments.length - 1]
                                    .postedBy.image &&
                                  post.comments[post.comments.length - 1]
                                    .postedBy.image.url) ||
                                "/images/profile.jpeg"
                              }
                            />
                          </span>
                          <span className="px-2">
                            {post &&
                              post.comments &&
                              post.comments[post.comments.length - 1] &&
                              post.comments[post.comments.length - 1].postedBy
                                .firstName}{" "}
                            {post &&
                              post.comments &&
                              post.comments[post.comments.length - 1] &&
                              post.comments[post.comments.length - 1].postedBy
                                .lastName}
                            <span className="time px-2">
                              {moment(
                                post &&
                                  post.comments &&
                                  post.comments[post.comments.length - 1] &&
                                  post.comments[post.comments.length - 1]
                                    .created
                              ).fromNow()}
                            </span>
                          </span>
                          <div className="p-3">
                            {post &&
                              post.comments &&
                              post.comments[post.comments.length - 1] &&
                              post.comments[post.comments.length - 1].text}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="py-1 follow"
                      onClick={() => {
                        setModalPost(post);
                        setVisible(true);
                      }}
                    >
                      See Comments
                    </div>

                    {window.location.pathname !== "/user/discover" && (
                      <>
                        {" "}
                        <hr />{" "}
                      </>
                    )}
                  </>
                )}
                {window.location.pathname !== "/user/discover" && (
                  <div>
                    <AddComment
                      addComment={addComment}
                      setComment={setComment}
                      comment={comment}
                      post={post}
                      setCurrentPost={setCurrentPost}
                      currentPost={currentPost}
                    ></AddComment>
                  </div>
                )}

                <Comments
                  visible={visible}
                  setVisible={setVisible}
                  post={modalPost}
                  getUserPosts={getUserPosts}
                />
              </div>
            </div>
          ))}
      </>
    );
};

export default UserPosts;