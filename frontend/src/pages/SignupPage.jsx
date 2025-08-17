import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SignupPage = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return console.log("Hello");
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-32">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xl border p-4 pt-16 mx-auto ">
            <legend className="fieldset-legend text-5xl text-secondary">
              Sign Up
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

            <label htmlFor="confirmPassword" className="label text-xl">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="input input-lg w-full mb-12"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              required
            />

            <button className="btn btn-neutral btn-lg mt-8">Sign Up</button>

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

export default SignupPage;
