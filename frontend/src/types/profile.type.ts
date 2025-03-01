export interface IUpdateProfileResponse {
    isSuccess: boolean;
    Message:   string;
    Profile:   Profile;
}

export interface Profile {
    id:         number;
    full_name:  string;
    email:      string;
    password:   string;
    profile:    string;
    created_At: Date;
    updated_At: Date;
    last_login: Date;
}

export interface IUpdateProfileBody {
    id: number;
    profile: string;
    token: string;
}

