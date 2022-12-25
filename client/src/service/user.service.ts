import { API_URL } from "../config";
import { fetchResult } from "../utils/fetch.helper";

const BASE_URL = `${API_URL}/user`;

export async function get(id: string)
{
    const result = await fetchResult(`${BASE_URL}/${id}`, {
        method: "GET"
    })

    return result;
}