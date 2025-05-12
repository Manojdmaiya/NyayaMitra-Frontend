import React, { useState, useEffect } from "react";
import Home from "../common/Home";
import { checkAuthorization } from "../utils/auth";
import Unauthorized from "../background/Unauthorised";
import Loading from '../background/Loading';

const ApprovedHome = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);


  useEffect(() => {
    const verify = async () => {
      const authorized = await checkAuthorization("/api/approved/v1/home");
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

  return <Home basePath="/approved" />
};

export default ApprovedHome;
