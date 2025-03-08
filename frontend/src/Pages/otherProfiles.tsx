import "../Styles/profile.scss"
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineLike } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { otherPostsFn } from "@/redux/slice/otherProfiles.slices";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { FaFacebookF, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";


dayjs.extend(relativeTime);


function OtherProfiles() {

    const dispatch = useDispatch<AppDispatch>();
    const otherPostsState = useSelector((state: RootState) => state.otherPostsSlice);
    const listUsersState = useSelector((state: RootState) => state.userListSlice);

    const {user_Id} = useParams();
    const findUser = listUsersState.data?.users?.find((u) => u.id === user_Id)

    useEffect(() => {
        dispatch(otherPostsFn(user_Id!));
    }, [])

    const shareUrl = window.location.href

  return (
    <div className="profile-page">
        <div className="self">
          <div className="back-img">
          {<img src={findUser?.profile} />}
          </div>
          <div className="image-controller">
        <div className="circle">
        <img src={findUser?.profile} />
        </div>
        <div className="user-detail">
        <div className="user-name">{findUser?.full_name}</div>
        <div className="about-me">
          <div className="about-follow">
          <div className="about-follow-div">
            <h2>10</h2>
            <p>Following</p>
          </div>
          <div className="about-follow-div">
            <h2>2.5m</h2>
            <p>Followers</p>
          </div>
          <div className="about-follow-div">
            <h2>70m</h2>
            <p>Likes</p>
          </div>
          </div>
          <div className="about-edits">
            <Button>Follow</Button>
            <Button>Message</Button>
          </div>
        </div>
        </div>
        </div>
        </div>

        <div className="my-post">
          {otherPostsState.data?.posts?.map((my) => (
            <div className="every" key={my.id}>
            <div className="image">
              <img src={my.profile} />
            </div>
            <div className="post-details">
            <div className="name"><h2>{my.name}</h2></div>
                <div className="together">
                  <Textarea placeholder="Comment" />
                  <div className="btns">
                  <div className="reaction">
                  <button className="reaction-btn"><AiOutlineLike /></button>
                  <button className="reaction-btn"><IoMdHeartEmpty /></button>
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
                    {dayjs(my.created_At).fromNow(true)}
                  </div>
                  </div>
                </div>
            </div>
          </div>
          ))}
        </div>

    </div>
  )
}

export default OtherProfiles