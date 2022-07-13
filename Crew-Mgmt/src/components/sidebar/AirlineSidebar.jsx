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
import { useTranslation } from "react-i18next";

const TransportSidebar = () => {
  const {t} = useTranslation();
  let user = JSON.parse(localStorage.getItem('user'));
  //console.log(user)
  const { dispatch } = useContext(DarkModeContext);
  const navitage = useNavigate();
  const handleLogout = (e) =>{
    e.preventDefault();
    localStorage.clear();
    navitage('/')
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/airline" style={{ textDecoration: "none" }}>
          <span className="logo">{t("crLogo")}</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">{t("main")}</p>
          <Link to="/airline" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>{t("dashboard")}</span>
            </li>
          </Link>
          <p className="title">{t("lists")}</p>
          <Link to="/airline/manageCrew" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>{t("mngcrw")}</span>
            </li>
          </Link>
          <Link to="/airline/mangcrewMembers" style={{ textDecoration: "none" }}>
             <li>
              <StoreIcon className="icon" />
              <span>{t("mngcrwMem")}</span>
            </li>
          </Link>
         
          <Link to="/airline/viewRoster" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
            <span>{t("vwRostr")}</span>
          </li>
          </Link>
          <li>
            <LocalShippingIcon className="icon" />
            <span>{t("logArngmt")}</span>
          </li>
          <p className="title">{t("usful")}</p>
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
          <p className="title">{t("user")}</p>
          <Link to="/airline/Crewprofile" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>{t("prfl")}</span>
          </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleLogout}>{t("logout")}</span>
          </li>
          <p className="title">{t("theme")}</p>
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
