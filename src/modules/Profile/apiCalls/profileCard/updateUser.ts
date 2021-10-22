import axios from "axios"
import { getMainAppHost } from "../../../../packages/global_utils"

export const updateUserAsync = (authToken:string, userId:string, payload:any) =>
{
    const standardlizeParams = {
        ...(payload['address']) && {address: payload['address']},
        ...(payload['email']) && {email: payload['email']},
    }
    
    return axios({
        method: 'put',
        url: `${getMainAppHost}/api/users/${userId}`,
        headers: {
            'Authorization' : authToken
        },
        params: standardlizeParams 
    })
        
}
