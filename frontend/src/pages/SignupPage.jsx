import { Info, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*&]).{8,24}$/;

const SignupPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);


  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setError("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!USER_REGEX.test(user) || !PWD_REGEX.test(pwd)) {
      setError("Invalid entry");
      return;
    }
    try {
      const response = await axios.post(
        "/auth/signup",
        { username: user, password: pwd },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken
      setAuth({ user, accessToken })
      setUser("");
      setPwd("");
      setMatchPwd("");
      navigate("/")
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 409) {
        setError("Username Taken");
      } else {
        setError("Registration Failed");
      }
    }
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
              className="input input-lg w-full"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              onFocus={(e) => setUserFocus(true)}
              onBlur={(e) => setUserFocus(false)}
              autoComplete="off"
              required
            />
            <div hidden={!user || !userFocus || validName} className="relative bg-base-200 rounded-box p-2 m-2">
              <Info className="absolute"/>
              <p className="text pl-10">4 to 24 characters<br/> Must begin with a letter <br/> Contains only letters, numbers, underscores, hyphens</p>
            </div>

            <label htmlFor="password" className="label text-xl mt-12">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input input-lg w-full"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onFocus={(e) => setPwdFocus(true)}
              onBlur={(e) => setPwdFocus(false)}
              required
            />
            <div hidden={!pwd || !pwdFocus || validPwd} className="relative bg-base-200 rounded-box p-2 m-2">
              <Info className="absolute"/>
              <p className="text pl-10">8 to 24 characters<br/> Must include an uppercase letter, a lowercase letter, a number, and a special character</p>
            </div>

            <label htmlFor="confirmPassword" className="label text-xl mt-12">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="input input-lg w-full mb-12"
              value={matchPwd}
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={(e) => setMatchFocus(true)}
              onBlur={(e)=> setMatchFocus(false)}
              required
            />
            <div hidden={!matchFocus || validMatch} className="relative bg-base-200 rounded-box p-2 m-2">
              <Info className="absolute"/>
              <p className="text pl-10">Must match above password</p>
            </div>

            <button disabled={!validName || !validPwd || !validMatch || error} className="btn btn-neutral btn-lg mt-8 disabled:bg-button-bg/60">Sign Up</button>

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
