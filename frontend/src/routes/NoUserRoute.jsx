import userAtom from "@/atoms/user.atom";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

const NoUserRoute = () => {
  const user = useRecoilValue(userAtom);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default NoUserRoute;
