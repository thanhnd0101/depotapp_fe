import React, { useState } from "react";
import { Card, Grid, Typography } from 'hero-design'
import { Image } from "react-bootstrap";
import DocumentPanel from "../documentPanel";
import { addToCartAsync } from "../../apiCalls/documentCard/addToCart";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function DocumentCard({ cardInfor }: { cardInfor: any }) {
    const token = useSelector((state:any) => state.user.token )

    const [openDetail, setOpenDetail] = useState<boolean>(false);
    function openDetailPopup(e: any) {
        setOpenDetail(true)
    }

    const [mouseHover, setMouseHover] = useState<boolean>(false);
    function onMouseHover(e: any) {
        setMouseHover(true)
    }
    function onMouseLeave(e: any) {
        setMouseHover(false)
    }

    function addToCart(e: any){
        e.preventDefault()
        e.stopPropagation()

        addToCartAsync(token, cardInfor.id)
        .then(res =>{
            if (res.status == 201) {
                toast.success(`Added ${cardInfor.title} to cart`)
            } else {
                toast.error(`Failed to add ${cardInfor.title} to cart`)
            }
        })
        .catch(e =>{
                toast.error(`Failed to add ${cardInfor.title} to cart`)
        })
    }

    return (
        <>
            <Card
                key={cardInfor.id}
                id={cardInfor.id}
                variant={'primary'}
                style={{ width: '15rem', margin: '10px' }}
                imageSrc={cardInfor.path}
            >
                <div onMouseEnter={onMouseHover}
                    onMouseLeave={onMouseLeave}
                    onClick={openDetailPopup}
                    style={{ cursor: "pointer" }}>

                    <Card.Header style={{
                        wordWrap: 'break-word',
                        margin: '10px',
                        overflow: "hidden",
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        backgroundColor:'cadetblue',
                    }}>
                        {cardInfor.title}
                    </Card.Header>
                    <Card.Content style={{ wordWrap: 'break-word' }}>
                        <div style={{ position: 'relative' }}>
                            <Image
                                src={cardInfor.path}
                                fluid
                                style={{ width: '100%', height: '10rem' }}
                            />
                            {mouseHover &&
                                <div style={{
                                    position: 'absolute',
                                    backgroundColor: "antiquewhite",
                                    top: '85%',
                                    left: '0px',
                                    right: 0,
                                    bottom: 0,
                                }}
                                onClick={addToCart}
                                >
                                    <Image src="./shoppingCart.png"
                                        style={{
                                            width: '1rem',
                                            height: '1rem',
                                            float: 'left',
                                            paddingTop: '0.3rem',
                                            paddingLeft: '3rem'
                                        }}
                                    />

                                    <Typography.Text
                                        style={{
                                            fontSize: '1rem',
                                            paddingTop: '0.3rem',
                                            paddingLeft: '4.5rem'
                                        }}
                                    >
                                        Add to cart
                                    </Typography.Text>
                                </div>
                            }
                        </div>

                    </Card.Content>

                </div>

            </Card>

            {openDetail &&
                (<DocumentPanel onClose={() => setOpenDetail(false)} docId={cardInfor.id} />)
            }
        </>
    )
}