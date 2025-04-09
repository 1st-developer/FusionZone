export interface IListFollowUserResponse {
    isSuccess: boolean;
    Message:   string;
    following: Following[];
}

export interface Following {
    id: string;
    full_name: string;
    email:     string;
    profile:   null | string;
}

export interface IFollowUserResponse {
    isSuccess: boolean;
    message:   string;
    follow:    Follow;
}

export interface Follow {
    id:         string;
    full_name:  string;
    email:      string;
    profile:    string | null;
    created_At: Date;
    updated_At: Date;
    last_login: Date;
}

export interface IFollowUserBody {
    following_id: string;
    token: string;
}

export interface IDeleteFollowResponse {
    isSuccess: boolean;
    message:   string;
}
