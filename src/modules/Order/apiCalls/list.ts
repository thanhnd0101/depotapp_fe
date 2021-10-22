import axios from "axios";
import { getMainAppHost } from "../../../packages/global_utils";


export const getLineItemsInCart = (authToken:string, userId: string) =>
{
    return axios({
        method:'get',
        url: `${getMainAppHost}/api/users/${userId}/cart`,
        headers: {
            'Authorization' : authToken
        }
    })
        
}