import "../Styles/profile.scss"
import { Textarea } from "@/components/ui/textarea";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosShareAlt, IoMdHeartEmpty } from "react-icons/io";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { otherPostsFn } from "@/redux/slice/otherProfiles.slices";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";


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
                  <button className="reaction-btn"><IoIosShareAlt /></button>
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