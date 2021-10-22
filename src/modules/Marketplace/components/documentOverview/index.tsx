import { Button, Divider, Grid, Typography } from "hero-design";
import { Image } from "react-bootstrap";

export default function DocumentOverView({ doc, options }: { doc: any, options: { addToCartEnabled: boolean } }) {
    const inforKeys = ['Price', 'File_Name', 'Media_Type']
    const inforElements = inforKeys.map(infoKey => {
        return (
            <Grid.Row key={infoKey}>
                <Grid.Col span={[12, 12, 12, 12, 12]} offset={[2, 2, 2, 2, 2]}>
                    {infoKey}
                </Grid.Col>
                <Grid.Col span={[10, 10, 10, 10, 10]}>
                    {
                        <Typography.Text style={{ wordWrap: 'break-word' }}>
                            {`${doc[infoKey.toLowerCase()]}`}
                        </Typography.Text>
                    }
                </Grid.Col>
            </Grid.Row>
        )
    })

    return (
        <Grid>
            <Grid.Row>
                <Grid.Col span={[16, 16, 16, 16, 16]}>
                    <Image src={doc.path} fluid style={{ width: '100%', height: '100%' }} />
                    <Divider />
                </Grid.Col>
                <Grid.Col span={[8, 8, 8, 8, 8]}>
                    <Typography.Title style={{ textAlign: 'center' }}>
                        Info
                    </Typography.Title>
                    {inforElements}
                </Grid.Col>
            </Grid.Row>
            {
                options["addToCartEnabled"] &&
                <Grid.Row>
                    <Grid.Col span={[20, 20, 20, 20, 20]} offset={[17, 17, 17, 17, 17]}>
                        <Button text="Add to cart"></Button>
                    </Grid.Col>
                </Grid.Row>
            }
        </Grid>
    )
}