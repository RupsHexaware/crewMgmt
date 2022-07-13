import Sidebar from "../../components/sidebar/TransportSidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  set,
  setDoc, onSnapshot,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams} from "react-router-dom";
import FormInput from "../../commonInput/FormInput";
import FormButton from "../../commonInput/FormButtons";

const NewCabDriver = ({ inputs, title }) => {
  const { crewId } = useParams();
  const [file, setFile] = useState("");
  const [data, setData] = useState({
    firstName: "",
  });
  const [per, setPerc] = useState(null);
  const [userData, setUserData] = useState([]);
  const [assignedCab , setassignedCab] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    //console.log(flightNo)
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);


 //console.log(crewId);
  const handleInput = (e) => {
    const id = e.target.name;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const id = uuidv4();
      //console.log(file)
      const res = await setDoc(doc(db, "cabDrivers",id), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
        <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
            <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              {inputs.map((input) => (
                    <FormInput
                    key={input.id}
                    {...input}
                    value={data[input.name]}
                    onChange={handleInput}
                  />
              ))}
              {/* //<button >Save</button> */}
              <div className="formInput">
                <label>Status</label>
                <select className="mt-4" id="assignedCab" value={assignedCab.value} onChange={handleInput}>
                  <option value="Select Value">Select Value</option>
                  <option value="Active" Selected>Active</option>
                  <option value="In Active">In Active</option>
                </select>
              </div>
              <FormButton type="submit">Save</FormButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCabDriver;
