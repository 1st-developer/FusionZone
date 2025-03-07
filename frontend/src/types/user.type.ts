export interface IListUserResponse {
    isSuccess: boolean;
    Message:   string;
    users:      User[];
}

export interface User {
    id:           string;
    full_name:    string;
    email:        string;
    profile:      string;
    created_At:   Date;
    updated_At:   Date;
    last_login:   Date;
}

