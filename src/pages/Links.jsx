import React, { useState, useEffect } from 'react';
import AssociationService from '../API/AssociationService';
import M3uaLinkService from '../API/M3uaLinksService';
import SctpLinkService from '../API/SctpLinkService';
import AssociationList from '../components/AssociationList';
import M3uaLinkList from '../components/M3uaLinksList';
import SctpLinksList from "../components/SctpLinksList";
import Loader from '../components/UI/Loader/Loader';
import { UPDATE_LINKS_DELAY_TIME } from "../config";


const Links = () => {

    const [sctpLinks, setSctpLinks] = useState([]);
    const [m3uaLinks, setM3uaLinks] = useState([]);
    const [associations, setAssociations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(true);


    async function fetchData() {
        try {
            setIsUpdating(true);
            const [sctpLinks, m3uaLinks, associations] = await Promise.all([
                SctpLinkService.getAll(),
                M3uaLinkService.getAll(),
                AssociationService.getAll()
            ]);
            setSctpLinks(sctpLinks);
            setM3uaLinks(m3uaLinks);
            setAssociations(associations);
            setIsUpdating(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, UPDATE_LINKS_DELAY_TIME);
        return () => {
            clearInterval(interval);
        };
    }, []);

    if (isLoading === true) {
        return (
            <div class="text-center">
                <Loader />
            </div>
        )
    }

    return (
        <div>
            <SctpLinksList links={sctpLinks} updateLinks={fetchData} isUpdating={isUpdating}/>
            <br /><br />
            <M3uaLinkList links={m3uaLinks} updateLinks={fetchData} isUpdating={isUpdating}/>
            <br /><br />
            <AssociationList associations={associations} updateLinks={fetchData} sctpLinkList={sctpLinks} m3uaLinkList={m3uaLinks} isUpdating={isUpdating}/>
        </div>
    );
};

export default Links;