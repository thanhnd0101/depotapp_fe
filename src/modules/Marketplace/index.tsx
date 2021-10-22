import { Divider, Grid } from 'hero-design';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from '../shared/components/header';
import { getDocsAsync } from './apiCalls/list';
import DocumentCard from './components/documentCard';

export default function Marketplace() {
    const [docs, setDocs] = useState<any[]>([]);
    const token = useSelector((state: any) => state.user.token)

    useEffect(() => {
        getDocsAsync(token)
            .then(res => {
                if (res.status == 200) {
                    if (Array.isArray(res.data)) {
                        const dataDeepCopy = res.data.map(doc => Object.assign({}, doc))
                        setDocs(dataDeepCopy)
                    }
                }
            })
    }, [])

    const docCards = docs.map(doc => {
        return <DocumentCard key={doc.id} cardInfor={doc} />
    })

    return (
        <>
            <Grid>
                <Header />
                <Divider />
                <Grid.Row>
                    <Grid.Col span={[20, 20, 20, 20, 20]} offset={[2, 2, 2, 2, 2]}>
                        <ul>
                            {docCards}
                        </ul>
                    </Grid.Col>

                </Grid.Row>
            </Grid>
            <ToastContainer />
        </>
    )
}