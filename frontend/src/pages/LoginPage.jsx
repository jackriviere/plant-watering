import React from "react";

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    return console.log("Hello");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-32">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-xl border p-4 pt-16 mx-auto ">
            <legend className="fieldset-legend text-5xl text-primary">Login</legend>

            {/* <label className="label ">Email</label> */}
            <input type="text" className="input input-lg w-full mb-12" placeholder="Username" />

            {/* <label className="label">Password</label> */}
            <input type="password" className="input input-lg w-full mb-12" placeholder="Password" />

            <button type="submit" className="btn btn-neutral btn-lg mt-8">Login</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
