import React, { useState, useEffect } from 'react';
import Contact from '../common/Contact';
import { checkAuthorization } from '../utils/auth';
import Unauthorized from '../background/Unauthorised';
import Loading from '../background/Loading';

const NormalContact = () => {

  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const authorized = await checkAuthorization("/api/normal/v1/contact");
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

  return <Contact />


};

export default NormalContact;