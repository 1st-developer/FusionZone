import "../Styles/Body.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { postListFn } from "@/redux/slice/postList.slice";
import { userListFn } from "@/redux/slice/userList.slice";
import { Button } from "@/components/ui/button";
import { AiOutlineLike } from "react-icons/ai";
import { Textarea } from "@/components/ui/textarea"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PiShareFat } from "react-icons/pi";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { BsBookmark } from "react-icons/bs";
import GoldenSpinner from "@/components/ui/goldenSpinner";
import { getMyFollowingFn } from "@/redux/slice/getMyFollowing.slice";
import { createFollowFn } from "@/redux/slice/follow.slice";
import toast from "react-hot-toast";
import { deleteMyFollowingFn } from "@/redux/slice/deleteFollow.slice";



dayjs.extend(relativeTime);

function Body() {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const postState = useSelector((state: RootState) => state.PostListSlice);
  const userState = useSelector((state: RootState) => state.userListSlice);
  const loginState = useSelector((state: RootState) => state.loginSlice);
  const getMyFollowState = useSelector((state: RootState) => state.getMyFollowSlice);
  const createFollowState = useSelector((state: RootState) => state.createFollowSlice);
  const deleteMyFollowState = useSelector((state: RootState) => state.deleteMyFollowSlice);

  useEffect(() => {
    dispatch(postListFn());
    dispatch(userListFn());
    dispatch(getMyFollowingFn(loginState.data.token));
  }, [dispatch]);

  if (postState.error) return <p className="text-red-600 text-xl">{postState.error}</p>;
  if (userState.error) return <p className="text-red-600 text-xl">{userState.error}</p>;
  if(createFollowState.data.isSuccess) {
    toast.success(createFollowState.data.message);
  }
  if(createFollowState.error) {
    toast.error(createFollowState.error);
  }

  const posts = postState.data?.post;
  const users = userState.data?.users;


  const shareUrl = window.location.href

  return (
    <div className="all-map">

      <div className="status">
        <div className="add_status"></div>
        <div className="users">
          <div className="profile" style={{border: loginState.data?.user?.profile ? "none": "1px solid #bbb"}}>
            {loginState.data?.user?.profile ? <img src={loginState.data.user.profile} />: <h2 className="text-[3rem] font-bold">{loginState.data?.user?.full_name[0].toUpperCase()}</h2>}
          </div>
        </div>
        {getMyFollowState.data?.following?.map((u) => 
        <div className="users" key={u.id}>
        <div className="profile">
          {u.profile ? <img src={u.profile} />: []}
        </div>
        </div>
         )}
      </div>

      {postState.loading || userState.loading ? <GoldenSpinner />:
      <div className="item">
      {posts?.map((post) => {
        const user = users.find((u) => u.id === post.user_Id);

        return (
          <div className="creator" key={post.id}>
            {user && (
              <div className="main">
                <div className="class">
                <div onClick={() => navigate(`/other-profiles/${user.id}`)} className="profile">
                  <img src={user.profile} />
                </div>
                <div className="div">
                <div className="name">{user.full_name}</div>
                <div className="email">{user.email}</div>
                </div>
                </div>
                <div className="follow">
                  {localStorage.getItem("follow") ? <Button onClick={() => { dispatch(deleteMyFollowingFn({
                    following_id: user.id,
                    token: loginState.data.token,
                  })), localStorage.removeItem("follow")}}>Un follow</Button>:
                  <Button onClick={() => dispatch(createFollowFn({
                    following_id: user.id,
                    token: loginState.data.token
                  }))}>{createFollowState.loading ? <GoldenSpinner />: "Follow"}</Button>}
                </div>
              </div>
            )}
            <div className="box">
              <div className="image">
                <img src={post.profile}/>
              </div>
              <div className="details">
                <div className="name"><h2>{post.name}</h2></div>
                <div className="together">
                  <Textarea placeholder="Comment" />
                  <div className="btns">
                  <div className="reaction">
                  <button className="reaction-btn"><AiOutlineLike /></button>
                  <button className="reaction-btn"><BsBookmark /></button>
                  <Popover>
                    <PopoverTrigger><button className="reaction-btn relative top-1"><PiShareFat /></button></PopoverTrigger>
                    <PopoverContent className="flex gap-4">
                      <TelegramShareButton url={shareUrl}>
                      <button className="w-10 h-10 rounded-full bg-cyan-500 text-white flex justify-center items-center cursor-pointer text-2xl"><FaTelegramPlane /></button>
                      </TelegramShareButton>
                      <FacebookShareButton url={shareUrl}>
                      <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex justify-center items-center cursor-pointer text-2xl"><FaFacebookF /></button>
                      </FacebookShareButton>
                      <WhatsappShareButton url={shareUrl}>
                      <button className="w-10 h-10 rounded-full bg-green-600 text-white flex justify-center items-center cursor-pointer text-2xl"><FaWhatsapp /></button>
                      </WhatsappShareButton>
                      <TwitterShareButton url={shareUrl}>
                      <button className="w-10 h-10 rounded-full bg-cyan-600 text-white flex justify-center items-center cursor-pointer text-2xl"><FaXTwitter /></button>
                      </TwitterShareButton>
                    </PopoverContent>
                  </Popover>
                  </div>
                  <div className="created-at">
                    {dayjs(post.created_At).fromNow(true)}
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )})}
    </div>}
    </div>
  );
}

export default Body;
