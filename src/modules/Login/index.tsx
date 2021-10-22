import { Button, Grid, Input, PageHeader } from 'hero-design';
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { globalStyles } from '../shared/styles/styles';
import { loginAsyc } from './apiCalls/login';
import { loginAction } from './reducers/reducers';


export default function Login() {
    const [userName, setUserName] = useState('thanh');
    const [password, setPassword] = useState('123456789');
    const dispatch = useDispatch();
    const history = useHistory()

    function login() {
        loginAsyc(userName, password)
            .then((data: any) => {
                if (data.status === 201) {
                    dispatch(loginAction({
                        token: data.data.auth_token,
                        username: userName,
                        id: data.data.id,
                    }))
                    history.push('/dam')
                }
            })
    }

    return (
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Col span={[8, 8, 8, 8, 8]} offset={[9, 9, 9, 9, 9]}>
                        <Image
                            src={'/augustus.png'}
                            roundedCircle
                            style={{ width: '300px', height: '', paddingLeft: '20px' }}
                        ></Image>
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row style={{ margin: `10px` }}>
                    <Grid.Col span={[8, 8, 8, 8, 8]} offset={[8, 8, 8, 8, 8]}>
                        <Input
                            onChange={(e) => { setUserName(e.target.value.trim()) }}
                            placeholder="Please enter your user name"
                            size="large"
                            style={{ margin: `10px` }}
                            value={userName}
                        />
                        <Input
                            onChange={(e) => { setPassword(e.target.value.trim()) }}
                            placeholder="Please enter your password"
                            size="large"
                            style={{ margin: `10px` }}
                            value={password}
                            type="password"
                        />
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row style={{ margin: `10px` }}>
                    <Grid.Col span={[4, 4, 4, 4, 4]} offset={[14, 14, 14, 14, 14]}>
                        <Button
                            onClick={login}
                            variant="filled"
                            intent="success"
                            text="Login"
                            size="large"
                            style={{...globalStyles.button}}
                            >
                        </Button>
                    </Grid.Col>

                </Grid.Row>
            </Grid>
        </>
    )
}
