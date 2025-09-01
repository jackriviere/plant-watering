import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/user");
  };

  return (
    <div>
      <button className="btn" onClick={handleClick}>Go to user</button>
    </div>
  );
};

export default HomePage;
