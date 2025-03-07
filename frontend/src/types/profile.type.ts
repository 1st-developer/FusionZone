export interface IUpdateProfileResponse {
    isSuccess: boolean;
    Message:   string;
    Profile:   Profile;
}

export interface Profile {
    id:         string;
    full_name:  string;
    email:      string;
    profile:    string;
    created_At: Date;
    updated_At: Date;
    last_login: Date;
}

export interface IUpdateProfileBody {
    id: string;
    profile: string;
    token: string;
}

