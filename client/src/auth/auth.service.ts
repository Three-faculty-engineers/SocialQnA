import { API_URL } from "../config";
import { fetchResult } from "../utils/fetch.helper";
import { AuthLoginDto, AuthRegisterDto } from "./auth.dto";

const BASE_URL = `${API_URL}/auth`;
const USER_BASE_URL = `${API_URL}/user`

export async function login(payload: AuthLoginDto)
{
    const result = await fetchResult(`${BASE_URL}`, {
        method: "POST",
        payload
    })

    return result;
}

export async function register(payload: AuthRegisterDto)
{
    const result = await fetchResult(`${USER_BASE_URL}`, {
        method: "POST",
        payload
    })

    return result;
} 