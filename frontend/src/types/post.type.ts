export interface IListPostResponse {
    isSuccess: boolean;
    Message:   string;
    post:      Post[];
}

export interface Post {
    id:         string;
    profile:    string;
    name:       string;
    state:      string;
    created_At: Date;
    updated_At: Date;
    user_Id:    number;
}
