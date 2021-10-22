import { Divider, Grid, Typography } from 'hero-design';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../shared/components/header';
import { getUserInfoAsync } from './apiCalls/getUserInfo';
import ProfileCard from './components/profileCard';


export default function Profile() {
    const user = useSelector((state: any) => state.user);

    const [refresh, setRefresh] = useState(0);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getUserInfoAsync(user.token, user.id)
            .then((response: any) => {
                if (response.status == 200) {
                    const dataDeepCopy = JSON.parse(response.data) 
                    setUserInfo(dataDeepCopy)
                }
                else {
                    toast.error('There is an error')
                }
            })
            .catch(err => {
                toast.error('There is an error')
            })
    }, [refresh])

    return (
        <>
            <Header />
            <Divider />
            <Grid>
                <Grid.Row>
                    <Typography.Title
                        style={{
                            marginLeft: '12rem',
                            marginTop: '2rem',
                        }}
                    >
                        Profile 
                    </Typography.Title>
                </Grid.Row>
                {
                    !isEmpty(userInfo) &&
                    <Grid.Row
                        style={{
                            marginTop: '2rem'
                        }}
                    >
                        <Grid.Col span={[4, 4, 4, 4, 4]} />
                        <Grid.Col span={[12, 12, 12, 12, 12]}>
                            <ProfileCard user={userInfo} refresh={() => { setRefresh((state) => state + 1) }} />
                        </Grid.Col>
                        <Grid.Col span={[4, 4, 4, 4, 4]} />
                    </Grid.Row>
                }
            </Grid>
            <ToastContainer />
        </>
    )
}
