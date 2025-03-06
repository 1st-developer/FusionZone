export interface IListOthePostsResponse {
    isSuccess: boolean;
    Message:   string;
    posts:     Post[];
}

export interface Post {
    id:         string;
    profile:    string;
    name:       string;
    created_At: Date;
    updated_At: Date;
    user_Id:    number;
}
