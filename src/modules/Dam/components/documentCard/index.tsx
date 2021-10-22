import React, { useState } from "react";
import { Card, Grid } from 'hero-design'
import { Image } from "react-bootstrap";
import DocumentPanel from "../documentPanel";

export default function DocumentCard({ cardInfor }: { cardInfor: any }) {

    const [openDetail, setOpenDetail] = useState<boolean>(false);

    function openDetailPopup(e: any) {
        setOpenDetail(true)
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
                <div onClick={openDetailPopup} style={{ cursor: "pointer" }}>
                    <Card.Header style={{
                        wordWrap: 'break-word',
                        margin: '10px',
                        overflow: "hidden",
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        backgroundColor: 'black'
                    }}
                    >
                        {cardInfor.title}
                    </Card.Header>
                    <Card.Content style={{ wordWrap: 'break-word' }}>
                        <Image
                            src={cardInfor.path}
                            fluid
                            style={{ width: '100%', height: '10rem' }}
                        />
                    </Card.Content>

                </div>
            </Card>
            {openDetail &&
                (<DocumentPanel onClose={() => setOpenDetail(false)} docId={cardInfor.id} />)
            }
        </>
    )
}