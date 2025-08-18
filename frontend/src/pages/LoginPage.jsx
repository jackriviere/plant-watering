import { X } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../api/axios.js";
import useAuth from "../hooks/useAuth.jsx";

const LoginPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "/auth/login",
        { username: user, password: pwd },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data)
      const accessToken = response?.data?.accessToken;
      setAuth({ user, accessToken });
      setUser("");
      setPwd("");
      console.log("navigating...")
      navigate("/");
    } catch (error) {
      if (!error?.response) {
        setError("No Server Response");
      } else if (error.response?.status === 400) {
        setError("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-32">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xl border p-4 pt-16 mx-auto ">
            <legend className="fieldset-legend text-5xl text-primary">
              Login
            </legend>

            <label htmlFor="username" className="label text-xl">
              Username
            </label>
            <input
              ref={userRef}
              type="text"
              id="username"
              className="input input-lg w-full mb-12"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="off"
              required
            />

            <label htmlFor="password" className="label text-xl">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input input-lg w-full mb-12"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              required
            />

            <button className="btn btn-neutral btn-lg mt-8">Login</button>
            <p className="text-lg pl-2 pt-4">
              No account?{" "}
              <Link to="/signup" className="text-accent hover:text-accent/80">
                Sign up.
              </Link>
            </p>
            <div className="relative" hidden={!error}>
              <X className="absolute top-0.5 w-10 h-10 text-red-600" />
              <p className="text-lg text-red-600 pl-12 pt-2">{error}</p>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
