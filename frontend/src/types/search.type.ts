export interface ISearch {
    isSuccess: boolean;
    Message:   string;
    posts:     Posts[];
}

export interface Posts {
    id:         string;
    profile:    string;
    name:       string;
    state:      string;
    created_At: Date;
    updated_At: Date;
    user_Id:    string;
}
