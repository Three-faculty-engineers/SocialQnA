import { API_URL } from "../config";
import { fetchResult } from "../utils/fetch.helper";

const BASE_URL = `${API_URL}/community`;

export async function getAll()
{
    const result = await fetchResult(`${BASE_URL}/getAll`, {
        method: "GET"
    })

    return result;
}