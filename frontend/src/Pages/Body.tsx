import "../Styles/Body.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { postListFn } from "@/redux/slice/postList.slice";
import Spinner from "@/components/ui/Spinner";
import { userListFn } from "@/redux/slice/userList.slice";
import { Button } from "@/components/ui/button";

function Body() {
  const dispatch = useDispatch<AppDispatch>();
  const postState = useSelector((state: RootState) => state.PostListSlice);
  const userState = useSelector((state: RootState) => state.userListSlice);

  useEffect(() => {
    dispatch(postListFn());
    dispatch(userListFn());
  }, [dispatch]);

  if (postState.loading || userState.loading) return <Spinner />;
  if (postState.error) return <p className="text-red-600 text-xl">{postState.error}</p>;
  if (userState.error) return <p className="text-red-600 text-xl">{userState.error}</p>;

  const posts = postState.data?.post || [];
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
                <div className="profile">
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
                <div className="name">{post.name}</div>
                <div className="together">
                  <div className="text">{post.state}</div>
                  <div className="tick">⭐ 6.55</div>
                </div>
              </div>
            </div>
          </div>
        )})}
    </div>
  );
}

export default Body;
