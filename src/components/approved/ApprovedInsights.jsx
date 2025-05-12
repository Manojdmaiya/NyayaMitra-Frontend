import React, { useState, useEffect } from 'react';
import Insights from '../common/Insights';
import { checkAuthorization } from '../utils/auth';
import Unauthorized from '../background/Unauthorised';
import Loading from '../background/Loading';

const ApprovedInsights = () => {

  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const authorized = await checkAuthorization("/api/approved/v1/insights");
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

  return <Insights />

};


export default ApprovedInsights;
