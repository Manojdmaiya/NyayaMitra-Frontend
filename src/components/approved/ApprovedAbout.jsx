// About.js
import React, { useState, useEffect } from 'react';
import About from '../common/About';
import { checkAuthorization } from '../utils/auth';
import Unauthorized from '../background/Unauthorised';
import Loading from '../background/Loading';

const ApprovedAbout = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const authorized = await checkAuthorization("/api/approved/v1/about");
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

  return <About />

};

export default ApprovedAbout;