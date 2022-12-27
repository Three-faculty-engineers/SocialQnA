export interface UserDto {
    email: string;
    username: string;
}

export interface UserUpdateDto {
    username?: string;
    password?: string;
}