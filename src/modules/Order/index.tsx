import { Button, Divider, Grid, Typography } from 'hero-design';
import fileDownload from 'js-file-download';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../shared/components/header';
import { globalStyles } from '../shared/styles/styles';
import { getLineItemsInCart } from './apiCalls/list';
import { makeOrder } from './apiCalls/makeOrder';
import LineItemCard from './components/LineItemCard';

export default function Order() {
    const [lineItems, setLineItems] = useState<any[]>([]);
    const user = useSelector((state: any) => state.user)



    const [refresh, setRefresh] = useState(0);
    const [lineItemPrice, setLineItemPrice] = useState<any>({});
    function updateOrderPrice(lineItemId: number, price: number) {
        setLineItemPrice((state: any) => {
            state[lineItemId] = price;
            return state;
        })
        setRefresh((state) => state + 1)
    }
    const [orderTotalPrice, setOrderTotalPrice] = useState(0);
    function getOrderTotalPrice() {
        let totalPrice = 0
        if (!isEmpty(lineItemPrice)) {
            Object.keys(lineItemPrice).forEach(key => {
                totalPrice += lineItemPrice[key]
            })
        }
        setOrderTotalPrice(Math.round((totalPrice + Number.EPSILON) * 100) / 100)

    }
    useEffect(() => {
        getOrderTotalPrice()
    }, [refresh])
    const lineItemCards = lineItems.map(item => {
        return <LineItemCard key={item.line_item_id} item={item} updateOrderPrice={updateOrderPrice} />
    })
    useEffect(() => {
        getLineItemsInCart(user.token, user.id)
            .then(res => {
                if (res.status == 200) {
                    if (Array.isArray(res.data)) {
                        const dataDeepCopy = res.data.map(doc => Object.assign({}, doc))
                        setLineItems(dataDeepCopy)
                    }
                }
            })
    }, [refresh])

    function makeAnOrder() {
        makeOrder(user.token)
            .then((res: any) => {
                console.log(res)
                if (res.status === 200 || res.status === 201) {
                    toast.success("Order succesfully")
                    setRefresh((state) => state + 1)
                    fileDownload(res.data, "zip.zip")
                }
                else {
                    toast.error("Failed to order")
                }
            })
            .catch(error => {
                toast.error("Failed to order")
            })
    }

    const isValidOrder = lineItems.length > 0;
    return (
        <>
            <Header />
            <Divider />
            <Grid>


                <Grid.Row
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    {lineItemCards}
                    <Grid.Row
                        style={{
                            justifyContent: 'right',
                            marginTop: '2rem',
                            width: '80%',
                        }}
                    >
                        <Grid.Col span={[4, 4, 4, 4, 4]}>
                            <Typography.Title
                                style={{
                                    textAlign: 'right',
                                }}
                            >
                                In total
                            </Typography.Title>
                        </Grid.Col>
                        <Grid.Col span={[4, 4, 4, 4, 4]}>
                            <Typography.Title
                                style={{
                                    textAlign: 'right',
                                }}
                            >
                                {orderTotalPrice.toString()}
                            </Typography.Title>

                        </Grid.Col>
                    </Grid.Row>
                    {
                        isValidOrder &&
                        <Grid.Row
                            style={{
                                justifyContent: 'right',
                                marginTop: '2rem',
                                width: '80%',
                            }}
                        >
                            <Grid.Col
                                span={[4, 4, 4, 4, 4]}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'right',
                                }}
                            >
                                <Button
                                    text="Order"
                                    size="large"
                                    style={{
                                        ...globalStyles.button
                                    }}
                                    onClick={makeAnOrder}
                                />
                            </Grid.Col>
                        </Grid.Row>

                    }
                </Grid.Row>
            </Grid>
            <ToastContainer />
        </>
    )
}