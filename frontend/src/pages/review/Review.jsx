import "./Review.css";
import PermMediaIcon from '@mui/icons-material/PermMedia';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Topbar from "../../components/topbar/Topbar";


export default function Review() {
  const { user } = useContext(Context);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:8800/api/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("http://localhost:8800/api/post", newPost);
      window.location.reload();
    } catch (err) {}
  };

  const colors = {
    orange: "#FFBA5A",
    grey:"#a9a9a9"
  }
  const handleClickStar = value => {
      setCurrentValue(value)
  }
  const handleClickStarOver = value => {
      setHoverValue(value)
  }
  const handleClickStarLeave = () => {
      setHoverValue(undefined)
  }

    

  return (
    <div className="review">
        <Topbar/>
        <div className="reviewWrapper">
            <div className="headerReview">
                <span className="textContent">Viết Review</span>
                <hr className="reviewHr" />
            </div>
            <div className="bodyReview">
                <div className="reviewLeft">
                    <div className="starRating">
                        <h2>Xếp hạng của bạn :</h2>
                        <div className="star">
                            <span className="score">Điểm Số : </span>
                            {stars.map((_, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        size = {24}
                                        style = {{
                                            marginRight: 10,
                                            cursor: "pointer"
                                        }}
                                        color = {(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                        onClick = {() => handleClickStar(index + 1)}
                                        onMouseOver = {() => handleClickStarOver(index + 1)}
                                        onMouseLeave = {handleClickStarLeave}

                                    />
                                )
                            })}
                        </div>

                    </div>

                    <div className="reviewTop">
                        <h2>Đánh Giá của bạn :</h2>
                        <div className="reviewcomment">
                            <img
                                className="reviewProfileImg"
                                src={
                                user.avatar
                                    ? PF + user.avatar
                                    : PF + "person/noAvatar.png"
                                }
                                alt=""
                            />
                            <input
                                placeholder={"What's in your mind " + user.username + "?"}
                                className="reviewInput"
                                ref={desc}
                            />
                        </div>
                    </div>
                    <hr className="reviewHr" />
                    {file && (
                    <div className="reviewImgContainer">
                        <img className="reviewImg" src={URL.createObjectURL(file)} alt="" />
                        <CancelIcon className="reviewCancelImg" onClick={() => setFile(null)} />
                    </div>
                    )}
                    <form className="reviewBottom" onSubmit={submitHandler}>
                        <div className="reviewOptions">
                            <label htmlFor="file" className="reviewOption">
                                <PermMediaIcon htmlColor="tomato" className="reviewIcon" />
                                <span className="reviewOptionText">Photo or Video</span>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </label>
                            <div className="reviewOption">
                                <LocalOfferIcon htmlColor="blue" className="reviewIcon" />
                                <span className="reviewOptionText">Tag</span>
                            </div>
                            <div className="reviewOption">
                                <RoomIcon htmlColor="green" className="reviewIcon" />
                                <span className="reviewOptionText">Location</span>
                            </div>
                            <div className="reviewOption">
                            <EmojiEmotionsIcon htmlColor="goldenrod" className="reviewIcon" />
                            <span className="reviewOptionText">Feelings</span>
                            </div>
                        </div>
                        <button className="reviewButton" type="submit">
                            Share
                        </button>
                    </form>
                </div>
                <div className="reviewRight">
                    <form className="reviewBox">
                       <h2>Thông tin địa điểm :</h2>
                        <input
                        placeholder="Tên"
                        type=""
                        required
                        className="reviewInput"
                        />
                        <input
                        placeholder="Địa điểm"
                        type="location"
                        required
                        minLength="6"
                        className="reviewInput"
                        />
                        <button className="reviewSubmitButton" type="submit">Gửi đánh giá của bạn</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}