import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const { signup, loading } = useSignup();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    isAdmin: false,
    isVendor: false,
    isUser: true,
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (!formData.confirmpassword) {
      newErrors.confirmpassword = "Please confirm your password";
    } else if (formData.confirmpassword !== formData.password) {
      newErrors.confirmpassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-900 text-white px-10 py-12 rounded-2xl shadow-2xl border border-gray-700 flex flex-col items-center"
      >
        <h1 className="text-4xl font-extrabold text-center text-red-500 mb-8">
          Sign Up
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
        </h1>
        <div className="w-full mb-4">
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
          />
          {errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
          />
          {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
        </div>
        <div className="w-full mb-4">
          <label className="block mb-1 font-semibold">Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
          />
          {errors.confirmpassword && <p className="text-red-400 text-xs mt-1">{errors.confirmpassword}</p>}
        </div>
        <div className="w-full mb-4 flex gap-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              className="mr-2"
            />
            Admin
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isVendor"
              checked={formData.isVendor}
              onChange={handleChange}
              className="mr-2"
            />
            Vendor
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isUser"
              checked={formData.isUser}
              onChange={handleChange}
              className="mr-2"
            />
            User
          </label>
        </div>
        <button
          type="submit"
          className="mt-8 w-3/4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white font-bold text-lg shadow-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <p className="mt-6 text-gray-400 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-red-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
