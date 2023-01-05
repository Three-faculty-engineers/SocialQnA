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
    const result = await fetchResult(`${BASE_URL}/${payload.id}`, {
        method: "PUT",
        payload,
        token: localStorage.getItem("token") as string | undefined
    })

    return result;
}

export async function remove(id: string)
{
    const result = await fetchResult(`${BASE_URL}/${id}`, { 
        method: "DELETE"
    })

    return result;
}

export async function followUser(userFollowingID: string)
{
    const result = await fetchResult(`${BASE_URL}/follow/user`, {
        method: "POST",
        payload: {userFollowingID},
        token: localStorage.getItem("token")!
    })

    return result;
}

export async function getFollowUserInfo({userFollowID, userFollowingID}: {userFollowID: string, userFollowingID: string})
{
    const result = await fetchResult(`${BASE_URL}/${userFollowID}/follow/user/${userFollowingID}`, {
        method: "GET"
    })

    return result;
}