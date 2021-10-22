import { Button, File, Modal } from "hero-design";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { globalStyles } from "../../../shared/styles/styles";
import { useForceUpdate } from "../../../utils/utils";
import { uploadImagesAsync } from "../../apiCalls/documentUpload/uploadImages";

export default function DocumentUpload({onUploadSuccess}:{onUploadSuccess:Function}) {
    const token = useSelector((state: any) => state.user.token)

    const [showUpload, setShowUpload] = useState<boolean>(false);
    function uploadFile(e: any) {
        setShowUpload(true)
    }

    return (
        <>
            <Button
                text="Upload"
                onClick={uploadFile}
                style={{ ...globalStyles.button }}
            >
            </Button>
            <Modal
                title="Upload images"
                open={showUpload}
                variant="basic"
            >
                <File.DragAndDrop
                    text="Drag and Drop images here"
                    accept=".jpg,.png,.jpeg"
                    multiple
                    onAccept={(files) => {
                        uploadImagesAsync(token, files)
                            .then(res => {
                                if (res.status == 201) {
                                    toast.success('Upload image successfull')
                                    setShowUpload(false)
                                    onUploadSuccess();
                                } else {
                                    toast.error('Upload image failed')
                                }
                            })
                            .catch(err => {
                                toast.error('There is an error occur')
                            })

                    }}
                />
            </Modal>
        </>
    )
}