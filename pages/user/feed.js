import UserRoute from "../../components/routes/UserRoute";
import CreatePost from "../../components/CreatePost";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context";
import { toast } from "react-toastify";
import UserPosts from "../../components/cards/UserPosts";
import People from "../../components/cards/People";
import Search from "../../components/Search";






const Feed = () => {
  //const router = useRouter();
 
  //const {_id} = router.query;
  //console.log(router)
  // const [totalPost, setTotalPost] = useState(0);
  // const [page, setPage] = useState(1);
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [imageLoad, setImageLoad] = useState(false);
  const [posts, setPosts] = useState([]);
  const [state, setState] = useContext(UserContext);
  const [people, setPeople] = useState([]);
  const [comment, setComment] = useState("");
  const [currentPost, setCurrentPost] = useState("");
  const [other, setOther] = useState("");


 

  useEffect(() => {
    if (state && state.token){ 
     
      getUserPosts();
      fetchPeople();
      
    };
  }, [state && state.token]);



 
  // const getTotal = async() => {
  //     try{
  //       const {data} = await axios.get("/total-posts");
  //       setTotalPost(data);
  //       console.log(totalPost)
  //     } catch(err){
  //       console.log(err)
  //     }
    
  //   }
    

  const fetchPeople=async()=>{
    try{
      const {data} = await axios.get("/find-people");
      setPeople(data);
    } catch(err){
      console.log(err);
    }
  }

  const getUserPosts = async () => {
    try {
      const { data } = await axios.get(`/user-posts`);
      setPosts(data);
  
    } catch (err) {
      console.log(err);
    }
  };

  const postContent = async (e) => {
    e.preventDefault();
    console.log(content);
    try {
      const { data } = await axios.post("/create-post", { content, image });
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Your post has been saved successfully");
        getUserPosts();
        setContent("");
        setImage({});
        setImageLoad(false);
        setPage(1);
      }
    } catch (err) {
      console.log(err);
    }
  };


	const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure about this?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post deleted");
      getUserPosts();
    } catch (err) {
      console.log(err);
    }
  };


  const uploadImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    console.log([...formData]);
    try {
      setImageLoad(true);
      const { data } = await axios.post("/upload-image", formData);
      setImage(data);
      setImageLoad(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (user) => {
   
    try{
  const {data} = await axios.put("/user-follow", {_id: user._id})
  
  let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));
      setState({...state, user: data});
      
      let filtered = people.filter((p) => (p._id !== user._id) ) ;
      setPeople(filtered);
  
      toast.success(`Following ${user.firstName} ${user.lastName}`)
  } catch(err){
    console.log(err)
  }
  }
  
  // const handleComment = async (e)=>{
  //   e.preventDefault();
  //   try{
      
  //   } catch(err){
  //     console.log(err)
  //   }
  // }

 
  
  const addComment = async (e)=>{
    e.preventDefault();
    try{
        console.log(comment);
        console.log(currentPost)
        const {data} = await axios.put("/add-comment", 
        {postId: currentPost, comment});
        if(data && data.error){
          toast.error(data && data.error)
        } else{
          setComment("");
          getUserPosts();
          toast.success("Comment posted");
        }
    } catch(err){
      console.log(err)
    }
  }


  

  return (
    <UserRoute>
      <div className="containter-fluid">
        <div className="row py-5">
          <div className="text-center">
            <h1 className="display-2">Feed</h1>
          </div>
        </div>
       
        <div className="row m-5">
          <div className="col-md-7">
            <CreatePost
              content={content}
              setContent={setContent}
              postContent={postContent}
              uploadImage={uploadImage}
              imageLoad={imageLoad}
              image={image}
            />
            <br />
            <UserPosts
              
              posts={posts}
              handleDelete={handleDelete}
              getUserPosts={getUserPosts}
              addComment={addComment}
              setComment={setComment}
              comment={comment}
              setCurrentPost={setCurrentPost}
              currentPost={currentPost}
             
            />
          </div>
          {/* <Pagination 
current={page} 
total={(totalPost/2)*5} 
onChange={(value)=> {setPage(value); console.log(value)}} 
/> */}

          
          <div className="col-md-5 text-center">
          <div>
              <h5>Find a User</h5>
            </div>
            <div className="py-3">
              <Search setOther={setOther} other={other}/>
            </div>
            <div>
              <h5>Suggestions for you</h5>
            </div>
            <People people={people} handleFollow={handleFollow}  />
          </div>
        </div>
        <div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Feed;
