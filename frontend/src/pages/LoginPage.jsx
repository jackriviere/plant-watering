import { useRef, useEffect } from "react";

const LoginPage = () => {
  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    return console.log("Hello");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-32">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xl border p-4 pt-16 mx-auto ">
            <legend className="fieldset-legend text-5xl text-primary">
              Login
            </legend>

            <label className="label text-xl">Username</label>
            <input
              ref={userRef}
              type="text"
              className="input input-lg w-full mb-12"
            />

            <label className="label text-xl">Password</label>
            <input type="password" className="input input-lg w-full mb-12" />

            <button className="btn btn-neutral btn-lg mt-8">
              Login
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
