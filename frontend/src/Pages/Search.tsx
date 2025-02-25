import { useDispatch, useSelector } from "react-redux"
import "../Styles/Search.scss"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect, useState } from "react";
import { searchFn } from "@/redux/slice/search.slice";
import Spinner from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import NotFound from "./notFound";

function Search() {

    const dispatch = useDispatch<AppDispatch>();
    const searchState = useSelector((state: RootState) => state.searchSlice);
    const userState = useSelector((state: RootState) => state.userListSlice);
    
    const { name } = useParams(); 
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);

    useEffect(() => {
      dispatch(searchFn("some search term"));
    }, [dispatch]);

    useEffect(() => {
        if (name && searchState.data?.posts?.length) {
            const filtered = searchState.data.posts.filter((p) =>
                p.name.toLowerCase().includes(name.toLowerCase())
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(searchState.data?.posts || []); 
        }
    }, [name, searchState.data]);

    if (searchState.loading) return <Spinner />;
    if (searchState.error) return <p className="text-red-600 font-bold">{searchState.error}</p>
  

    return (
        <div className="search">
            <div className="auther">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((p) => {
                        const user = userState.data?.users?.find((u) => u.id === p.user_Id);
                        return (
                            <div className="creator" key={p.id}>
                                {user && (
                                    <div className="main">
                                        <div className="class">
                                            <div className="profile">
                                                <img src={user.profile} alt={user.full_name} />
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
                                <div className="posts">
                                    <div className="image">
                                        <img src={p.profile} alt={p.name} />
                                    </div>
                                    <div className="details">
                                        <div className="name">{p.name}</div>
                                        <div className="together">
                                            <div className="text">{p.state}</div>
                                            <div className="tick">⭐ 6.55</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <NotFound />
                )}
            </div>
        </div>
    );
}

export default Search;
