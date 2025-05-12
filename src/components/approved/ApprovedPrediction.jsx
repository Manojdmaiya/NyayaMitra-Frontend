import React, { useState, useEffect } from "react";
import Prediction from "../common/Prediction";
import { checkAuthorization } from "../utils/auth";
import Unauthorized from "../background/Unauthorised";
import Loading from '../background/Loading';

const ApprovedPrediction = () => {

    const [isAuthorized, setIsAuthorized] = useState(null);
    useEffect(() => {
        const verify = async () => {
            const authorized = await checkAuthorization("/api/approved/v1/prediction");
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
        <Prediction baseurl="approved" />
    );
};

export default ApprovedPrediction;
