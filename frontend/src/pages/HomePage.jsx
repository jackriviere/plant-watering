import {  useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const HomePage = () => {

  const [response, setResponse] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const handleClick = async () => {
    const myResponse = await axiosPrivate.get("/auth/test")
    setResponse(JSON.stringify(myResponse?.data))
  }

  return (
  <div>
    <p>{response ? response : "No response"}</p>
    <button className="btn" onClick={() => handleClick()}>Refresh</button>
  </div>
  )

  ;
};

export default HomePage;
