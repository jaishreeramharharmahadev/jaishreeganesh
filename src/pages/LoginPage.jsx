import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/applicants/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              timeout: 5000,
            }
          );

          if (response.status === 200) {
            navigate("/dashboard", { replace: true });
          }
        } catch (error) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userData");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
    if (errors.general) {
      setErrors({ ...errors, general: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const hashedPassword = await hashPassword(formData.password);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email.toLowerCase().trim(),
          password: hashedPassword,
        },
        {
          timeout: 10000,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(user));

        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response?.status === 401) {
        setErrors({ general: "Invalid email or password" });
      } else if (error.response?.status === 404) {
        setErrors({ general: "User not found. Please check your email." });
      } else if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else if (error.code === "ECONNABORTED") {
        setErrors({ general: "Request timeout. Please try again." });
      } else if (error.message === "Network Error") {
        setErrors({ general: "Network error. Please check your connection." });
      } else {
        setErrors({ general: "Login failed. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-10 flex-col justify-between">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-4">
            Welcome Back to Your Professional Journey
          </h1>
          <p className="text-blue-100 text-md mb-8">
            Access your personalized dashboard to track applications, discover
            new opportunities, and take the next step in your career.
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-blue-50">Track your internship status</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-blue-50">
                Dashboard access after internship application
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-blue-50">
                Use the same email from your registration
              </span>
            </div>
          </div>

          <div className="bg-blue-500/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                <span className="font-semibold">JS</span>
              </div>
              <div>
                <p className="font-semibold">Jessica Smith</p>
                <p className="text-blue-200 text-sm">
                  Software Engineer Intern
                </p>
              </div>
            </div>
            <p className="text-blue-50 italic">
              "The dashboard helped me track my applications and land my dream
              internship. The personalized recommendations were spot on!"
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="mx-auto w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Login</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          {errors.general && (
            <div className="border border-red-200 bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <svg
                className="w-5 h-5 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your registered email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.email
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                  errors.password
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-300"
                }`}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold flex items-center justify-center shadow-sm"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in to dashboard"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/internships")}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Apply for Internship
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;