import { API_URL } from "../config";
import { fetchResult } from "../utils/fetch.helper";

const BASE_URL = `${API_URL}/post`;

export async function getByUserID(id: string)
{
    const result = await fetchResult(`${BASE_URL}/user/${id}`, {
        method: "GET"
    })

    return result;
}