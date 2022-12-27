import { API_URL } from "../config";
import { UserUpdateDto } from "../user/user.dto";
import { fetchResult } from "../utils/fetch.helper";

const BASE_URL = `${API_URL}/user`;

export async function get(id: string)
{
    const result = await fetchResult(`${BASE_URL}/${id}`, {
        method: "GET"
    })

    return result;
}

export async function update(payload: UserUpdateDto)
{
    const result = await fetchResult(`${BASE_URL}/`, {
        method: "POST",
        payload,
        token: localStorage.getItem("token") as string | undefined
    })

    return result;
}