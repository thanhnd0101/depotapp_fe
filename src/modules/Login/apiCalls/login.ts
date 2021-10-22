import axios from "axios"
import { getMainAppHost } from "../../../packages/global_utils"
export const LOGIN_API_TYPE = 'login/apiCalls/login'


export const loginAsyc = (username:string, password:string) =>
{
    return axios({
        
        method:'post',
        url: `${getMainAppHost}/api/sessions`,
        params : {
            name:username,
            password:password
        }
    })
        
}