import { useRef } from "react";
import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function UploadSiteImage() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [prevImage, setPrevImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      setImage(file);
      setPrevImage(URL.createObjectURL(file));
    } else {
      console.log("Please Select a valid Image file");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  const removeImage = (e) => {
    e.stopPropagation(); //prevents re-triggering filem input click
    setImage(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleUpload = async () => {
    const token = localStorage.getItem("token");
    const settingFormData = new FormData();
    settingFormData.append("logo", image);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/v2/uploadSiteImage`,
        {
          method: "POST",
          headers: { authorization: `Bearer ${token}` },
          body: settingFormData,
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      console.log(data.success);
      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="uploadCard">
        <div>
          <input
            type="file"
            name="logo"
            onChange={handleChange}
            accept="image/*"
            className="hidden-file-input"
            ref={fileInputRef}
          />
        </div>
        {prevImage ? (
          <div className="preview-Container">
            <img src={prevImage} alt="" className="image-preview" />
            <div className="imageOverlay">
              <span className="file-name">{fileName}</span>
              <button className="revome-Btn" onClick={removeImage}>
                X Remove
              </button>
              <button className="upload" onClick={() => handleUpload()}>
                Upload
              </button>
            </div>
          </div>
        ) : (
          <div className="upload-placeHolder">
            <div className="upload-icon" onClick={triggerFileInput}>
              📷
            </div>
            <p className="uploadText">Click to Upload An Image</p>
            <span className="upload-Subtext">
              Supports PNG , WEBP, JPEG, JPG
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
function UploadUSerProfile(props) {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [outGoing,setOutGoingImage]=useState(null)
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const files = [...e.target.files];
    const preview=files.map((item)=> {return URL.createObjectURL(item)})
    setFileName(files.map(file=>file.name));
    setOutGoingImage(files)
    setImage(preview);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  const removeImage = (e) => {
    e.stopPropagation(); //prevents re-triggering filem input click
    setImage(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const handleUploading=async()=>{
    
    try {
        const uploadingData= new FormData();
        outGoing.forEach((file)=>{
            uploadingData.append("images",file);
        })
        
        const res = await fetch(`${BACKEND_URL}/api/v2/uploadCerficate`,{
            method:"POST",
            headers:{authorization:`Bearer ${props.token}`},
            body:uploadingData
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("Error",data)
        }
        console.log(data)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="container">
      <div className="uploadCard" >
        <div>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleChange}
            accept="image/*"
            className="hidden-file-input"
            ref={fileInputRef}
          />
        </div>
        {image ? (
          <div className="preview-Container">
            <img src={image} alt="" className="image-preview" />
            <div className="imageOverlay">
              <span className="file-name">{fileName}</span>
              <button className="revome-Btn" onClick={removeImage}>
                X Remove
              </button>
               <button className="upload" onClick={() => handleUploading()}>
                Upload
              </button>
            </div>
          </div>
        ) : (
          <div className="upload-placeHolder">
            <div className="upload-icon" onClick={triggerFileInput}>📷</div>
            <p className="uploadText">Click to Upload An Image</p>
            <span className="upload-Subtext">
              Supports PNG , WEBP, JPEG, JPG
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
export { UploadSiteImage, UploadUSerProfile };
