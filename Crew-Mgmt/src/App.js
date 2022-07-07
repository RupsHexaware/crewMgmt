import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import AirlineList from "./pages/list/AirlineList"
import CrewMemberList from "./pages/list/CrewMemberList";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewCrew from "./pages/new/NewCrew"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { crewInputs, crewMemberInputs,userInputs ,forgotInputs ,loginInputs,resetInputs,userEditInputs} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register"
import Forgot from './pages/forgotPassword/ForgotPassword'
import Edituser from "./pages/edit/EditUser";
import EditCrew from "./pages/edit/EditCrew";
import NewPassword from "./pages/newPassword/NewPassword";
import AirlineHome from "./pages/home/AirlineHome";
import TransportHome from "./pages/home/TransportHome";
import CrewProfile from "./pages/profile/CrewProfile"
import ManageCrewMembers from "./pages/crewmembers/ManageCrewMembers";
import NewCrewMembers from "./pages/new/NewCrewMember";
import ViewRoster from "./pages/list/Roaster";
import TransportProfile from "./pages/profile/TransportProfile"

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login inputs={loginInputs} title="Login"/>} />
            <Route path="register" element={<Register inputs={userInputs} title="New User Registration"/>} />
            <Route path="forgotPassword" element={<Forgot inputs={forgotInputs} title="Forgot Password"/>} />
            <Route path="newPassword" element={<NewPassword inputs={resetInputs} title="New Password"/>} />
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="profile" element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Edituser inputs={userEditInputs}  title="Modify User" userId />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
          <Route path="/airline">
          <Route index element={
                <RequireAuth>
                  <AirlineHome />
                </RequireAuth>
              }
            />
            <Route path="Crewprofile" element={
                  <RequireAuth>
                    <CrewProfile />
                  </RequireAuth>
                }
              />
            <Route path="manageCrew" element={
                <RequireAuth>
                  <AirlineList />
                </RequireAuth>
              }
            />
            <Route
                path=":crewId"
                element={
                  <RequireAuth>
                    <CrewMemberList title="Crew Member List" crewId />
                  </RequireAuth>
                }
              />
            <Route path="newCrew" element={
                  <RequireAuth>
                    <NewCrew inputs={crewInputs} title="Add New Crew" />
                  </RequireAuth>
                }
              />
              <Route path="newCrewMembers/:crewId" element={
                  <RequireAuth>
                    <NewCrewMembers inputs={crewMemberInputs} title="Add Crew Members" crewId/>
                  </RequireAuth>
                }
              />
              <Route path="mangcrewMembers" element={
                  <RequireAuth>
                    <ManageCrewMembers title="Crew Member List" />
                  </RequireAuth>
                }
              />
              <Route path="viewRoster" element={
                  <RequireAuth>
                    <ViewRoster title="View Roster" />
                  </RequireAuth>
                }
              />
          </Route>
          <Route path="/transport">
          <Route
              index
              element={
                <RequireAuth>
                  <TransportHome />
                </RequireAuth>
              }
            />
            <Route path="transportProfile" element={
                  <RequireAuth>
                    <TransportProfile title="Transport Admin Profile" />
                  </RequireAuth>
                }
              />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
