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

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("threads-user", JSON.stringify(userData));
  };

  return { login, logout, updateUser };
};

export default useAuthActions;
