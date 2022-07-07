import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate} from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import {crewLabels} from "../../formlabels"

const TransportSidebar = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  //console.log(user)
  const { dispatch } = useContext(DarkModeContext);
  const navitage = useNavigate();
  const handleLogout = (e) =>{
    e.preventDefault();
    localStorage.clear();
    navitage('/login')
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/airline" style={{ textDecoration: "none" }}>
          <span className="logo">Airline Crew Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/airline" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/airline/manageCrew" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Manage Crew</span>
            </li>
          </Link>
          <Link to="/airline/mangcrewMembers" style={{ textDecoration: "none" }}>
             <li>
              <StoreIcon className="icon" />
              <span>Manage Crew Members</span>
            </li>
          </Link>
         
          <Link to="/airline/viewRoster" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>View Roster</span>
          </li>
          </Link>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Logistic Arrangement</span>
          </li>
          <p className="title">USEFUL</p>
          {/* <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          {/* <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">USER</p>
          <Link to="/airline/Crewprofile" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleLogout}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default TransportSidebar;
