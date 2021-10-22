import { Notification, Button, Grid, Input, Switch, Modal } from "hero-design";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { updateDocAsync } from "../../apiCalls/documentDetails/update";
if (typeof window !== 'undefined') {
    injectStyle()
}

export default function DocumentDetails({ doc, setDoc }: { doc: any, setDoc: Function }) {
    const [editMode, setEditMode] = useState(false);
    const token = useSelector((state: any) => state.user.token)

    const displayValues = ['Title', 'Description', 'Price']
    const displayCheckedValues = ['Publish']

    const detailsInput = ['Title']
    const detailsInputElements = detailsInput.map(key => {
        return (
            <Grid.Row key={key}>
                <Grid.Col span={[12, 12, 12, 12, 12]}>
                    {key}
                </Grid.Col>
                <Grid.Col span={[12, 12, 12, 12, 12]}>
                    <Input disabled={!editMode} name={key} defaultValue={doc[key.toLowerCase()]}>
                    </Input>
                </Grid.Col>
            </Grid.Row>
        )
    })

    const [publishState, setPublishState] = useState(doc['publish'])

    const detailsPublishElements = (
        <Grid.Row>
            <Grid.Col span={[12, 12, 12, 12, 12]}>
                Publish
            </Grid.Col>
            <Grid.Col span={[12, 12, 12, 12, 12]}>
                <Switch
                    icon="checkmark"
                    disabled={!editMode}
                    checked={publishState}
                    onChange={(e) => setPublishState(e.target.checked)}
                    name={'Publish'}
                />
            </Grid.Col>
        </Grid.Row>
    )


    const detailsInputNumber = ['Price']
    const detailsInputNumberElements = detailsInputNumber.map(key => {
        return (
            <Grid.Row key={key}>
                <Grid.Col span={[12, 12, 12, 12, 12]}>
                    {key}
                </Grid.Col>
                <Grid.Col span={[12, 12, 12, 12, 12]}>
                    <Input
                        onKeyPress={(event) => {
                            const regex = /^\d*\.?\d*$/
                            if (!regex.test(event.key)) {
                                event.preventDefault()
                            }
                        }}
                        disabled={!editMode}
                        name={key}
                        defaultValue={doc[key.toLowerCase()]}>
                    </Input>
                </Grid.Col>
            </Grid.Row>
        )
    })

    const detailsAreaText = ['Description']
    const detailsAreaTextElements = detailsAreaText.map(key => {
        return (
            <Grid.Row key={key}>
                <Grid.Col span={[12, 12, 12, 12, 12]}>
                    {key}
                </Grid.Col>
                <Grid.Col span={[12, 12, 12, 12, 12]}>
                    <Input.TextArea
                        disabled={!editMode}
                        name={key}
                        defaultValue={doc[key.toLowerCase()]}>
                    </Input.TextArea>
                </Grid.Col>
            </Grid.Row>
        )
    })

    function save(e: any) {
        e.preventDefault()

        const gatheredValues: {
            [key: string]: string | number
        } = {}
        displayValues.forEach(key => {
            gatheredValues[key.toLowerCase()] = e.target[key].value
        })
        displayCheckedValues.forEach(key => {
            gatheredValues[key.toLowerCase()] = e.target[key].checked
        })
        const diffValues: {
            [key: string]: string | number
        } = {}
        displayValues.concat(displayCheckedValues).forEach(key => {
            key = key.toLowerCase();
            if (doc[key] !== gatheredValues[key]) {
                diffValues[key] = gatheredValues[key]
            }
        })

        const payload =
        {
            ...doc,
            ...diffValues
        }

        if (payload['publish'] && !payload['price']) {
            toast.error('Cannot publish with no price')
        }
        else {
            updateDocAsync(token, doc.id, diffValues)
                .then(res => {
                    if (res.status === 200) {
                        toast.success("Update successfully")
                        setDoc(payload)
                    }
                    else {
                        toast.error((res.data as Array<any>)[0].error_message)
                    }
                })
            setEditMode(false)

        }

    }

    return (
        <>
            <form onSubmit={save}>
                <Grid>
                    {detailsInputElements}
                    {detailsAreaTextElements}
                    {detailsInputNumberElements}
                    {detailsPublishElements}
                    <Grid.Row>
                        <Button onClick={(e) => setEditMode(true)} disabled={editMode} text={"Edit"} />
                        <Button type={'submit'} disabled={!editMode} text={"Save"} />
                    </Grid.Row>
                </Grid>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            < ToastContainer />
        </>
    )

}