import Sidebar from "../../components/sidebar/AirlineSidebar";
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

const NewCrewMembers = ({ inputs, title }) => {
  const { crewId } = useParams();
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const [userData, setUserData] = useState([]);
  const [isFound , setisFound] = useState(false);
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
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const res1 = onSnapshot(
      collection(db, "crewDetails"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          //console.log(crewId)
         if(doc.id === crewId){
          const newDoc = doc.data();
          //list.push({ id: doc.id, ...doc.data() });
          //setFlightNo(newDoc.flightNo);
          setUserData(doc.data());
          //console.log(doc.data());
         }
        });
      },
      (error) => {
        console.log(error);
      }
    );
    try {
      const id = uuidv4();
      //console.log(flightNo)
      const res = await setDoc(doc(db, "crewMembers",id), {
        ...data,
        flightNo : userData.flightNo,
        crewId : crewId,
        status:"Active",
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
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button type="submit" class="btn">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCrewMembers;
