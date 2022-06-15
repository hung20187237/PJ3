import "./Sidebar.css";
import { useContext, useEffect, useState } from "react";
import CloseFriend from "../closeFriend/CloseFriend";
import axios from "axios";


export default function Sidebar(username) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:8800/api/user/all/all/all/");
      setUsers( res.data);
    };
    fetchUsers();
  }, );
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sideText">
          <span>Người dùng tích cực</span>
        </div>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
  
}