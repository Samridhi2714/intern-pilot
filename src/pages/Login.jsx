import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { HiRocketLaunch } from "react-icons/hi2";
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/login", formData);

      localStorage.setItem("user", JSON.stringify(res.data));

      navigate("/tracker");
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div
        className="
        w-full
        max-w-xl
        bg-white
        rounded-3xl
        shadow-xl
        p-10
        hover:shadow-2xl
        transition
        duration-300
      "
      >
        <div className="text-center mb-8">
          <HiRocketLaunch className="text-5xl text-[#8B6F47] mx-auto mb-3" />

          <h1 className="text-4xl font-extrabold text-[#2D2A26]">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to manage your internship applications and track your
            progress.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold">Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="
                w-full
                p-4
                rounded-xl
                border
                border-[#D6C2A1]
                bg-[#FDFBF8]
                focus:outline-none
                focus:ring-2
                focus:ring-[#8B6F47]
              "
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              className="
                w-full
                p-4
                rounded-xl
                border
                border-[#D6C2A1]
                bg-[#FDFBF8]
                focus:outline-none
                focus:ring-2
                focus:ring-[#8B6F47]
              "
            />
          </div>

          <button
            disabled={loading}
            className="
              w-full
              py-4
              bg-[#8B6F47]
              text-white
              rounded-xl
              font-semibold
              text-lg
              hover:scale-[1.02]
              hover:shadow-lg
              transition
            "
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          New User?
          <Link
            to="/register"
            className="
              ml-2
              font-semibold
              text-[#8B6F47]
              hover:underline
            "
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
