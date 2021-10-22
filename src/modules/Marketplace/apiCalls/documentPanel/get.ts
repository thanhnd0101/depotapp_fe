import axios from "axios";
import { getMainAppHost } from "../../../../packages/global_utils";


export const getDocAsync = (authToken:string, doc_id:string) =>
{
    return axios({
        method: 'get',
        url: `${getMainAppHost}/api/documents/${doc_id}`,
        headers: {
            'Authorization' : authToken
        },
    })
}