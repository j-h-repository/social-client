import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const CreatePost = ({
  content,
  setContent,
  postContent,
  uploadImage,
  image,
  imageLoad,
}) => {
  return (
    <div className="card">
      <div className="card-body">
        <form className="form-group">
          <ReactQuill
            value={content}
            onChange={(e) => setContent(e)}
            theme="snow"
            className="form-control"
            placeholder="Post your thoughts here..."
          />
        </form>
      </div>
      <div className="form-footer">
        <div className="d-flex justify-content-between px-5 m-3">
          <label>
            {image && image.url ? (
              <Avatar size="large" src={image.url} />
            ) : imageLoad ? (
              <LoadingOutlined spin />
            ) : (
             <UploadOutlined style={{ fontSize:"20px"}}/>
            )}
             <input onChange={uploadImage} type="file" accept="image/*" hidden/>
          </label>
          <button onClick={postContent} className="btn btn-primary btn">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
