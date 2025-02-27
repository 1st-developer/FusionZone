import { useDispatch, useSelector } from "react-redux"
import "../Styles/Search.scss"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react";
import { searchFn } from "@/redux/slice/search.slice";
import Spinner from "@/components/ui/Spinner";
import { useParams } from "react-router-dom";
import { userListFn } from "@/redux/slice/userList.slice";
import { Button } from "@/components/ui/button";
import NotFound from "./notFound";

function Search() {
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

export default Search;

