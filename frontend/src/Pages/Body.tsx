import "../Styles/Body.scss"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react";
import { postListFn } from "@/redux/slice/postList.slice";
import Spinner from "@/components/ui/Spinner";
function Body() {

  const dispatch = useDispatch<AppDispatch>();
  const postState = useSelector((state: RootState) => state.PostListSlice);
  
  
  useEffect(() => {
    dispatch(postListFn())
  }, [dispatch])
  
  if(postState.loading) return <Spinner />
  if(postState.error) return <p>{postState.error}</p>

  const posts = postState.data?.post || [];


  return (
    <div className="item">
            {posts.map((u) => 
            <div className="box" key={u.id}>
            <div className="image">
              <img src={`${u.profile}`} />
              </div>
              <div className="details">
                <div className="name">{u.name}</div>
                <div className="together">
                <div className="text">{u.state}</div>
                  <div className="tick">⭐ 6.55</div>
                </div>
              </div>
              </div>
            )}
      </div>
  )
}

export default Body