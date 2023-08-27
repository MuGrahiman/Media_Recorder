import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Form";
import "./App.css";
import SignIn from "./Pages/SignIn";
import SignUP from "./Pages/SignUp";
import Main from './Pages/Main';

function App() {
  // const logOutUser = ()=>{
  //   localStorage.removeItem('user')
  //   window.location.href = '/'; // Corrected line
  //  }
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<SignIn />} />
        <Route path={"/signup"} element={<SignUP />} />
        <Route path={"/main"} element={<Main />} />
        {/* <Route path={"/logout"} element={logOutUser} /> */}
      </Routes>
    </Router>
  );
}

export default App;
