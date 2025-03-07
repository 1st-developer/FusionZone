export interface ICreatePostResponce {
    isSuccess: boolean;
    Message:   string;
    post:      Post;
}

export interface ICreatePostBody {
    profile: string,
    name: string,
    token: string;
}


export interface IListPostResponse {
    isSuccess: boolean;
    Message:   string;
    post:      Post[];
}

export interface IListMyPostsResponse {
    iSuccess: boolean;
    Message:  string;
    user:     string;
    posts:    Post[];
}

export interface Post {
    id:         string;
    profile:    string;
    name:       string;
    created_At: Date;
    updated_At: Date;
    user_Id:    string;
}
