import './login.scss';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc, onSnapshot,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { signInWithEmailAndPassword  } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import image from '../../image/airport.jpg'

const Login = ({ inputs, title }) => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)
  //console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    //console.log(data.email)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const res = onSnapshot(collection(db,"users"),(snapShot)=>{
          snapShot.docs.forEach((doc)=>{
            const newDoc = doc.data();
            if(newDoc.email === data.email){
              if(newDoc.status === "Active"){
                //alert("Approved");
                if(newDoc.role === "Transport Admin"){
                  //alert("transport Admin")
                  dispatch({type:"LOGIN", payload:user})
                  navigate("/transport")
                }else if(newDoc.role === "Crew Admin"){
                  //alert("crew Admin")
                  dispatch({type:"LOGIN", payload:user})
                  navigate("/airline")
                }else{
                  dispatch({type:"LOGIN", payload:user})
                  navigate("/")
                }
              }else{
                console.log("User Not Approved")
              }
            }
          })
        }) 
      })
      .catch((error) => {
        setError(true);
      });
   
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="leftimg">
            <img
              src={image}
              alt=""
            />
          </div>
          <div className="rightl">
            <form onSubmit={handlelogin}>
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
              <button type="submit">
                Submit
              </button>
              <p className="eror">{error && <span>Wrong email or password!</span>}</p>
              <p><Link to='/forgotPassword'style={{ textDecoration: "none" }}><span>Forgot Password ?</span></Link></p>
              {/* <input type="checkbox" label="Remember Me"/> */}
              <p>New User.?</p>
              <button><Link to='/register' style={{ textDecoration: "none" ,color:'white'}}>
                Sign Up</Link>
              </button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
