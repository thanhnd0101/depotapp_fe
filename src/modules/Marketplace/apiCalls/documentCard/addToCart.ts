import axios from "axios";
import { getMainAppHost } from "../../../../packages/global_utils";


export const addToCartAsync = (authToken:string, doc_id:string) =>
{
    return axios({
        method: 'post',
        url: `${getMainAppHost}/api/lineitems`,
        headers: {
            'Authorization' : authToken
        },
        params: {
            "documentId":doc_id
        }
    })
}