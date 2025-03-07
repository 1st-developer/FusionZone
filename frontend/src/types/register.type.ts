export interface IRegisterUserResponse {
    isSuccess: boolean;
    Message:   string;
    user:      User;
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

export interface IRegisterUserBody {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
}
