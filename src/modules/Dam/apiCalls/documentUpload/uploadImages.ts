import axios from "axios";
import { getMainAppHost } from "../../../../packages/global_utils";


export const uploadImagesAsync = (authToken: string, files: any) => {
    const formData = new FormData();
    files.forEach((file: any, index: number) => {
        formData.append(`files[]`, file);
    })

    return axios({
        method: 'post',
        url: `${getMainAppHost}/api/uploadmedias/uploadimages`,

        headers: {
            'Authorization': authToken,
            'content-type': 'application/form-data'
        },
        data: formData,
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent
            const percent = Math.floor((loaded * 100) / total)
            console.log(`${loaded}kB of ${total}kB| ${percent}%`)
        }
    })
}