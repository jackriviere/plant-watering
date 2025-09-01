import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router";

const UserPage = () => {
  const [response, setResponse] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
      const myResponse = await axiosPrivate.get("/auth/test");
      setResponse(JSON.stringify(myResponse?.data));
      } catch (err) {
        console.log(err)
        navigate("/login", { state: { from: location }, replace: true})
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <button className="btn" onClick={() => navigate("/")}>
        Back to home page
      </button>
      <p>{response ? response : "No response"}</p>
      {/* <button className="btn" onClick={() => handleClick()}>
        Refresh
      </button> */}
    </div>
  );
};

export default UserPage;
