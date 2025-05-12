import React, { useState, useEffect } from 'react';
import Marquee from '../common/Marquee';
import { checkAuthorization } from '../utils/auth';

const ApprovedMarquee = () => {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const verify = async () => {
            const authorized = await checkAuthorization("/api/approved/v1/home");
            setIsAuthorized(authorized);
        };
        verify();
    }, []);

    if (isAuthorized === null) {
        return <></>;
    }

    if (!isAuthorized) {
        return <></>;
    }

    return (
        <Marquee />
    );
};


export default ApprovedMarquee;

