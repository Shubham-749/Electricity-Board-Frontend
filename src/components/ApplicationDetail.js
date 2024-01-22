import React from 'react';

import { useLocation } from 'react-router-dom';
import { formatDate } from './ApplicationList';

const ApplicationDetail = () => {

    const abc = useLocation();
    console.log(abc);
    const application = abc.state;
    if (!application) {
        return <div>No application selected</div>;
    }


    return (
        <div>
            <h2>Application Details</h2>
            <ul>
                <li>ID: {application.id}</li>
                <li>User ID: {application.user.id}</li>
                <li>Name: {application.user.name}</li>
                <li>Gender: {application.user.gender}</li>
                <li>District: {application.user.district}</li>
                <li>State: {application.user.state}</li>
                <li>Pincode: {application.user.pinCode}</li>
                <li>Ownership: {application.user.ownership}</li>
                <li>Government ID Type: {application.user.government_id_type}</li>
                <li>Government ID Number: {application.user.government_id_number}</li>
                <li>Category: {application.category}</li>
                <li>Load Value: {application.loadVal}</li>
                <li>Date of Application: {formatDate(application.dateOfApplication)}</li>
                <li>Date of Approval: {formatDate(application.dateOfApproval)}</li>
                <li>Modified Date: {formatDate(application.modifiedDate)}</li>
                <li>Status: {application.status}</li>
                <li>Reviewer ID: {application.reviewer?.id}</li>
                <li>Reviewer Name: {application.reviewer?.name}</li>
                <li>Reviewer Comments: {application.reviewComment}</li>
            </ul>
        </div>
    );
};

export default ApplicationDetail;
