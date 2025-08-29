import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken"

const HomePage = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth();

  const [response, setResponse] = useState("");
  const [myToken, setMyToken] = useState(auth?.accessToken)

  const axiosPrivate = useAxiosPrivate();

  const handleClick = async () => {
    const newToken = await refresh()
    setMyToken(newToken)
  }

  return (
  <div>
    <p>{myToken ? `Access token is: ${myToken}` : "No access token"}</p>
    <button className="btn" onClick={() => handleClick()}>Refresh</button>
  </div>
  )

  ;
};

export default HomePage;
