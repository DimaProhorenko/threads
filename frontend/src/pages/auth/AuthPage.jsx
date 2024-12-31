import React from "react";
import { useRecoilValue } from "recoil";

import authScreenAtom from "@/atoms/auth.atom";
import LoginCard from "@/components/auth/LoginCard";
import SignupCard from "@/components/auth/SignupCard";

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
