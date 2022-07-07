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
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate} from "react-router-dom";
import FormInput from "../../commonInput/FormInput";

const NewCrew = ({ inputs, title }) => {
  const [data, setData] = useState({
    airline : "",
  });
  const navigate = useNavigate();

 // console.log(data);

  const handleInput = (e) => {
    const id = e.target.name;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const id = uuidv4();
      const res = await setDoc(doc(db, "crewDetails",id), {
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
          <div className="right">
            <form onSubmit={handleAdd}>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <FormInput
                    {...input}
                    value={data[input.name]}
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

export default NewCrew;
