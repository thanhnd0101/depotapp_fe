import { Divider, Grid, Typography } from 'hero-design';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from '../shared/components/header';
import { getOrders } from './apiCalls/list';
import OrderCard from './components/OrderCard';

export default function Histories() {
    const [orders, setOrders] = useState<any[]>([]); 
    const user = useSelector((state: any) => state.user)
   
    const orderCards = orders.map(order => {
        return <OrderCard key={order.id} order={order}/>
    })
    useEffect(() => {
        getOrders(user.token, user.id)
            .then(res => {
                if (res.status == 200) {
                    if (Array.isArray(res.data)) {
                        const dataDeepCopy = res.data.map(doc => Object.assign({}, doc))
                        setOrders(dataDeepCopy)
                    }
                }
            })
    }, [orders])

    return (
        <>
            <Header />
            <Divider />
            <Grid
                style={{
                    marginBottom:'2rem'
                }}
            >
                <Grid.Row>
                    <Typography.Title
                        style={{ 
                            marginLeft:'7rem',
                            marginTop:'2rem',
                        }}
                    >
                        Order history
                    </Typography.Title>
                </Grid.Row>
                <Grid.Row
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    {orderCards}
                </Grid.Row>
            </Grid>
            <ToastContainer />
        </>
    )
}