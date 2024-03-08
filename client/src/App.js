import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Project from "./pages/Project/Project";
import Doc from "./pages/Doc/Doc";
import Noti from "./pages/Noti/Noti";
import Setting from "./pages/Setting/Setting";
import Profil from "./pages/Profil/Profil";
import Messagerie from "./pages/Messagerie/Messagerie";



function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="projects">
              <Route index element={<Project />} />
              
              
            </Route>
            <Route path="documents">
              <Route index element={<Doc />} />
              </Route>
            <Route path="profil">
              <Route index element={<Profil />} />
              
            </Route>
            <Route path="messagerie">
              <Route index element={<Messagerie />} />
              </Route>
              <Route path="notification">
              <Route index element={<Noti />} />
              </Route>
              <Route path="settings">
              <Route index element={<Setting/>} />
              </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
