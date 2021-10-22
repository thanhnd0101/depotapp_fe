import { Button, Grid, Input } from "hero-design";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { updateUserAsync } from "../../apiCalls/profileCard/updateUser";
if (typeof window !== 'undefined') {
    injectStyle()
}

export default function ProfileCard({user, refresh}:{user:any, refresh:Function}) {

    const [editMode, setEditMode] = useState(false);
    const token = useSelector((state: any) => state.user.token)

    const displayValues = ['Email', 'Address']

    const detailsInput = ['Email', 'Address']
    const detailsInputElements = detailsInput.map(key => {
        return (
            <Grid.Row key={key}>
                <Grid.Col span={[12, 12, 12, 12, 12]}>
                    {key}
                </Grid.Col>
                <Grid.Col span={[12, 12, 12, 12, 12]}>
                    <Input disabled={!editMode} name={key} defaultValue={user[key.toLowerCase()]}>
                    </Input>
                </Grid.Col>
            </Grid.Row>
        )
    })
    const disableddetailsInput = ['Name']
    const disableddetailsInputElements = disableddetailsInput.map(key => {
        console.log(key.toLowerCase(), user, user[key.toLowerCase()], user["name"])
        return (
            <Grid.Row key={key}>
                <Grid.Col span={[12, 12, 12, 12, 12]}>
                    {key}
                </Grid.Col>
                <Grid.Col span={[12, 12, 12, 12, 12]}>
                    <Input disabled name={key} value={user[key.toLowerCase()]} defaultValue={user[key.toLowerCase()]}>
                    </Input>
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
        
        const diffValues: {
            [key: string]: string | number
        } = {}
        displayValues.forEach(key => {
            key = key.toLowerCase();
            if (user[key] !== gatheredValues[key]) {
                diffValues[key] = gatheredValues[key]
            }
        })

        const payload =
        {
            ...user,
            ...diffValues
        }

        if (payload['publish'] && !payload['price']) {
            toast.error('Cannot publish with no price')
        }
        else {
            updateUserAsync(token, user.id, payload)
            setEditMode(false)
            refresh()
        }

    }

    return (
        <>
            <form onSubmit={save}>
                <Grid>
                    {disableddetailsInputElements}
                    {detailsInputElements}
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