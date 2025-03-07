export interface ILoginUserResponce {
    isSuccess: boolean;
    Message:   string;
    user:      User;
    token:     string;
}

export interface User {
    id:         string;
    full_name:  string;
    email:      string;
    profile:    string;
    created_At: Date;
    updated_At: Date;
    last_login: Date;
}

export interface ILoginUserBody {
    email: string;
    password: string;
}