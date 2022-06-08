import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Review from "./pages/review/Review";

function App() {

  const { user } = useContext(Context);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:username" element={user ? <Profile /> : <Login/>}/>
        <Route path="/messenger" element={user ? <Messenger /> : <Login/>}/>
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;
