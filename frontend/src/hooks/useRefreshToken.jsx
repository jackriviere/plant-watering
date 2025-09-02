import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.post(
        "/auth/token",
        {},
        {
          withCredentials: true,
        }
      );
      setAuth((prev) => {
        console.log("prev:", JSON.stringify(prev));
        console.log(response.data.accessToken);
        return {
          ...prev,
          user: response.data.user,
          accessToken: response.data.accessToken,
        };
      });
      console.log("new auth: ", JSON.stringify(auth));
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  return refresh;
};

export default useRefreshToken;
