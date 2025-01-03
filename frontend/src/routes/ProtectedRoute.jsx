import userAtom from "@/atoms/user.atom";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";

const ProtectedRoute = () => {
  const user = useRecoilValue(userAtom);
  return user ? <Outlet /> : <Navigate to={"/auth"} />;
};

export default ProtectedRoute;
