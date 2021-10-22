import axios from "axios";
import { getMainAppHost } from "../../../packages/global_utils";


export const getDocsAsync = (authToken:string) =>
{
    return axios({
        method:'get',
        url: `${getMainAppHost}/api/dam`,
        headers: {
            'Authorization' : authToken
        }
    })
        
}