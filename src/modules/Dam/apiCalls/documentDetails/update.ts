import axios from "axios";
import { getMainAppHost } from "../../../../packages/global_utils";


export const updateDocAsync = (authToken:string, doc_id:string, payload:any) =>
{
    console.log(payload)
    const standardlizeParams = {
        ...(payload['title']) && {title: payload['title']},
        ...(payload['description']) && {description: payload['description']},
        ...(payload['price']) && {price: payload['price']},
        ...{publish: payload['publish']},
    }
    console.log(standardlizeParams)
    
    return axios({
        method: 'put',
        url: `${getMainAppHost}/api/documents/${doc_id}`,
        headers: {
            'Authorization' : authToken
        },
        params: standardlizeParams 
    })
        
}