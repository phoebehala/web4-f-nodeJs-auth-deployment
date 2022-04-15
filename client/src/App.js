import Navbar from "./components/navbar/Navbar";
import Posts from "./components/posts/Posts";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

// pages
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SettingPage from "./pages/SettingsPage";
import SinglePage from "./pages/SinglePage";
import WritePage from "./pages/WritePage";

// react route
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

// contextAPI
import { useContext } from "react";
import { Context } from "./context/Context"; 


function App() {

  // const {user} >>> taking these properties from my 'Context' (contextAPI) 
  const {user} = useContext(Context);

  return (
    // react fragment
    <Router> 
 

      <Routes >
          <Route path="/" element={<Home />} />

          <Route path="/register" 
                element={user? <Home/> :<RegisterPage />} />

          <Route path="/login" 
                element={user? <Home/> : <LoginPage />} />

          <Route path="/write" 
                element={user? <WritePage /> :<LoginPage/>} />

          <Route path="/settings" 
                element={user? <SettingPage/>:<LoginPage/>} />

          <Route path="/post/:postiId" element={< SinglePage/>} />     
         
      </Routes>
    

    </Router>
  );
}

export default App;
