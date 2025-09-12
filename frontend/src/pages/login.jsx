import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import useAuthContext from "../context/useAuthContext";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(identifier, password);
    if (user) {
      // localStorage is already handled in useLogin hook
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 text-white px-10 py-12 rounded-2xl shadow-2xl border border-gray-700 flex flex-col items-center"
      >
        <h1 className="text-4xl font-extrabold text-center text-red-500 mb-8">
          Login
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
        </h1>
        <div className="w-full flex flex-col items-center">
          <label className="text-sm font-medium text-gray-300 mb-1 text-center">
            Email or Username
          </label>
          <input
            type="text"
            placeholder="Enter Email or Username"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-3/4 px-4 py-3 rounded-xl bg-gray-800 placeholder-gray-500 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="my-4"></div>
        <div className="w-full flex flex-col items-center">
          <label className="text-sm font-medium text-gray-300 mb-1 text-center">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-3/4 px-4 py-3 rounded-xl bg-gray-800 placeholder-gray-500 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          type="submit"
          className="mt-8 w-3/4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white font-bold text-lg shadow-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="mt-6 text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-red-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
