import axios from "axios";
import { getMainAppHost } from "../../../../packages/global_utils";


export const setQuantityForLineItem = (authToken:string, lineItemId:string, quantity:number) =>
{
    return axios({
        method:'put',
        url: `${getMainAppHost}/api/lineitems/${lineItemId}/quantity`,
        headers: {
            'Authorization' : authToken
        },
        params: {
            quantity: quantity
        }
    })
        
}