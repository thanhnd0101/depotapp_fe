import { Button, Divider, Grid, Typography } from "hero-design";
import fileDownload from "js-file-download";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { downloadOrder } from "../../apiCalls/OrderCard/downloadOrder";

export default function OrderCard({ order }: { order: any }) {
    const token = useSelector((state: any) => state.user.token)

    const inforKeys = ['Name', 'Address', 'Email', 'Total_price']
    const inforElements = inforKeys.map(infoKey => {
        return (
            <Grid.Row key={infoKey}>
                <Grid.Col span={[12, 12, 12, 12, 12]} offset={[2, 2, 2, 2, 2]}>
                    {infoKey}
                </Grid.Col>
                <Grid.Col span={[10, 10, 10, 10, 10]}>
                    {
                        <Typography.Text style={{ wordWrap: 'break-word' }}>
                            {`${order[infoKey.toLowerCase()]}`}
                        </Typography.Text>
                    }
                </Grid.Col>
            </Grid.Row>
        )
    })

    function download() {
        downloadOrder(token, order.id)
            .then((res: any) => {
                console.log(res)
                if (res.status === 200 || res.status === 201) {
                    toast.success("Download succesfully")
                    fileDownload(res.data, "zip.zip")
                }
                else {
                    toast.error("Failed to download")
                }
            })
            .catch(error => {
                toast.error("Failed to download")
            })
    }


    return (
        <Grid.Row
            style={{
                border: 'solid',
                borderRadius: '8px',
                marginTop: '1rem',
                height: '7rem',
                width: '80%',
            }}
        >
            <Grid.Col span={[4, 4, 4, 4, 4]}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography.Text>
                    No.
                </Typography.Text>
                {order.id}
            </Grid.Col>
            <Divider variant="vertical" />
            <Grid.Col span={[15, 15, 15, 15, 15]}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {inforElements}
            </Grid.Col>
            <Divider variant="vertical" />
            <Grid.Col span={[4, 4, 4, 4, 4]}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Button text="Download" onClick={download}></Button>
            </Grid.Col>
        </Grid.Row>
    )
}