import React, { useState, useEffect } from "react";
import Home from "../common/Home";
import { checkAuthorization } from "../utils/auth";
import Loading from "../background/Loading";
import Unauthorized from "../background/Unauthorised";

const NormalHome = () => {

  const [isAuthorized, setIsAuthorized] = useState(null);


  useEffect(() => {
    const verify = async () => {
      const authorized = await checkAuthorization("/api/normal/v1/home");
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

  return <Home basePath="/normal" />
};

export default NormalHome;
