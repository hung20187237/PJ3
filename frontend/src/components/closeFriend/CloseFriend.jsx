import "./CloseFriend.css";
import RssFeedIcon from '@mui/icons-material/RssFeed';

export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={PF+user.avatar} alt="" />
      <div>
        <span className="sidebarFriendName">{user.username}</span>
        <span className="sidebarFriendFollow">{user.usernumberpost}danh gia 
          <button className="buttonFollow1">
            <RssFeedIcon/>
            <span>theo doi</span>
          </button>
        </span>
      </div>
    </li>
  );
}
