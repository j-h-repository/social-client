import { useRouter } from "next/router"; 
import axios from "axios";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import UserRoute from "../../../components/routes/UserRoute";
import CreatePost from "../../../components/CreatePost";



const PostEdit = () => {
  
    const router= useRouter();
    const [post, setPost] = useState({});
    const [content, setContent] = useState("");
    const [image, setImage] = useState({});
    const [imageLoad, setImageLoad] = useState(false);
  
    const _id = router.query._id

    useEffect(() =>{
        if(_id) fetchPost();
    }, [_id] );
    
    const fetchPost = async () =>{
        try{
             const {data} = await axios.get(`/user-posts/${_id}`);
             if(data && data.error){
              toast.error(data.error)
              router.push("/user/feed")
             } else{
              setPost(data);
              setContent(data.content);
              setImage(data.image);
             }
            
    } catch(err){
        console.log(err);
    }
    };

    const postSubmit = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put(`/update-post/${_id}`, {content, image})
            if (data && !data.ok) {
                toast.error("Something went wrong. Reload and try again")
              } else {
                toast.success("Post updated");
                router.push("/user/feed");
        } 
        } catch(err){
            console.log(err);
        }
    }
    
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append("image", file);
  
        try {
          setImageLoad(true);
          const { data } = await axios.post("/upload-image", formData);
          setImage(data);
          setImageLoad(false);
        } catch (err) {
          console.log(err);
        }
      };

    return(
        <UserRoute>
        <div className="containter-fluid">
          <div className="row py-5">
            <div className="text-center">
              <h1 className="display-2">Feed</h1>
            </div>
          </div>
          <div className="row m-5">
            <div className="col-md-8">
              <CreatePost
                content={content}
                setContent={setContent}
                postContent={postSubmit}
                uploadImage={uploadImage}
                imageLoad={imageLoad}
                image={image}
              />
            </div>
            <div className="col-md-4 text-center">Sidebar</div>
          </div>
        </div>
      </UserRoute>
    )
}

export default PostEdit;