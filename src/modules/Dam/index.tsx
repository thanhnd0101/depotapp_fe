import { Divider, Grid } from 'hero-design';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRefresh } from 'react-tidy';
import { ToastContainer } from 'react-toastify';
import Header from '../shared/components/header';
import { getDocsAsync } from './apiCalls/list';
import DocumentCard from './components/documentCard';
import DocumentUpload from './components/documentUpload';

export default function Dam() {
    const [docs, setDocs] = useState<any[]>([]);
    const token = useSelector((state: any) => state.user.token)
    const [render, setRender] = useState(false);
    function refresh()
    {
        setRender((state)=>!state)
    }

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
    }, [render])

    const docCards = docs.map(doc => {
        return <DocumentCard key={doc.id} cardInfor={doc} />
    })

    return (
        <>
            <Grid>
                <Header />
                <Divider />
                <Grid.Row style={{ paddingTop: '2rem' }}>
                    <Grid.Col span={[20, 20, 20, 20, 20]} offset={[17, 17, 17, 17, 17]}>
                        <DocumentUpload onUploadSuccess={()=>{refresh()}}/>
                    </Grid.Col>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Col span={[20, 20, 20, 20, 20]} offset={[3, 3, 3, 3, 3]}>
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