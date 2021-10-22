import axios from "axios";
import { getMainAppHost } from "../../../packages/global_utils";


export const makeOrder = (authToken:string) =>
{
    return axios({
        method:'post',
        url: `${getMainAppHost}/api/orders`,
        responseType:'blob',
        headers: {
            'Authorization' : authToken
        },
    })
        
}