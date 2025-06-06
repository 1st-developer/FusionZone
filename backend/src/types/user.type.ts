export interface IRegisterUser {
    full_name: string;
    email: string;
    password: string;
    confirm_password: string;
    profile: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IListUser {
    id: string;
    full_name: string;
    email: string;
    password: string;
    created_At: Date;
    updated_At: Date;
    last_login: Date;
}

