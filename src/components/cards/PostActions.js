import { CommentOutlined, DeleteFilled, EditFilled, SmileOutlined, SmileFilled } from "@ant-design/icons";
import { UserContext } from "../../context";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";



const PostAction =({post, postLike, postUnlike})=> {

const [state] = useContext(UserContext);
const router = useRouter();

return(
    <div className="card-footer">
                {state && state.user._id !== post.postedBy._id ? 
                (

                  <div className="">
                    {post &&
                    post.likes.includes(state.user && state.user._id) ? (
                      <div>
                        <span>
                          <SmileFilled
                            style={{ fontSize: "16px" }}
                            onClick={() => postUnlike(post._id)}
                          ></SmileFilled>
                        </span>
                        <span className="px-1">{post.likes.length}</span>
                        <span>
                          <CommentOutlined
                            style={{ fontSize: "16px" }}
                            className="px-1"
                          ></CommentOutlined>
                        </span>
                        <span>{post.comments.length}</span>
                      </div>
                    ) : (
                      <div>
                        <span>
                          <SmileOutlined
                            style={{ fontSize: "16px" }}
                            onClick={() => postLike(post._id)}
                          ></SmileOutlined>
                        </span>
                        <span className="px-1">{post.likes.length}</span>
                        <span>
                          <CommentOutlined
                            style={{ fontSize: "16px" }}
                            className="px-1"
                          ></CommentOutlined>
                        </span>
                        <span>{post.comments.length}</span>
                      </div>
                    )}
                  </div>

                ) : (
                
                
                <div className="d-flex justify-content-between ">

                <span  className="py-2">
                <div>
                        <span>
                          <SmileOutlined
                            style={{ fontSize: "16px" }}
                          ></SmileOutlined>
                        </span>
                        <span className="px-1">{post.likes.length}</span>
                        <span>
                          <CommentOutlined
                            style={{ fontSize: "16px" }}
                            className="px-1"
                          ></CommentOutlined>
                        </span>
                        <span>{post.comments.length}</span>
                      </div>
                </span>
                  <span className="py-2">
                    <span>
                      <EditFilled
                        onClick={() => router.push(`/user/post/${post._id}`)}
                        style={{ fontSize: "16px" }}
                      ></EditFilled>
                    </span>
                    <span>
                      <DeleteFilled
                        onClick={() => handleDelete(post)}
                        style={{ fontSize: "16px" }}
                        className="px-2"
                      ></DeleteFilled>
                    </span>
                  </span>
                  </div>
                )
                }
            </div>
)


}

export default PostAction
