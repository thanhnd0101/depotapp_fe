import axios from "axios";
import { getMainAppHost } from "../../../packages/global_utils";


export const getOrders = (authToken:string, userId: string) =>
{
    return axios({
        method:'get',
        url: `${getMainAppHost}/api/users/${userId}/orders`,
        headers: {
            'Authorization' : authToken
        }
    })
        
}