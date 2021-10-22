import { Button, Divider, Dropdown, Grid, Menu } from "hero-design";
import { useState } from "react";
import { Image } from 'react-bootstrap';
import { NavLink, useHistory } from "react-router-dom";

const styles = {
    navLink: {
        paddingLeft: 13,
        textDecoration: 'none',
        color: 'black'
    },
}

export default function Header() {
    const history = useHistory()

    const [open, setOpen] = useState(false)
    const closeDropdown = () => setOpen(false)
    const dropdownContent = (
        <Menu 
            style={{ 
            }}
        >
            <Menu.Item text="Profile" onClick={profile} />
            <Divider />
            <Menu.Item text="Order history" onClick={histories} />
        </Menu>
    )

    function profile()
    {
        history.push('/profile')
    }
    function histories()
    {
        history.push('/histories');
    }

    return (
        <Grid.Row>
            <Grid.Col span={[8, 8, 8, 8, 8]}>
                <Image
                    src={'/augustus.png'}
                    roundedCircle
                    style={{
                        width: '100px',
                        height: '',
                        paddingLeft: '20px',
                        cursor: 'pointer'
                    }}
                    onClick={(e: any) => {
                        history.push('/dam')
                    }}
                ></Image>
            </Grid.Col>

            <Grid.Col span={[8, 8, 8, 8, 8]}></Grid.Col>
            <Grid.Col span={[8, 8, 8, 8, 8]} style={{}}>
                <NavLink
                    to="/marketplace"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "black"
                    }}
                    style={styles.navLink}
                >
                    Marketplace
                </NavLink>
                <NavLink
                    to="/orders"
                    activeStyle={{
                        fontWeight: "bold",
                        color: "black"
                    }}
                    style={styles.navLink}
                >
                    Orders
                </NavLink>
                <Dropdown
                    open={open}
                    content={dropdownContent}
                    target={
                        <Button
                            text="Account"
                            rightIcon="arrow-down"
                            onClick={() => setOpen(!open)}
                            style={{
                                background:'white',
                                color: "black",
                                fontSize: '1rem'
                            }}

                        />
                        // <NavLink
                        //     to={''}
                        //     activeStyle={{
                        //         fontWeight: "bold",
                        //         color: "black"
                        //     }}
                        //     style={{
                        //         ...styles.navLink,
                        //     }}
                        // >
                        //     Account
                        // </NavLink>
                    }
                    onClose={closeDropdown}
                />

            </Grid.Col>
        </Grid.Row>
    )
}