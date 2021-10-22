import axios from "axios";
import { getMainAppHost } from "../../../../packages/global_utils";


export const downloadOrder= (authToken:string, orderId: string) =>
{
    return axios({
        method:'get',
        url: `${getMainAppHost}/api/orders/${orderId}/download`,
        responseType:'blob',
        headers: {
            'Authorization' : authToken
        }
    })
        
}