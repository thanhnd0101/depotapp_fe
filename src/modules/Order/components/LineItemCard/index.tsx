import { Box, Button, Divider, Grid, Icon, Input, Typography } from "hero-design";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCartAsync } from "../../../Marketplace/apiCalls/documentCard/addToCart";
import DocumentPanel from "../../../Marketplace/components/documentPanel";
import { setQuantityForLineItem } from "../../apiCalls/LineItemCard/changeQuantity";

const buttonStyle = ({ hover }: { hover: any }) => ({
    cursor: 'pointer',
})

export default function LineItemCard({ item, updateOrderPrice }: { item: any, updateOrderPrice: Function }) {
    const token = useSelector((state: any) => state.user.token)

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
                            {`${item[infoKey.toLowerCase()]}`}
                        </Typography.Text>
                    }
                </Grid.Col>
            </Grid.Row>
        )
    })

    const [quantity, setQuantity] = useState<number>(item.line_item_quantity);
    function setQuantityWith(number: number) {
        setQuantityForLineItem(token, item.line_item_id, number)
            .then((res => {
                if (res.status === 200) {
                    setQuantity(number)
                }
            }))
    }

    const [hover, setHover] = useState(false);

    const [totalPrice, setTotalPrice] = useState<number>(quantity * item.price)
    useEffect(() => {
        setTotalPrice(quantity * item.price)
        updateOrderPrice(item.line_item_id, quantity * item.price)
    }, [quantity])


    const [openDetail, setOpenDetail] = useState<boolean>(false);
    function openMarketPlacePanel() {
        setOpenDetail(true);
    }

    return (
        <>
            <Grid.Row
                style={{
                    border: 'solid',
                    borderRadius: '8px',
                    marginTop: '1rem',
                    height: '7rem',
                    width: '80%',
                }}
            >
                <Grid.Col
                    span={[4, 4, 4, 4, 4]}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        onClick={openMarketPlacePanel}
                        style={{ 
                            cursor:'pointer'
                        }}
                    >
                        <Image
                            src={item.path}
                            roundedCircle
                            style={{
                                top: 0,
                                left: 0,
                                width: '5rem',
                                height: '5rem',
                                padding: '1rem'
                            }}
                        />
                    </div>

                </Grid.Col>
                <Divider variant="vertical" />
                <Grid.Col span={[11, 11, 11, 11, 11]}
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
                        alignItems: 'center',
                    }}
                >
                    <Typography.Text
                        style={{
                            margin: '15px'
                        }}
                    >
                        Quantity
                    </Typography.Text>
                    <Grid.Row
                        style={{
                            justifyContent: 'space-between'
                        }}
                    >
                        <Grid.Col span={[1, 1, 1, 1, 1]} />
                        <Grid.Col span={[4, 4, 4, 4, 4]}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                onClick={() => setQuantityWith(quantity - 1)}
                                style={buttonStyle({ hover })}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >
                                <Icon
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                    }}
                                    icon={
                                        <img src="data:image/png;base64,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" />
                                    }
                                ></Icon>
                            </div>

                        </Grid.Col>
                        <Grid.Col span={[10, 10, 10, 10, 10]}>
                            <Input
                                style={{
                                    textAlign: 'center'
                                }}
                                onChange={(event: any) => {
                                    const regex = /^\d*$/
                                    if (!regex.test(event.target.value)) {
                                        event.preventDefault()
                                    }
                                    else {
                                        const value = event.target.value.trim() || 0
                                        setQuantityWith(parseInt(value))
                                    }
                                }}
                                value={quantity.toString()}
                            >
                            </Input>
                        </Grid.Col>
                        <Grid.Col span={[4, 4, 4, 4, 4]}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div
                                onClick={() => setQuantityWith(quantity + 1)}
                                style={buttonStyle({ hover })}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >
                                <Icon
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                    }}
                                    icon={
                                        <img src="data:image/png;base64,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" />
                                    }
                                ></Icon>
                            </div>
                        </Grid.Col>
                        <Grid.Col span={[1, 1, 1, 1, 1]} />
                    </Grid.Row>
                </Grid.Col>
                <Divider variant="vertical" />
                <Grid.Col span={[4, 4, 4, 4, 4]}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography.Text
                        style={{
                            margin: '15px'
                        }}
                    >
                        Total
                    </Typography.Text>
                    {totalPrice}
                </Grid.Col>
            </Grid.Row>
            {openDetail &&
                (<DocumentPanel onClose={() => setOpenDetail(false)} docId={item.document_id} options={{addToCartEnabled:false}} />)
            }
        </>
    )
}