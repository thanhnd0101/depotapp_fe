import { Modal, Tabs } from 'hero-design';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDocAsync } from '../../apiCalls/documentPanel/get';
import DocumentOverView from '../documentOverview';


export default function DocumentPanel({ docId, onClose, options = {addToCartEnabled:true} }: { docId: string, onClose:()=>void, options?:{addToCartEnabled:boolean}}) {
    const [selectedTabId, setSelectedTabId] = useState(1);
    const [doc, setDoc] = useState<any>({});
    const token = useSelector((state:any) => state.user.token)
    
    useEffect(() =>{
        getDocAsync(token, docId)
        .then(res=>{
            if (res.status == 200 && Array.isArray(res.data) && res.data.length == 1)
            {
                setDoc(res.data[0])
            }
        })
    }, [])

    const tabs = [
        {id: 1, title: 'Overview', panel: <DocumentOverView doc={doc} options={options} />},
    ]
    
    const modal =  <Modal
            open
            variant={'basic'}
            title={doc.title}
            onClose={onClose}
            size={'xlarge'}
        >
           <Tabs
            id={'document-panel-tab'}
            tabs={tabs}
            selectedTabId={selectedTabId}
            onChange={newTabId => setSelectedTabId(newTabId as number)}
           /> 
        </Modal>

    return (
        <>
            {!isEmpty(doc) && modal}
        </>
    )
}
