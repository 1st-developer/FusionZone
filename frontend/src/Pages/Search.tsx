import { useDispatch, useSelector } from "react-redux"
import "../Styles/Body.scss"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react";
import { searchFn } from "@/redux/slice/search.slice";
import Spinner from "@/components/ui/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { userListFn } from "@/redux/slice/userList.slice";
import { Button } from "@/components/ui/button";
import NotFound from "./notFound";
import { AiOutlineLike } from "react-icons/ai";
import { IoIosShareAlt, IoMdHeartEmpty } from "react-icons/io";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { Textarea } from "@/components/ui/textarea";


dayjs.extend(relativeTime);

function Search() {
  const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const searchState = useSelector((state: RootState) => state.searchSlice);
    const userState = useSelector((state: RootState) => state.userListSlice);
    
    const { name } = useParams(); 

    useEffect(() => {
      if (name) {
        dispatch(searchFn(name));
        dispatch(userListFn());
      }
    }, [dispatch]);

    if (searchState.loading) return <Spinner />;
    if (searchState.error) return <NotFound />

    const posts = searchState.data?.posts ? searchState.data.posts : [];
    const users = userState.data?.users || [];

    return (
        <div className="item">
      {posts.map((post) => {
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
                  <Button>Follow</Button>
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
                  <button className="reaction-btn"><IoMdHeartEmpty /></button>
                  <button className="reaction-btn"><IoIosShareAlt /></button>
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
    </div>
    );
}

export default Search;

