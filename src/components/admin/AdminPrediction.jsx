import React, { useState, useEffect } from 'react';
import { checkAuthorization } from '../utils/auth';
import Unauthorized from '../background/Unauthorised';
import Prediction from "../common/Prediction";
import Loading from '../background/Loading';


const AdminPrediction = () => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    useEffect(() => {
        const verify = async () => {
            const authorized = await checkAuthorization("/api/admin/v1/prediction");
            setIsAuthorized(authorized);
        };
        verify();
    }, []);

    if (isAuthorized === null) {
        return <Loading />
    }

    if (!isAuthorized) {
        return <Unauthorized />;
    }

    return (
        <Prediction baseurl="admin" />
    );
};

export default AdminPrediction;
