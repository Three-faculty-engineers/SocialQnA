export interface UserDto {
    email: string;
    username: string;
}

export interface UserUpdateDto {
    id: string;
    username?: string;
    password?: string;
}