import React, { useEffect, useState } from "react";
import Home from "../common/Home.jsx";
import Unauthorized from "../background/Unauthorised.jsx";
import { checkAuthorization } from '../utils/auth.js'
import Loading from "../background/Loading.jsx";

const AdminHome = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);


  useEffect(() => {
    const verify = async () => {
      const authorized = await checkAuthorization("/api/admin/v1/home");
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

  return <Home basePath="/admin" />;
};

export default AdminHome;
