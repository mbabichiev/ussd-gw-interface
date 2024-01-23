import React from 'react';
import BaseLinkList from './BaseLinkList';
import CreateM3uaLinkForm from './CreateM3uaLinkForm';
import M3uaLinkItem from './M3uaLinkItem';


const M3uaLinkList = ({ links, updateLinks, isUpdating }) => {


    function loadM3uaLinks() {
        if(links === null) {
            return <div>An error occurred during loading M3UA-links</div>
        }
        if (links.length === 0) {
            return <div>No M3UA-links</div>;
        }

        return <table class="text-center table table-striped table-sm">
            <thead class="bg-body-tertiary">
                <tr>
                    <th class="text-900">NAME</th>
                    <th class="text-900">TYPE</th>
                    <th class="text-900">OPC</th>
                    <th class="text-900">DPC</th>
                    <th class="text-900">SSN</th>
                    <th class="text-900">FUNCTIONALITY</th>
                    <th class="text-900">NI</th>
                    <th class="text-900">RС</th>
                    <th class="text-900">NA</th>
                    <th class="text-900">LONG MESSAGE RULE</th>
                    <th class="text-900">STATE</th>
                    <th class="text-900"></th>
                </tr>
            </thead>
            <tbody>
                {
                    links.map(link => <M3uaLinkItem link={link} key={link.id}/>)
                }
            </tbody>
        </table>

    }

    return (
        <BaseLinkList
        nameList="M3UA"
        table={loadM3uaLinks()}
        createButtonName={"Create M3UA-link"}
        form={<CreateM3uaLinkForm update={updateLinks}/>}
        isUpdating={isUpdating}
        />
        )
};

export default M3uaLinkList;