import {Routes,Route } from "react-router-dom";
import ProtectBrowser from "./components/protectBrowser.jsx";
import RegisterUser from "./components/RegisterU.jsx";
import LoginPage from "./components/Login.jsx";
import Admin from "./components/admiin.jsx";
import Client from "./components/client.jsx";
import Manager from "./components/Manager.jsx";
import UserProfile from "./components/userProfile.jsx";
import MainPage from "./components/MainPage.jsx";
function App(){
  return (
    <Routes>
      <Route path="/" element={<RegisterUser/> } />
      <Route path="/login" element={ <LoginPage/> } />
      <Route path="/admin" element={ <ProtectBrowser allowedRoles={"admin"}><Admin/></ProtectBrowser> }/>
      <Route path="/manager" element={<ProtectBrowser allowedRoles={"manager"}><Manager/> </ProtectBrowser>  }/>
      <Route path="/client" element={ <ProtectBrowser allowedRoles={"client"}><MainPage/></ProtectBrowser> } />
      <Route path="/userprofile" element={<ProtectBrowser allowedRoles={"staff"}><UserProfile/></ProtectBrowser>} />
      <Route path="/mainPage" element={<Client/>} />
    </Routes>
  )
};
export default App;