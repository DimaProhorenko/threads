import userAtom from "@/atoms/user.atom";
import { useSetRecoilState } from "recoil";

const useAuthActions = () => {
  const setUser = useSetRecoilState(userAtom);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("threads-user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("threads-user");
  };

  return { login, logout };
};

export default useAuthActions;
